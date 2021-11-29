// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const AWS = (() => {
  try {
    const AWSXRay = require('aws-xray-sdk');
    return AWSXRay.captureAWS(require('aws-sdk'));
  } catch (e) {
    console.log('aws-xray-sdk not loaded');
    return require('aws-sdk');
  }
})();
const {
  MediaConvert,
  DataAccess,
  Solution: {
    Metrics: {
      CustomUserAgent,
    },
  },
} = require('../../shared/defs');

const BacklogJob = require('../backlogJob');

class MediaConvertBacklogJob extends BacklogJob {
  static get ServiceApis() {
    return {
      CreateJob: 'mediaconvert:createjob',
    };
  }

  async createJob(id, params) {
    return this.startAndRegisterJob(
      id,
      MediaConvertBacklogJob.ServiceApis.CreateJob,
      params
    );
  }

  static isService(serviceApi) {
    return Object.values(MediaConvertBacklogJob.ServiceApis).indexOf(serviceApi) >= 0;
  }

  getMediaConvertInstance() {
    if (!MediaConvert.Endpoint || !DataAccess.RoleArn) {
      throw new Error('missing ENV_MEDIACONVERT_HOST or ENV_DATA_ACCESS_ROLE');
    }
    return new AWS.MediaConvert({
      apiVersion: '2017-08-29',
      customUserAgent: CustomUserAgent,
      endpoint: MediaConvert.Endpoint,
    });
  }

  bindToFunc(serviceApi) {
    const mediaconvert = this.getMediaConvertInstance();
    return (serviceApi === MediaConvertBacklogJob.ServiceApis.CreateJob)
      ? mediaconvert.createJob.bind(mediaconvert)
      : undefined;
  }

  async startJob(serviceApi, serviceParams) {
    return super.startJob(serviceApi, serviceParams)
      .then(data => ({
        JobId: data.Job.Id,
      }));
  }

  async startAndRegisterJob(id, serviceApi, params) {
    const serviceParams = {
      ...params,
      ClientRequestToken: id,
      Role: DataAccess.RoleArn,
    };
    return super.startAndRegisterJob(id, serviceApi, serviceParams);
  }

  noMoreQuotasException(code) {
    return false;
  }

  parseJobId(data) {
    return data.Job.Id;
  }
}

module.exports = MediaConvertBacklogJob;
