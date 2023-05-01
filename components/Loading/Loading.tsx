import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

const Loading = () => {
  const [index, setIndex] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Buscando en la base de datos..."
  );

  useEffect(() => {
    const loadingTexts = [
      "Buscando en la base de datos...",
      "Generando información...",
      "Obteniendo resultado...",
    ];
    const intervalId = setInterval(() => {
      if (index >= loadingTexts.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);

    setLoadingText(loadingTexts[index]);

    return () => clearInterval(intervalId);
  }, [index, loadingText]);

  return (
    <div className="fixed top-0 left-0 backdrop-blur bg-primary-1 bg-opacity-25 h-full w-full flex flex-col justify-center items-center z-[2000]">
      <div className="flex flex-col justify-center gap-10">
        <CircularProgress color="primary" size={70} className="mx-auto" />
        <h2 className="text-center mx-auto">{loadingText}</h2>
      </div>
    </div>
  );
};

export default Loading;
