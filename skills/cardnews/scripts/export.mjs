#!/usr/bin/env node
// 카드뉴스 HTML → 슬라이드별 PNG 추출
// 사용법: node export.mjs <cards.html 경로> <출력 디렉토리>
// HTML 안의 class="slide" 요소를 DOM 순서대로 slide-01.png, slide-02.png ... 로 저장한다.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [htmlPath, outDir] = process.argv.slice(2);
if (!htmlPath || !outDir) {
  console.error('사용법: node export.mjs <cards.html> <출력디렉토리>');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 1500 },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(resolve(htmlPath)).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

const slides = await page.locator('.slide').all();
if (slides.length === 0) {
  console.error('class="slide" 요소를 찾지 못했습니다. HTML을 확인하세요.');
  await browser.close();
  process.exit(1);
}

for (let i = 0; i < slides.length; i++) {
  const file = resolve(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
  await slides[i].scrollIntoViewIfNeeded();
  await slides[i].screenshot({ path: file });
  console.log(`저장: ${file}`);
}

await browser.close();
console.log(`완료: ${slides.length}장 추출`);
