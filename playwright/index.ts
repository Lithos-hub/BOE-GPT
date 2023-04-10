import { chromium } from "playwright";

import { BoeDictionary, SectionData } from "@/interfaces";

export const getBOEByDate = async (date: string) => {
  const dictionary: BoeDictionary | {} = {};

  const BASE_URL = "https://boe.es/diario_boe";

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  const dateInput = await page.$("#fechaBOE");

  await dateInput!.click();
  await dateInput!.fill(date);

  await page.waitForTimeout(1000);

  const button = await page.$("input.boton");
  await button!.click();

  await page.waitForLoadState();

  const dropdown = await page.locator("label").getByText("Secciones");
  await dropdown.click();

  const optionIsVisible = await page.isVisible(
    "text='I. Disposiciones generales'"
  );

  if (!optionIsVisible) return null;

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });
  await option.click();

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
        section: sectionName,
        boe: pdfName,
        subtitle: await h5.textContent(),
        href: fullLink,
      };
    })
  );

  for (const item of await boeData) {
    if (!dictionary[item.section]) {
      dictionary[item.section] = [];
    }
    dictionary[item.section].push(item);
  }

  const dataToReturn = {
    dictionaryData: {
      ...dictionary,
    },
    date,
  };

  await browser.close();
  return dataToReturn;
};

export const getTextToSummarize = async (boeId: string) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`https://boe.es/diario_boe/txt.php?id=${boeId}`);

  const text = await page.locator("#textoxslt");

  const htmlText = await text.innerText();

  await browser.close();

  return htmlText;
};
