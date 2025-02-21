import React from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DownloadImagesButton = () => {
  const handleDownload = async () => {
    const blocks = document.querySelectorAll(".markdown-block");
    const zip = new JSZip();
    const folder = zip.folder("Instagram_Posts");

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const canvas = await html2canvas(block, {
        useCORS: true, // Enable cross-origin for images if needed
      });
      const dataUrl = canvas.toDataURL("image/png");
      folder.file(`post_${i + 1}.png`, dataUrl.split(",")[1], {
        base64: true,
      });
    }

    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, "Instagram_Posts.zip");
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007acc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Download All Posts
    </button>
  );
};

export default DownloadImagesButton;
