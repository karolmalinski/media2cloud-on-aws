// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

import Localization from '../../shared/localization.js';
import GroupCategorySlideComponent from './group/groupCategorySlideComponent.js';
import GroupPreviewSlideComponent from './group/groupPreviewSlideComponent.js';
import BaseMediaTab from './base/baseMediaTab.js';

export default class GroupTab extends BaseMediaTab {
  constructor(defaultTab, plugins) {
    super(defaultTab, Localization.Messages.GroupTab, plugins);
    this.$categorySlideComponent = new GroupCategorySlideComponent();
    this.$previewSlideComponent = new GroupPreviewSlideComponent();
  }
}
