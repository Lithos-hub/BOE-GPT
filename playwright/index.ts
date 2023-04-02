import { Browser, chromium } from "playwright";

const initialUrl = "https://boe.es/";
const finalUrl = "https://boe.es/boe/dias/2023/04/01/";

const createPage = async (browser: Browser) => await browser.newPage();

export const getPDF = async () => {
  // Open browser
  const browser = await chromium.launch();

  //   Initial page
  const page = await createPage(browser);

  await page.goto(initialUrl);

  const element = await page.getByText("Último BOE");

  if (!element) return;

  await element.click();

  const pdfButton = await page.locator(".puntoPDF");

  console.log(pdfButton);

  await pdfButton.click();

  //   await pdfButton[0].click();

  await page.screenshot({ path: "./screenshot.png " });

  //   Close browser
  await browser.close();
};
