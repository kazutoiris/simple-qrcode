import QRCode from 'qrcode';
import './style.css';

const canvasElement = document.getElementById('qrcode') as HTMLCanvasElement;
const inputElement = document.getElementById('content') as HTMLInputElement;

async function makeCode(text: string): Promise<void> {
  try {
    await QRCode.toCanvas(canvasElement, text, {
      errorCorrectionLevel: 'L',
      margin: 0,
      width: 250,
    });
    inputElement.value = text;
    delete canvasElement.dataset.error;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    canvasElement.dataset.error = errorMessage;
  }
}

document.title = i18n.t('short_name');

inputElement.oninput = () => makeCode(inputElement.value);

window.addEventListener('blur', () => {
  window.close();
});

const urlParams = new URLSearchParams(location.search);
const data = urlParams.get('data');
if (data) {
  makeCode(data);
} else {
  browser.tabs.query({ active: true, currentWindow: true })
    .then((tabs) => makeCode(tabs[0].url || window.location.href))
}
