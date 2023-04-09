import { Locator, Page, chromium, firefox } from "playwright";
import fs from "fs";
import path from "path";
import { parseDate } from "@/utils";
import { BoeDictionary, SectionData } from "@/interfaces";

export const getBOEByDate = async (date: string) => {
  const BASE_URL = "https://boe.es/diario_boe";

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  const dateInput = await page.$("#fechaBOE");

  await dateInput!.click();
  // await dateInput!.fill(date);
  await dateInput!.fill("2023-04-04");

  await page.waitForTimeout(1000);

  const button = await page.$("input.boton");

  await button!.click();

  await page.waitForLoadState();

  const dropdown = await page.getByText("Secciones");

  await dropdown.click();

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });

  await option.click();

  const dictionary: BoeDictionary = {};

  const H5Tags = await page.$$("h5");

  const htmlLinks = await page.getByText("Otros formatos").all();
  const pdfLinks = await page.getByTitle("PDF firmado BOE-").all();

  const boeData = Promise.all(
    H5Tags.map(async (h5, i) => {
      const pdfName = (await pdfLinks[i]
        .getAttribute("href")
        .then((result) =>
          result?.split("/pdfs/").pop()?.slice(0, -4)
        )) as string;

      const sectionName = await page
        .locator(`h4:above(:text("${pdfName}"))`)
        .first()
        .innerText();

      const fullLink = `https://boe.es${await htmlLinks[i].getAttribute(
        "href"
      )}`;

      return {
        date,
        section: sectionName,
        boe: pdfName,
        subtitle: await h5.textContent(),
        href: fullLink,
      };
    })
  );

  for (const item of await boeData) {
    await page.goto(await item.href);
    const sectionText = await page.$("#textoxslt");

    const obj = {
      ...item,
      htmlText: await sectionText?.innerText(),
    };

    if (!dictionary[obj.section]) {
      dictionary[obj.section] = [];
    }
    dictionary[obj.section].push(obj);
  }

  await browser.close();
  return dictionary;

  // return await getAllAticlesInformation(page, BASE_URL, articlePagesList, date);
};
