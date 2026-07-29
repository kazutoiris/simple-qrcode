# SOURCE CODE REVIEW

This document explains how to build this extension from source for add-on review purposes.

## Overview

A browser extension for generating and scanning QR codes.

- **Framework**: [WXT](https://wxt.dev/) (Web Extension Tools)
- **Language**: TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) v20+, [npm](https://www.npmjs.com/) v10+, and [pnpm](https://pnpm.io/) v9+

## Build from Source

From the root of the extracted sources:

```sh
# 1. Install dependencies
pnpm install

# 2. Build for Firefox
pnpm build:firefox
```

## Build from GitHub Action

Refer to [kazutoiris/simple-qrcode](https://github.com/kazutoiris/simple-qrcode).

## Build Output

Build output is written to `.output/firefox-mv2/`.

The generated files should match the contents of the submitted extension zip:

```dir
.output/firefox-mv2/
├── manifest.json          # Extension manifest
├── background.js          # Background script
├── popup.html             # Popup page
└── ...                    # Other files

```
