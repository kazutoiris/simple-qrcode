# QR Code Extension

A simple and powerful QR Code Generator and Scanner extension built with WXT.

## Features

- **Generate QR Codes**: Click the extension icon to generate a QR code for the current page URL
- **Scan QR Codes**: Right-click on any image to scan and decode QR codes
- **One-Click Actions**: Context menu integration for quick access to QR code generation and scanning
- **Clean UI**: Minimal popup design showing the QR code and current URL

## Installation

### From Source

1. Clone this repository:
```bash
git clone https://github.com/kazutoiris/simple-qrcode.git
cd simple-qrcode
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the extension:
```bash
pnpm build
```

## Usage

### Generate QR Code

1. Navigate to any webpage
2. Click the extension icon in the browser toolbar
3. A popup will appear showing the QR code for the current page URL

### Scan QR Code

1. Right-click on any image containing a QR code
2. Select "Scan QR Code" from the context menu
3. The extension will scan and decode the QR code
4. Click "Open Website?" to navigate to the decoded URL

## Permissions

- `contextMenus`: To add context menu items for quick QR code generation and scanning
- `activeTab`: To access the current tab's URL
- `scripting`: To execute scripts for scanning QR codes from images
- `offscreen`: To create an offscreen document for QR code scanning

## License

![Anti-996 License](https://img.shields.io/badge/license-Anti--996%20License-blue)
