import { Browser, chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "https://boe.es";

export const getCurrentBoe = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(BASE_URL);

  const element = await page.getByText("Último BOE");

  if (!element) return;

  await element.click();

  const articlePagesList = await page.getByText("Otros formatos").all();

  const allUrls = await Promise.all(
    articlePagesList.map(async (element, i) => {
      return await element.getAttribute("href");
    })
  );

  for await (const url of allUrls) {
    await page.goto(`${BASE_URL}${url}` as string);

    const sectionText = await page.$("#textoxslt");

    const data = {
      data: await sectionText?.innerText(),
    };
    const jsonData = JSON.stringify(data);

    const currentUrl = await page.url();
    const fileName = currentUrl.split("id=").pop();

    const filePath = path.join(
      process.cwd(),
      "database",
      "json",
      `${fileName}.json`
    );

    fs.writeFileSync(filePath, jsonData);
  }
  //   Close browser
  await browser.close();
};
