import "./styles.css";
import MarkdownHtmlTemplate from "./MarkdownHtmlTemplate";
import DownloadImagesButton from "./DownloadImagesButton";

export default function App() {
  return (
    <div className="App">
      <MarkdownHtmlTemplate />
      <DownloadImagesButton />
    </div>
  );
}
