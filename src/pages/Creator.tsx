import React, { useEffect, useState } from "react";
import { marked } from "marked";
import { Textarea } from "@/components/ui/textarea";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import JSZip, { forEach } from "jszip";
import { saveAs } from "file-saver";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SCALE = 1;

type Template = {
  name: string;
  css: string;
  html: string;
};

const templates: Template[] = [
  {
    name: "Black & Green",
    css: `
.content-container {
  font-family: "Times New Roman", Times, serif ;
  display: flex;
  align-items: center;
  justify-content: start;
  text-align: start;
  padding: 200px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 1080px;
  height: 1380px;
  min-height: 400px;
  font-size: 48px;
  font-weight: bold;
  color: #04444B;
  box-sizing: border-box; /* Ensure padding doesn't increase width */
}

/* Target even markdown-blocks to apply different styles */
.markdown-block:nth-child(even) .content-container {
  background-color: #04444B; /*darkblue: #04444B black: #1f2120 */
  color: white;
}

.download-block:nth-child(even) .content-container {
  background-color: #04444B; /*darkblue: #04444B black: #1f2120 */
  color: white;
}

li {
  list-style: none;
}`,
    html: `
    <div class="content-container">
      <div>{{content}}</div>
    </div>
  `,
  },
  {
    name: "Twitter",
    css: `


.content-container {
 font-family: Arial, sans-serif;
display: flex;
align-items: center;
justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
text-align: start;
background: white;
width: 700px; /* paddng is set by width bigger than the tweek box of 500 width.*/
height: 1000px;
min-height: 400px;
box-sizing: border-box; /* Ensure padding doesn't increase width */
border: 1px solid black;
}

.tweet {
    background-color: white;
    border: 1px solid #e1e8ed;
    border-radius: 12px;
    width: 500px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tweet-header {
    display: flex;
    align-items: center;
justify-content: start;
}

.avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 10px;
}

.user-info {
    flex-grow: 1;
text-align: start;
}

.username {
    font-weight: bold;
    margin: 0;
    font-size: 15px;
}

.handle {
    color: #657786;
    font-size: 14px;
    margin: 0;
}

.timestamp {
    color: #657786;
    font-size: 14px;
    margin-left: 5px;
}

.tweet-content {
    margin: 10px 0;
    font-size: 25px;
    line-height: 1.4;
text-align: start;
}

.tweet-actions {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin-top: 10px;
}

.action {
    display: flex;
    align-items: center;
    color: #657786;
    font-size: 14px;
    cursor: pointer;
}

.action:hover {
    color: #1da1f2;
}

.action span {
    margin-left: 5px;
}

/* Placeholder icons using simple shapes */


.action:hover .icon {
    background-color: #1da1f2;
}`,
    html: `<div class="content-container">
  <div class="tweet">
    <div class="tweet-header">
      <img
        class="avatar"
        src="data:image/jpeg;base64,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"
        alt="Sulav's Avatar"
      />
      <div class="user-info">
        <p class="username">Sulav</p>
        <p class="handle">
          @sulav_hamal <span class="timestamp">· Feb 21, 2025</span>
        </p>
      </div>
    </div>
    <div class="tweet-content">{{content}}</div>
    <div class="tweet-actions">
      <div class="action">
        <div class="icon">❤️</div>
        <span>122</span>
      </div>
      <div class="action">
        <div class="icon">💬</div>
        <span>45</span>
      </div>
      <div class="action">
        <div class="icon">🔁</div>
        <span>78</span>
      </div>
      <div class="action">
        <div class="icon">📤</div>
        <span>12</span>
      </div>
    </div>
  </div>
</div>`,
  },
];

