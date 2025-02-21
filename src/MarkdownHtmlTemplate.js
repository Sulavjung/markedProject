import React, { useState } from "react";
import marked from "marked";

const MarkdownHtmlTemplate = () => {
  const [markdown, setMarkdown] = useState(`## Welcome to Markdown  
This is a simple markdown editor.  
&&&&  
### Features  
- *Converts* Markdown to HTML  
- Uses a customizable template  
- Applies custom CSS  
&&&&  
### Enjoy!  
Happy coding! 🚀`);

  const [css, setCss] = useState(`
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;

    }
    .content-container {
      display: flex;
      align-items: center;  /* Center vertically */
      justify-content: center;  /* Center horizontally */
      text-align: center;  /* Ensure text inside is centered */
      padding: 40px;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      width: 1080px; /* Instagram Post Width */
      height: 1380px; /* Instagram Post Height */
      min-height: 400px;
      font-size: 24px; /* Adjust font size for readability */
      color: #333;
    }
    .logo {
      bottom: 10px;
      right: 10px;
      width: 100px;
      opacity: 0.8;
    }
  `);

  const [htmlTemplate, setHtmlTemplate] = useState(`
    <div class="content-container">
      <div>{{content}}</div>
    </div>
  `);

  const parseMarkdown = () => {
    // Split the markdown content by the delimiter &&&&
    return markdown.split("&&&&").map((md) => marked.marked(md.trim()));
  };

  const generateHtml = () => {
    const parsedMarkdown = parseMarkdown();
    const templateDiv = new DOMParser()
      .parseFromString(htmlTemplate, "text/html")
      .body.querySelector("div");

    if (!templateDiv) {
      return (
        <p>Please ensure your HTML template includes a `div` placeholder.</p>
      );
    }

    return parsedMarkdown.map((content, index) => {
      const filledTemplate = templateDiv.cloneNode(true);
      filledTemplate.innerHTML = filledTemplate.innerHTML.replace(
        "{{content}}",
        content
      );

      return (
        <div
          key={index}
          className="markdown-block" // Add this class for screenshots
          dangerouslySetInnerHTML={{ __html: filledTemplate.outerHTML }}
        />
      );
    });
  };

  return (
    <div>
      <h1>Markdown to HTML Template Renderer</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
        }}
      >
        <textarea
          placeholder="Enter Markdown here..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows="10"
          cols="30"
        />
        <textarea
          placeholder="Enter CSS here..."
          value={css}
          onChange={(e) => setCss(e.target.value)}
          rows="10"
          cols="30"
        />
        <textarea
          placeholder="Enter HTML Template here (use {{content}} as placeholder)"
          value={htmlTemplate}
          onChange={(e) => setHtmlTemplate(e.target.value)}
          rows="10"
          cols="30"
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: css }} />

      <h2>Generated Output:</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
        }}
      >
        {generateHtml()}
      </div>
    </div>
  );
};

export default MarkdownHtmlTemplate;
