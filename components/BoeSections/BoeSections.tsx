import { BoeDictionaryData, SectionData } from "@/interfaces";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  sections: string[];
  dictionaryData: BoeDictionaryData;
  date: string;
}

const BoeSections: FC<Props> = ({ sections, dictionaryData, date }) => {
  return (
    <section className="flex flex-col gap-5">
      {sections.map((title, i) => (
        <Accordion key={i} className={`section-${i} border`}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {title}
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-5">
              {(dictionaryData[title] as SectionData[]).map(
                ({ boe, subtitle }: SectionData, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between gap-5 items-center"
                  >
                    <div>
                      <strong> {subtitle} </strong>
                      <h5>{boe}</h5>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/boe/${date}/${boe}`}>
                        <Button variant="outlined">Resumen</Button>
                      </Link>
                      <a
                        href={`https://boe.es/diario_boe/txt.php?id=${boe}`}
                        target="_blank"
                      >
                        <Button variant="outlined" color="warning">
                          BOE original
                        </Button>
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default BoeSections;