const Creator: React.FC = () => {
  const [downloadTrigger, setDownloadTrigger] = useState(false);
  const [markdown, setMarkdown] = useState<string>(`
    
    This is a simple markdown editor.  
    &&&&  

    - *Converts* Markdown to HTML  
    - Uses a customizable template  
    - Applies custom CSS  
    &&&&  

    Happy coding! 🚀
  `);

  const [css, setCss] = useState<string>(`

    .content-container {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      width: 600px; /* Instagram Post Width */
      height: 800px; /* Instagram Post Height */
      min-height: 400px;
      font-size: 24px;
      color: #333;
    }
    .logo {
      bottom: 10px;
      right: 10px;
      width: 100px;
      opacity: 0.8;
    }
  `);

  const [htmlTemplate, setHtmlTemplate] = useState<string>(`
    <div class="content-container">
      <div>{{content}}</div>
    </div>
  `);

  const parseMarkdown = (): string[] => {
    return markdown
      .split("&&&&")
      .map((md) => marked.parse(md.trim()) as string);
  };

  const generateHtml = (classname: string) => {
    const parsedMarkdown = parseMarkdown();
    const templateDiv = new DOMParser()
      .parseFromString(htmlTemplate, "text/html")
      .body.querySelector("div");

    if (!templateDiv) {
      return (
        <p className="text-red-500">
          Please ensure your HTML template includes a `div` placeholder.
        </p>
      );
    }

    return parsedMarkdown.map((content, index) => {
      const filledTemplate = templateDiv.cloneNode(true) as HTMLDivElement;
      filledTemplate.innerHTML = filledTemplate.innerHTML.replace(
        "{{content}}",
        content
      );

      return (
        <div
          key={index}
          className={classname}
          dangerouslySetInnerHTML={{ __html: filledTemplate.outerHTML }}
        />
      );
    });
  };

  const handleDownload = async () => {
    setDownloadTrigger(true);

    // Wait for the DOM to reflect the changes
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const blocks = document.querySelectorAll(".download-block");
    const zip = new JSZip();
    const folder = zip.folder("Instagram_Posts");

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i] as HTMLElement;
      const canvas = await html2canvas(block, {
        useCORS: true, // Enable cross-origin for images if needed
      });
      const dataUrl = canvas.toDataURL("image/png");
      if (folder) {
        folder.file(`post_${i + 1}.png`, dataUrl.split(",")[1], {
          base64: true,
        });
      }
    }

    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, "Instagram_Posts.zip");

    setDownloadTrigger(false);
  };

  const handleTemplateChange = (value: string) => {
    const selectedTemplate = templates.find(
      (template) => template.name === value
    );
    if (selectedTemplate) {
      setCss(selectedTemplate.css);
      setHtmlTemplate(selectedTemplate.html);
    }
  };

  useEffect(() => {
    const resize = () => {
      const previewContainer =
        document.getElementsByClassName("markdown-container");
      const eachPreview = document.getElementsByClassName("markdown-block");
      const heightFixer = document.getElementsByClassName(
        "height-fixer"
      )[0] as HTMLElement;

      if (!eachPreview || eachPreview.length === 0) return;

      console.log(previewContainer, eachPreview);

      const width = window.innerWidth - 30;
      const height = window.innerHeight - 30;

      const previeContainerElement = previewContainer[0] as HTMLElement;

      const maxWidth = eachPreview[0].clientWidth;

      console.log(
        "Outside Container Width: ",
        previeContainerElement.clientWidth
      );
      console.log(
        "Inside element initial height: ",
        eachPreview[0].clientHeight,
        "Total Preview element: ",
        eachPreview.length
      );

      const shouldScale = maxWidth >= width;
      const scale = width / maxWidth;
      const new_Height_of_Container =
        eachPreview[0].clientHeight * scale * eachPreview.length;

      heightFixer.style.height = shouldScale
        ? `${new_Height_of_Container + 50}px`
        : "";
      previeContainerElement.style.transformOrigin = "top"; // Ensures proper scaling anchor
      previeContainerElement.style.transform = shouldScale
        ? `scale(${scale})`
        : "";

      /* for (let index = 0; index < eachPreview.length; index++) {
        const previewElement = eachPreview[index] as HTMLElement;

        const maxWidth = previewElement.clientWidth;
        const maxHeight = previewElement.clientHeight;

        const shouldScale = maxWidth >= width;
        const scale = Math.min(width / maxWidth, height / maxHeight);

        console.log(maxWidth, maxHeight, width, height, shouldScale, scale);

        previewElement.style.transform = shouldScale ? `scale(${scale})` : "";
      } */
    };

    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="container px-2 px-sm-0 md:px-8 bg-background">
      <PageHeader>
        <PageHeaderHeading>Create</PageHeaderHeading>
        <PageHeaderDescription>
          <div className="flex flex-row gap-2">
            <Button variant="outline" onClick={handleDownload}>
              {" "}
              <Share size={18} />
            </Button>
            <Select
              onValueChange={handleTemplateChange}
              defaultValue={templates[0].name}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PageHeaderDescription>
      </PageHeader>

      <div className="flex flex-col md:flex-row flex-grow gap-4 w-full pb-10">
        <div className="w-full">
          <Label>Markdown</Label>
          <Textarea
            placeholder="Enter Markdown here..."
            value={markdown}
            rows={10}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter your markdown content here. This will be converted into HTML
            when rendered.
          </p>
        </div>

        <div className="w-full">
          <Label>CSS</Label>
          <Textarea
            placeholder="Enter CSS here..."
            value={css}
            onChange={(e) => setCss(e.target.value)}
            rows={10}
            className="w-full resize-none border rounded-md p-2"
          />
          <p className="text-sm text-gray-500 mt-2">
            Provide custom CSS styles to format the markdown content. Ensure
            correct syntax for styling.
          </p>
        </div>

        <div className="w-full">
          <Label>HTML</Label>
          <Textarea
            placeholder="Enter HTML Template here (use {{content}} as placeholder)"
            value={htmlTemplate}
            onChange={(e) => setHtmlTemplate(e.target.value)}
            rows={10}
            className="w-full resize-none border rounded-md p-2"
          />
          <p className="text-sm text-gray-500 mt-2">
            {`Provide the HTML template. Use {{ content }} as a placeholder for
            the rendered markdown content.`}
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: css }} />

      <h2 className="mt-6 text-xl font-semibold">Preview:</h2>
      <div className="height-fixer overflow-hidden">
        <div className="markdown-container flex flex-col gap-4 mt-4 w-full items-center justify-center">
          {generateHtml("markdown-block")} {/* Don't change this as this */}
        </div>
      </div>

      {downloadTrigger && (
        <div className=" flex flex-col gap-4 mt-4 w-full items-center justify-center">
          {generateHtml("download-block")} {/* Don't change this as this */}
        </div>
      )}
    </div>
  );
};

export default Creator;
