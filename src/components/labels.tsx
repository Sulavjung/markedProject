import React, { useRef } from "react";
import Barcode from "react-barcode"; // Import the Barcode component from the library
import { Card, CardHeader, CardTitle } from "./ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { set } from "react-hook-form";
import pdfmake from "pdfmake/build/pdfmake";
import { PageBreak } from "pdfmake/interfaces";

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

//var pdfmake = require('../js/index'); // only during development, otherwise use the following line

//var Roboto = require("../fonts/Roboto");
// pdfmake.addFonts(Roboto); // This method does not exist

const docDefinition = {
  content: [
    {
      text: "This is a page reference example. Page number of text element marked id property will be located in pageReference element. See below.\n\n",
    },
    {
      table: {
        body: [
          [
            { text: "page #", bold: true },
            { text: "title", bold: true },
          ],
          [{ pageReference: "header1", alignment: "right" }, "Header one"],
          [
            { pageReference: "subheader1", alignment: "right" },
            "Subheader one",
          ],
          [
            { pageReference: "subheader2", alignment: "right" },
            "Subheader two",
          ],
          [
            { pageReference: "subheader3", alignment: "right" },
            "Subheader three",
          ],
        ],
      },
    },
    {
      text: "\nAnd text can be referenced by textReference:\n",
    },
    {
      table: {
        body: [
          [
            { text: "page #", bold: true },
            { text: "title", bold: true },
          ],
          [
            { pageReference: "header1", alignment: "right" },
            { textReference: "header1" },
          ],
          [
            { pageReference: "subheader1", alignment: "right" },
            { textReference: "subheader1" },
          ],
          [
            { pageReference: "subheader2", alignment: "right" },
            { textReference: "subheader2" },
          ],
          [
            { pageReference: "subheader3", alignment: "right" },
            { textReference: "subheader3" },
          ],
        ],
      },
    },
    {
      text: "\nAnd all can be in inline texts:\n",
    },
    {
      text: [
        'Chapter "',
        { textReference: "header1" },
        '" is on page number ',
        { pageReference: "header1" },
      ],
    },
    {
      text: [
        'Chapter "',
        { textReference: "subheader1" },
        '" is on page number ',
        { pageReference: "subheader1" },
      ],
    },
    {
      text: [
        'Chapter "',
        { textReference: "subheader2" },
        '" is on page number ',
        { pageReference: "subheader2" },
      ],
    },
    {
      text: [
        'Chapter "',
        { textReference: "subheader3" },
        '" is on page number ',
        { pageReference: "subheader3" },
      ],
    },
    {
      text: "This is a header, using header style",
      style: "header",
      id: "header1",
      pageBreak: "before" as "before",
    },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n",
    {
      text: "Subheader 1 - using subheader style",
      style: "subheader",
      id: "subheader1",
      pageBreak: "before",
    },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n",
    {
      text: "Subheader 2 - using subheader style",
      style: "subheader",
      id: "subheader2",
      pageBreak: "before",
    },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n",
    {
      text: "It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties",
      style: ["quote", "small"],
    },
    {
      text: [
        {
          text: "Subheader 3 - using inline text",
          style: "subheader",
          id: "subheader3",
          tocItem: true,
        },
        {
          text: "; and this text not be displayed in ToC",
          italics: true,
        },
      ],
      pageBreak: "before",
    },
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
    },
    subheader: {
      fontSize: 15,
      bold: true,
    },
    quote: {
      italics: true,
    },
    small: {
      fontSize: 8,
    },
  },
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
      var now = new Date();

      var pdf = pdfmake.createPdf(docDefinition);
      pdf.download("pageReference.pdf"); // Triggers the download

      /* const pdf = new jsPDF("portrait", "mm", "a4");

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
      pdf.save("Labels.pdf"); */
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
