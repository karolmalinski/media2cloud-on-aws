// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const {
  AnalysisTypes,
} = require('core-lib');
const BaseAnalysisIndexer = require('../shared/baseAnalysisIndexer');

const SUBCATEGORY = AnalysisTypes.Rekognition.Celeb;

class IndexCelebIterator extends BaseAnalysisIndexer {
  constructor(stateData) {
    super(stateData, SUBCATEGORY);
  }

  get [Symbol.toStringTag]() {
    return 'IndexCelebIterator';
  }
}

module.exports = IndexCelebIterator;
