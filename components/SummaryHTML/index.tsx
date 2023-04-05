import { FC, useEffect, useRef } from "react";

interface Props {
  html: string;
}

const ResponseHTML: FC<Props> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null!);

  const formattedHtml = html
    .replaceAll("</p>", "</p><br />")
    .replace(
      "<strong>Positivo:</strong>",
      "<strong class='text-success'>Aspectos positivos</strong>"
    )
    .replace(
      "<strong>Negativo:</strong>",
      "<strong class='text-error'>Aspectos negativos</strong>"
    );

  useEffect(() => {
    ref.current.innerHTML = formattedHtml;
  });

  return <div ref={ref} className="gpt" />;
};

export default ResponseHTML;
