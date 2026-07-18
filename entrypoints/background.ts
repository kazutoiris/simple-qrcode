import { browser, type Browser, i18n } from "#imports";

declare function defineBackground(config: any): any;

export default defineBackground(() => {
  interface ScanRequest {
    type: 'scan';
    imageUrl: string;
  }

  interface ScanResponse {
    success: boolean;
    result?: string;
    error?: string;
  }

  async function openWindow(data: string): Promise<void> {
    const win = await browser.windows.create({
      url: `popup.html?data=${encodeURIComponent(data)}`,
      type: 'popup',
      left: 100,
      top: 100,
      width: 310,
      height: 385,
    });
    if (win && win.id) {
      await browser.windows.update(win.id, { focused: true });
    }
  }

  async function generateContextMenu(info: Browser.contextMenus.OnClickData): Promise<void> {
    console.log(info);
    const url = info.linkUrl || info.selectionText || info.srcUrl || info.frameUrl || info.pageUrl;
    console.log(url);
    await openWindow(url || '');
  }

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  async function scanContextMenu(info: Browser.contextMenus.OnClickData): Promise<void> {
    try {
      const result = await scanQRCodeInContentScript(info.srcUrl || '');
      await pageInjectPrompt(isValidUrl(result) ? i18n.t('open') : '', result, false);
    } catch (e) {
      await pageInjectPrompt(i18n.t('scan_error'), (e as Error).message, true);
    }
  }

  async function scanQRCodeInContentScript(imageUrl: string): Promise<string> {
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!activeTab?.id) {
      throw new Error('No active tab found');
    }

    const response = await browser.tabs.sendMessage<ScanRequest, ScanResponse>(activeTab.id, {
      type: 'scan',
      imageUrl,
    } as ScanRequest);

    if (response.success) {
      return response.result || '';
    }
    throw new Error(response.error || 'Scan failed');
  }

  async function pageInjectPrompt(title: string, result: string, isError: boolean): Promise<boolean> {
    const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!activeTab?.id) return false;
    const injectFunc = async (tip: string, text: string, isError: boolean) => {
      if (!isError) {
        await navigator.clipboard.writeText(text);
      }
      return prompt(tip, text);
    };
    const res = await browser.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: injectFunc,
      args: [title, result, isError],
    });
    const url = res[0]?.result as string;
    if (isValidUrl(result) && isValidUrl(url)) {
      browser.tabs.create({ url });
    }
    return true;
  }

  function addContextMenus() {
    browser.contextMenus.removeAll(() => {
      browser.contextMenus.create({
        id: 'generate-qrcode',
        title: i18n.t('generate'),
        contexts: ['all'],
      });
      browser.contextMenus.create({
        id: 'scan-qrcode',
        title: i18n.t('scan'),
        contexts: ['image'],
      });
    });
  }

  addContextMenus();

  browser.runtime.onInstalled.addListener((_) => {
    addContextMenus();
  });

  browser.contextMenus.onClicked.addListener((info, _tab) => {
    if (info.menuItemId === 'generate-qrcode') {
      generateContextMenu(info);
    } else if (info.menuItemId === 'scan-qrcode') {
      scanContextMenu(info);
    }
  });
});
