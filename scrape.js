const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=55',
    'https://sanand0.github.io/tdsdata/js_table/?seed=56',
    'https://sanand0.github.io/tdsdata/js_table/?seed=57',
    'https://sanand0.github.io/tdsdata/js_table/?seed=58',
    'https://sanand0.github.io/tdsdata/js_table/?seed=59',
    'https://sanand0.github.io/tdsdata/js_table/?seed=60',
    'https://sanand0.github.io/tdsdata/js_table/?seed=61',
    'https://sanand0.github.io/tdsdata/js_table/?seed=62',
    'https://sanand0.github.io/tdsdata/js_table/?seed=63',
    'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  ];

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Get all table cell text values
    const cells = await page.$$eval('td', tds =>
      tds.map(td => td.innerText.trim())
    );

    let pageSum = 0;
    for (const cell of cells) {
      const num = parseFloat(cell);
      if (!isNaN(num)) {
        pageSum += num;
      }
    }

    console.log(`Sum for ${url}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);
  await browser.close();
})();