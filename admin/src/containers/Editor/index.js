// main
import { useEffect, useMemo, useRef } from "react";
import Quill from "quill";

const toolbarContainer = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

const toolbarContainerWithoutImage = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link"],
  ["clean"],
];

function Editor({
  placeholder,
  onChange = function () {},
  initialValue = { ops: [{ insert: "\n" }] },
  onBlur = function () {},
  onFocus = function () {},
  noImage = false,
}) {
  const quill = useRef();
  const editorRef = useRef();
  const containerRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: noImage ? toolbarContainerWithoutImage : toolbarContainer,
      cardEditable: true,
    }),
    [noImage]
  );

  useEffect(() => {
    if (quill.current) {
      return;
    }

    quill.current = new Quill(editorRef.current, {
      modules: modules,
      theme: "snow",
      placeholder: placeholder || "Thêm đoạn văn ở đây...",
    });

    quill.current.setContents(initialValue, "api");
    quill.current.on("text-change", () => {
      onChange(quill.current.getContents());
    });

    const editor = containerRef.current.querySelector(".ql-editor");
    const toolbar = containerRef.current.querySelector(".ql-toolbar");

    editor.onblur = (e) => {
      if (toolbar.contains(e.target)) {
        return;
      }
      onBlur();
    };

    editor.onfocus = (e) => {
      if (toolbar.contains(e.target)) {
        return;
      }
      onFocus();
    };
  }, [onChange]);

  return (
    <div ref={containerRef}>
      <div ref={editorRef}></div>
    </div>
  );
}

export default Editor;
