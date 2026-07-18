import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  modules: ['@wxt-dev/i18n/module', '@wxt-dev/auto-icons'],
  manifest: {
    name: '__MSG_name__',
    description: '__MSG_description__',
    default_locale: 'en',
    permissions: [
      'contextMenus',
      'activeTab',
      'scripting'
    ],
    web_accessible_resources: [
      {
        resources: ['iframe.html'],
        matches: ['<all_urls>'],
      },
    ],
    browser_specific_settings: {
      gecko: {
        id: '{b87def58-2ef0-4467-922a-70226e48d354}',
        data_collection_permissions: {
          required: ["none"],
        },
      }
    },
    host_permissions: ['<all_urls>'],
    action: {
      default_popup: 'popup/index.html',
    },
  },
});
