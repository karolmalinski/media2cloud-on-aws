// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

import AppUtils from '../shared/appUtils.js';

const mxSpinner = Base => class extends Base {
  constructor(...args) {
    super(...args);
    this.$spinnerId = `spinner-${AppUtils.randomHexstring()}`;
  }

  get spinnerId() {
    return this.$spinnerId;
  }

  createLoading() {
    const loading = $('<div/>').addClass('spinner-grow text-secondary loading-4 collapse')
      .attr('id', this.spinnerId)
      .append($('<span/>').addClass('lead-sm sr-only')
        .html('Loading...'));
    return loading;
  }

  loading(enabled = true) {
    const spinner = $(`#${this.spinnerId}`);
    if (enabled) {
      return spinner.removeClass('collapse');
    }
    return spinner.addClass('collapse');
  }
};
export default mxSpinner;
