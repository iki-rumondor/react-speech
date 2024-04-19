import React, { useEffect, useRef } from "react";
import "turn.js";
import $ from "jquery";

export const FlipBookComponent = ({ pdfUrl }) => {
  const flipbookRef = useRef(null);

  useEffect(() => {
    const options = {
      width: 800,
      height: 600,
      autoCenter: true,
      // Konfigurasi tambahan seperti tata letak, warna, dll.
    };

    const flipbook = $(flipbookRef.current);
    if (!flipbook.turn) {
      console.error("Turn.js is not initialized properly.");
      return;
    }

    flipbook.turn(options);

    // Load PDF
    flipbook.turn("addPage", '<div style="background-color:white"></div>');

    const page = flipbook.turn("page", 1);
    page.html('<img src="' + pdfUrl + '" />');

    return () => {
      flipbook.turn("destroy");
    };
  }, [pdfUrl]);

  return <div ref={flipbookRef} className="flipbook-container" />;
};
