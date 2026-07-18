import { defineContentScript, createIframeUi } from '#imports';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIframeUi(ctx, {
      page: '/iframe.html',
      position: 'inline',
      anchor: 'body',
      onMount: (wrapper, iframe) => {
        iframe.width = '0';
        iframe.height = '0';
        iframe.style.display = 'none';
      },
    });

    ui.autoMount();
  },
});
