"use client";
import { useState } from "react";

export default function page() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-screen h-screen overflow-x-auto bg-gray-50">
      <embed
        src={"/elpis-affiliate.pdf"}
        type="application/pdf"
        className="w-full h-screen"
      />
    </div>
  );
}
