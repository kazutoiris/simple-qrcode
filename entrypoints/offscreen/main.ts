import { Browser, browser, i18n } from '#imports';
import { OffscreenRequest, OffscreenResponse } from '@/global';
import QrScanner from 'qr-scanner';

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

        const result = await QrScanner.scanImage(canvas, { returnDetailedScanResult: true });
        resolve(result.data || '');
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    };

    img.onerror = (event) => {
      reject(new Error(i18n.t('load_image_error')));
    };

    img.src = imageUrl;
  });
}

browser.runtime.onMessage.addListener(
  (message: OffscreenRequest, _sender: Browser.runtime.MessageSender, sendResponse: (response?: OffscreenResponse) => void): boolean => {
    scanImage(message.imageUrl)
      .then((result) => sendResponse({ success: true, result }))
      .catch((error: Error) => sendResponse({ success: false, error: error.message }));
    return true;
  },
);
