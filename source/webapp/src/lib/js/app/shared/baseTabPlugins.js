// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

import BaseTab from './baseTab.js';

export default class BaseTabPlugins extends BaseTab {
  constructor(title, params, plugins) {
    super(title, params);
    this.$plugins = plugins;
    const anchor = this.$tabLink.children('.nav-link');
    anchor.on('shown.bs.tab', () => {
      this.toggleAddonPlugins(this.tabId);
    });
  }

  get plugins() {
    return this.$plugins;
  }

  toggleAddonPlugins(tabId) {
    if (this.plugins) {
      this.plugins.find('[data-tab-id]').each((key, val) => {
        const plugin = $(val);
        if (plugin.data('tab-id') === tabId) {
          plugin.removeClass('collapse');
        } else {
          plugin.addClass('collapse');
        }
      });
    }
  }
}
