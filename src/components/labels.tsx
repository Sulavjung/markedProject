import React, { useRef } from "react";
import Barcode from "react-barcode"; // Import the Barcode component from the library
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { borderTopLeftRadius } from "html2canvas/dist/types/css/property-descriptors/border-radius";
import { Button } from "./ui/button";

type LabelsProps = {
  setting: any; // Replace `any` with the actual type if known
  allItems: any[]; // Adjust to a more specific type if possible
};

export default function Labels({ setting, allItems }: LabelsProps) {
  const labelRef = useRef(null);
  // Generate PDF
  const handleGeneratePDF = async () => {
    console.log("Generating PDF...");
    const input = labelRef.current;

    console.log("Input", input);

    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Labels.pdf");
    }
  };
  console.log(setting, allItems, setting.whichCQR, setting.showSku);
  return (
    <>
      <div ref={labelRef} className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {allItems.map((item) => {
          console.log(typeof item[setting.whichCQR]);
          return (
            <Card key={item.sku} className="mx-2 my-4 border border-black">
              <CardHeader className="border-b">
                <CardTitle>{item[setting.whichCName]}</CardTitle>
              </CardHeader>
              <div className="grid grid-cols-3 text-center divide-x">
                <div className="barcode">
                  {setting.showIdentifier && (
                    <Barcode
                      value={item[setting.whichCQR]} // You can use the SKU or any other identifier for barcode generation
                      width={2} // Width of the barcode lines
                      height={30} // Height of the barcode
                      displayValue={false} // Set to `true` if you want to display the SKU below the barcode
                    />
                  )}
                </div>
                <div style={{ alignSelf: "center" }} className="divide-x">
                  {setting.showSize === true && (
                    <span>Size: {item[setting.whichCSize]}</span>
                  )}
                </div>
                <div style={{ alignSelf: "center" }}>
                  {setting.showPrice && (
                    <span>Price: ${item[setting.whichCPrice]}</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Button onClick={handleGeneratePDF}>Generate PDF</Button>
    </>
  );
}
