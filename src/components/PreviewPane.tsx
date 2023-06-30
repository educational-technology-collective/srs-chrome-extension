import { marked } from "marked";

const PreviewPane = () => {
  const str = "**THIS IS A MARKDOWN.** *This is in italics.*\n# Heading 1\n## Heading 2";
  const rendered = marked.parse(str);

  return (
    <>
      <div id="previewPaneContainer">
        <div dangerouslySetInnerHTML={{ __html: rendered }}></div>
      </div>
    </>
  );
};

export { PreviewPane };
