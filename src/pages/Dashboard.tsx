import Labels from "@/components/labels";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import MyForm from "@/components/setting-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type SettingType = {
  data?: File[];
  whichCQR?: string;
  showIdentifier?: boolean;
  showName?: boolean;
  showPrice?: boolean;
  showSize?: boolean;
  whichCName?: string;
  whichCPrice?: string;
  whichCSize?: string;
};

export default function Dashboard() {
  const [setting, setSetting] = useState<SettingType>({});
  const [sku, setSku] = useState<string>(""); // For input SKU
  const [toPrintItems, setToPrintItems] = useState<any[]>([]); // Store matched items
  const [allData, setAllData] = useState<any[]>([]); // Store all parsed data from the uploaded file

  // Read the file and set it to allData when setting is updated
  useEffect(() => {
    if (setting?.data && Array.isArray(setting.data)) {
      const file = setting.data[0]; // Assuming the data is an array of files
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const parsedData = JSON.parse(reader.result as string);
          setAllData(parsedData); // Set the parsed data to allData state
        } catch (err) {
          console.error("Error parsing the JSON file:", err);
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading the file:", err);
      };

      reader.readAsText(file);
    }
  }, [setting]); // Runs every time setting is updated

  // Handle key down event to filter items by SKU
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (allData.length > 0 && sku) {
      const alreadyExist = toPrintItems.some(
        (item: any) => setting.whichCQR && item[setting.whichCQR] === sku
      );

      if (alreadyExist) {
        toast.error("Item already added to the list.");
        setSku("");
        return;
      }

      // Match items based on the identifier (e.g., SKU, barcode, etc.)
      const matchedItems = allData.filter(
        (item: any) => setting.whichCQR && item[setting.whichCQR] === sku
      );

      if (matchedItems.length === 0) {
        console.log("No item found with the SKU:", sku);
        toast.error("No item found with the SKU.");
        setSku("");
        return;
      }

      // Map matched items to include only the necessary properties based on the settings
      const filteredItems = matchedItems.map((item: any) => {
        const filteredItem: any = {};

        // Include identifier if `showIdentifier` is true
        if (setting.showIdentifier) {
          if (setting.whichCQR) {
            filteredItem[setting.whichCQR] = item[setting.whichCQR];
          }
        }

        // Include name if `showName` is true
        if (setting.showName) {
          if (setting.whichCName) {
            filteredItem[setting.whichCName] = item[setting.whichCName];
          }
        }

        // Include price if `showPrice` is true
        if (setting.showPrice) {
          if (setting.whichCPrice) {
            filteredItem[setting.whichCPrice] = item[setting.whichCPrice];
          }
        }

        // Include size if `showSize` is true
        if (setting.showSize) {
          if (setting.whichCSize) {
            filteredItem[setting.whichCSize] = item[setting.whichCSize];
          }
        }

        return filteredItem;
      });

      setToPrintItems([...toPrintItems, ...filteredItems]); // Update the list with filtered items

      console.log("Printing items:", toPrintItems);
      setSku(""); // Clear the input field
    }
  };

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <MyForm setSetting={setSetting} />

      {/* Display SKU input if setting.data exists */}
      {setting?.data && (
        <>
          <div className="my-4">
            <label
              htmlFor="sku"
              className="block text-sm font-semibold text-gray-700"
            >
              Input SKU
            </label>
            <input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-2 p-2 border rounded text-black"
              placeholder="Enter SKU"
            />
          </div>

          <Labels setting={setting} allItems={toPrintItems} />
        </>
      )}
    </>
  );
}
