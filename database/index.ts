import { Locator, Page, chromium } from "playwright";
import fs from "fs";
import path from "path";
import { parseDate } from "@/utils";

const getAllAticlesInformation = async (
  page: Page,
  base_url: string,
  pagesList: Locator[],
  date: string
): Promise<void> => {
  const allUrls = await Promise.all(
    pagesList.map(async (element, i) => {
      return await element.getAttribute("href");
    })
  );

  for await (const url of allUrls) {
    await page.goto(`${base_url}${url}` as string);

    const sectionText = await page.$("#textoxslt");

    const data = {
      data: await sectionText?.innerText(),
    };
    const jsonData = JSON.stringify(data);

    const currentUrl = await page.url();
    const fileName = currentUrl.split("id=").pop()?.split("-").pop();

    const dir = path.join(process.cwd(), "database", "json", `${date}`);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = path.join(
      process.cwd(),
      "database",
      "json",
      `${date}`,
      `BOE-${fileName}.json`
    );

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) throw err;
      console.log(`[${filePath}] has been created`);
    });
  }
};

export const getCurrentBoe = async () => {
  const BASE_URL = "https://boe.es";
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const currentDate = parseDate(new Date().getTime());

  await page.goto(BASE_URL);

  const element = await page.getByText("Último BOE");

  await element.click();

  const dropdown = await page.getByText("Secciones");

  await dropdown.click();

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });

  await option.click();

  const articlePagesList = await page.getByText("Otros formatos").all();

  await getAllAticlesInformation(page, BASE_URL, articlePagesList, currentDate);

  await browser.close();
};

export const getBOEByDate = async (date: string) => {
  const BASE_URL = "https://boe.es/diario_boe";

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  await page.screenshot({ path: "./screenshot.png" });

  const dateInput = await page.$("#fechaBOE");

  if (!dateInput) return;
  await dateInput.click();
  await dateInput.fill(date);

  await page.waitForTimeout(3000);

  await page.screenshot({ path: "./screenshot.png" });

  const button = await page.$("input.boton");

  await button!.click();

  await page.waitForLoadState();

  const dropdown = await page.getByText("Secciones");

  await dropdown.click();

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });

  await option.click();

  const articlePagesList = await page.getByText("Otros formatos").all();

  await getAllAticlesInformation(page, BASE_URL, articlePagesList, date);

  await browser.close();
};
