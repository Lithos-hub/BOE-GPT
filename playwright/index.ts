import { Locator, Page, chromium } from "playwright";
import fs from "fs";
import path from "path";
import { parseDate } from "@/utils";
import { BoeDictionary } from "@/interfaces";

export const getCurrentBoe = async () => {
  const BASE_URL = "https://boe.es";
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(BASE_URL);

  const element = await page.getByText("Último BOE");

  await element.click();

  const dropdown = await page.getByText("Secciones");

  await dropdown.click();

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });

  await option.click();

  const h4s = await page.locator("h4").all();
  const h5s = await page.locator("h5").all();

  const htmlLinks = await page.getByText("Otros formatos").all();
  const pdfLinks = await page.getByTitle("PDF firmado BOE-").all();

  const objectData: BoeDictionary = {};

  for (let i = 0; i < h4s.length; i++) {
    const h4Text: string = await h4s[i].innerText();
    const htmlName = (await htmlLinks[i].getAttribute("href")) as string;
    const pdfName = (await pdfLinks[i]
      .getAttribute("href")
      .then((result) => result?.split("/pdfs/").pop()?.slice(0, -4))) as string;

    objectData[h4Text] = {
      [pdfName]: `${BASE_URL}${htmlName}`,
    };
  }

  await browser.close();

  return objectData;

  // return await getAllAticlesInformation(
  //   page,
  //   BASE_URL,
  //   articlePagesList,
  //   currentDate
  // );
};

export const getBOEByDate = async (date: string) => {
  const BASE_URL = "https://boe.es/diario_boe";

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  const dateInput = await page.$("#fechaBOE");

  await dateInput!.click();
  // await dateInput!.fill(date);
  await dateInput!.fill("2023-04-04");

  await page.screenshot({ path: "./captura.png" });

  await page.waitForTimeout(3000);

  const button = await page.$("input.boton");

  await button!.click();

  await page.waitForLoadState();

  const dropdown = await page.getByText("Secciones");

  await dropdown.click();

  const option = await page.locator("a", {
    hasText: "I. Disposiciones generales",
  });

  await option.click();

  const h4s = await page.$$("h4");

  const htmlLinks = await page.getByText("Otros formatos").all();
  const pdfLinks = await page.getByTitle("PDF firmado BOE-").all();

  const objectData: BoeDictionary = {};

  let pdfName: string;
  let subobjectData = {};

  let i = 0;
  let j = 0;

  while (i < h4s.length) {
    const h4Text = (await h4s[i].textContent()) as string;
    const nextH4Text = (await h4s[i + 1])
      ? await h4s[i + 1].textContent()
      : null;

    const h5s = await page
      // .locator(
      //   `h5:below(:text("${h4Text}"))${`h5:above(:text("${nextH4Text}"))`}`
      // )
      .locator(
        `h5:below(:text("${h4Text}"))${`h5:above(:text("${nextH4Text}"))`}`
      )
      .all();

    const htmlName = (await htmlLinks[i].getAttribute("href")) as string;
    console.log(`Entre ${h4Text} y ${nextH4Text} tenemos ${h5s.length} h5s`);

    while (j < h5s.length) {
      pdfName = (await pdfLinks[j]
        .getAttribute("href")
        .then((result) =>
          result?.split("/pdfs/").pop()?.slice(0, -4)
        )) as string;

      subobjectData[pdfName] = {
        subtitle: await h5s[j].textContent(),
        href: `${BASE_URL}${htmlName}`,
      };

      j++;
    }

    objectData[h4Text] = subobjectData;

    i++;
    j = 0;
  }

  console.log(objectData);

  return objectData;

  // return await getAllAticlesInformation(page, BASE_URL, articlePagesList, date);
};

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
