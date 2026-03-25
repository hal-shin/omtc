import puppeteer from 'puppeteer';
import fs from 'fs';

const PAGES = [
  { slug: 'Public-Play', file: 'public-play', nav: 'Public Play' },
  { slug: 'Mission Tennis Coaches', file: 'coaches', nav: 'Mission Tennis Coaches' },
  { slug: 'Socials', file: 'socials', nav: 'Socials' },
  { slug: 'Membership & Rules', file: 'membership-rules', nav: 'Membership & Rules' },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  // Go to site
  await page.goto('https://www.okmissiontennis.org/ClubMember/Page/Home', { waitUntil: 'networkidle2' });
  console.log('Home loaded');

  // Click Log In via the SPA
  await page.evaluate(() => { ClubMember.Login(); });
  await sleep(3000);

  // Check if login form appeared
  const hasLoginForm = await page.evaluate(() => !!document.querySelector('#Email'));
  console.log('Login form visible:', hasLoginForm);

  if (!hasLoginForm) {
    console.error('Login form not found');
    await browser.close();
    process.exit(1);
  }

  // Clear and fill login form
  await page.evaluate(() => {
    document.querySelector('#Email').value = '';
    document.querySelector('#Password').value = '';
  });
  await page.type('#Email', process.env.OMTC_EMAIL, { delay: 50 });
  await page.type('#Password', process.env.OMTC_PASSWORD, { delay: 50 });

  // Submit login
  await page.evaluate(() => { LoginUser(); });

  // Wait for login to complete - watch for URL change or content change
  await sleep(8000);

  const currentTitle = await page.title();
  const currentUrl = page.url();
  console.log(`After login - Title: "${currentTitle}", URL: ${currentUrl}`);

  // Check if we're logged in by looking for a logout button or member-only nav
  const loggedIn = await page.evaluate(() => {
    const logOffOn = document.querySelector('#logOffOn');
    return logOffOn ? logOffOn.textContent.trim() : 'not found';
  });
  console.log('Login status indicator:', loggedIn);

  // Scrape each gated page
  for (const { slug, file, nav } of PAGES) {
    console.log(`\nScraping: ${slug}`);

    // Navigate via the SPA function
    await page.evaluate((s) => { ClubMember.Page(s); }, slug);
    await sleep(5000);

    const title = await page.title();
    console.log(`  Page title: "${title}"`);

    // Get the main content
    const content = await page.evaluate(() => {
      const main = document.querySelector('#main-content') || document.querySelector('#main-div') || document.body;
      return main.innerHTML;
    });

    const textContent = await page.evaluate(() => {
      const main = document.querySelector('#main-content') || document.querySelector('#main-div') || document.body;
      return main.innerText;
    });

    // Get all images on the page
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(i => ({ src: i.src, alt: i.alt, width: i.naturalWidth, height: i.naturalHeight }));
    });

    fs.writeFileSync(`/tmp/omtc-${file}.html`, content);
    fs.writeFileSync(`/tmp/omtc-${file}.txt`, textContent);
    fs.writeFileSync(`/tmp/omtc-${file}-images.json`, JSON.stringify(images, null, 2));

    console.log(`  Content length: ${textContent.length} chars, Images: ${images.length}`);
    console.log(`  First 200 chars: ${textContent.substring(0, 200)}`);
  }

  await browser.close();
  console.log('\nDone!');
})();
