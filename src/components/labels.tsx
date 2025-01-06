import React, { useRef } from "react";
import Barcode from "react-barcode"; // Import the Barcode component from the library
import { Card, CardHeader, CardTitle } from "./ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { set } from "react-hook-form";

type LabelsProps = {
  setting: any; // Replace `any` with the actual type if known
  allItems: any[]; // Adjust to a more specific type if possible
};

// Function to split array into chunks of a specific size
const chunkArray = (array: any[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export default function Labels({ setting, allItems }: LabelsProps) {
  const labelRefs = useRef<HTMLDivElement[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);

  // Generate PDF
  const handleGeneratePDF = async () => {
    console.log("Generating PDF...");
    toast.info("Generating PDF...");

    setIsGenerating(true);

    // Wait for the next repaint to ensure that elements are visible
    setTimeout(async () => {
      const pdf = new jsPDF("portrait", "mm", "a4");

      for (let i = 0; i < labelRefs.current.length; i++) {
        const input = labelRefs.current[i];
        if (input) {
          const canvas = await html2canvas(input, { scale: 2 });
          const imgData = canvas.toDataURL("image/png");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          if (i !== labelRefs.current.length - 1) {
            pdf.addPage(); // Add a new page for the next set of cards
          }
        }
      }

      // Save the PDF
      pdf.save("Labels.pdf");
      setIsGenerating(false);
      toast.success("PDF generated successfully!");
    }, 100);
  };

  // Split allItems into chunks of 14
  const chunkedItems = chunkArray(allItems, 14);

  return (
    <>
      {chunkedItems.map((chunk, index) => (
        <div key={index} className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-8">
          {chunk.map((item) => (
            <Card key={item.sku} className="mx-2 my-4 border border-black">
              <CardHeader className="border-b border-black p-3">
                <CardTitle className="text-2xl">
                  {item[setting.whichCName]}
                </CardTitle>
              </CardHeader>
              <div className="grid grid-cols-3 text-center divide-x divide-black">
                <div className="barcode">
                  {setting.showIdentifier && (
                    <Barcode
                      value={item[setting.whichCQR]} // Use the SKU or any other identifier for barcode generation
                      width={2} // Width of the barcode lines
                      height={30} // Height of the barcode
                      displayValue={true} // Display the SKU below the barcode
                    />
                  )}
                </div>
                <div style={{ alignSelf: "center" }}>
                  {setting.showSize && (
                    <span>Size: {item[setting.whichCSize]}</span>
                  )}
                </div>
                <div style={{ alignSelf: "center" }}>
                  {setting.showPrice && (
                    <span className="text-2xl font-bold text-black">
                      ${item[setting.whichCPrice]}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
      <Button onClick={handleGeneratePDF}>Generate PDF</Button>

      {isGenerating && (
        <div style={{ width: "1000px", height: "1200px" }}>
          {chunkedItems.map((chunk, index) => (
            <div
              ref={(el) => (labelRefs.current[index] = el!)}
              key={index + "pdf"}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {chunk.map((item) => (
                <Card
                  key={item.sku + "pdf"}
                  className="mx-2 my-4 border border-black"
                >
                  <CardHeader className="border-b border-black p-3">
                    <CardTitle className="text-2xl">
                      {item[setting.whichCName]}
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-3 text-center divide-x divide-black">
                    <div className="barcode">
                      {setting.showIdentifier && (
                        <Barcode
                          value={item[setting.whichCQR]} // Use the SKU or any other identifier for barcode generation
                          width={2} // Width of the barcode lines
                          height={30} // Height of the barcode
                          displayValue={true} // Display the SKU below the barcode
                        />
                      )}
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      {setting.showSize && (
                        <span>Size: {item[setting.whichCSize]}</span>
                      )}
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      {setting.showPrice && (
                        <span className="text-2xl font-bold text-black">
                          ${item[setting.whichCPrice]}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
