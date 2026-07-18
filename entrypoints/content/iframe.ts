import { Browser, browser, i18n } from '#imports';
import { ContentScriptRequest, ContentScriptResponse } from '@/global';
import jsQR from 'jsqr';

async function scanImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error(i18n.t('load_image_error')));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const result = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
        if (result) resolve(result.data);
        reject(new Error(i18n.t('scan_error')));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (event) => {
      reject(new Error(i18n.t('load_image_error')));
    };

    img.src = imageUrl;
  });
}

browser.runtime.onMessage.addListener(
  (message: ContentScriptRequest, _sender: Browser.runtime.MessageSender, sendResponse: (response?: ContentScriptResponse) => void): boolean => {
    scanImage(message.imageUrl)
      .then((result) => sendResponse({ success: true, result }))
      .catch((error: Error) => sendResponse({ success: false, error: error.message }));
    return true;
  },
);
