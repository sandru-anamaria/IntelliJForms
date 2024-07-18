import "primeicons/primeicons.css";
import { Editor } from "primereact/editor";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { useEffect, useState } from "react";

function EditorComponent({
  sect,
  parentContent,
  currentIndexSection,
  onChildClick,
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(parentContent);
  }, [parentContent]);

  useEffect(() => {
    const updatedSect = { ...sect };
    updatedSect.sections[currentIndexSection].content = text;

    onChildClick(updatedSect);
  }, [text]);

  const handleChange = (e) => {
    const htmlValue = e.htmlValue;
    setText(htmlValue);
  };

  return (
    <div>
      <Editor
        value={text}
        onTextChange={handleChange}
        style={{ height: "120px" }}
      />
    </div>
  );
}

export default EditorComponent;
