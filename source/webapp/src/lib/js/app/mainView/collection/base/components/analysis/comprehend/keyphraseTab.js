// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

import Localization from '../../../../../../shared/localization.js';
import AnalysisTypes from '../../../../../../shared/analysis/analysisTypes.js';
import BaseComprehendTab from './baseComprehendTab.js';

export default class KeyphraseTab extends BaseComprehendTab {
  constructor(previewComponent, defaultTab = false) {
    super(Localization.Messages.KeyphraseTab, previewComponent, defaultTab);
  }

  async createContent() {
    const col = $('<div/>').addClass('col-9 my-4 max-h36r');
    const tracks = await this.createTimelineButtons(AnalysisTypes.Comprehend.Keyphrase);
    if (!(tracks || []).length) {
      return super.createContent();
    }
    tracks.forEach(btn => col.append(btn));
    return col;
  }
}
