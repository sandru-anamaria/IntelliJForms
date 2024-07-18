import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./ViewForm.css";
import parse from "html-react-parser";

export default function ViewForm({ form, conentPdfAll }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const generatePDFWithDebounce = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        generatePDF();
      }, 2000);
    };

    generatePDFWithDebounce();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [conentPdfAll]);

  const generatePDF = () => {
    const elements = document.querySelectorAll(".section");
    const tempContainer = document.createElement("div");

    const options = {
      margin: [0, 0, 0, 0],
      filename: "example.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    elements.forEach((element) => {
      const clonedElement = element.cloneNode(true);
      tempContainer.appendChild(clonedElement);
    });

    html2pdf()
      .set(options)
      .from(tempContainer)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const pdfUrl = URL.createObjectURL(pdf.output("blob"));
        setPdfUrl(pdfUrl);
      });
  };

  return (
    <div>
      <div className="all5">
        <iframe src={pdfUrl} width="500px" height="580px" />
        <div className="Pdf" style={{ display: "none" }}>
          {form.sections.map((section, index) => (
            <div className="section" key={index}>
              {conentPdfAll && typeof conentPdfAll === "string"
                ? parse(conentPdfAll)
                : parse(section.content)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
