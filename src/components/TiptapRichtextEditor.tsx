"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { FC } from "react";
import StarterKit from "@tiptap/starter-kit";
import TiptapMenuBar from "./TiptapMenuBar";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

interface TiptapRichtextEditorProps {
  label: string;
  field: string;
  content: string;
  isTouch: boolean | undefined;
  onChange: (content: string) => void;
  setError: (field: string, value: string | undefined) => void;
  setTouch: (field: string, value: boolean | undefined) => void;
}

const TiptapRichtextEditor: FC<TiptapRichtextEditorProps> = ({
  label,
  field,
  content,
  isTouch,
  onChange,
  setError,
  setTouch,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert", // tailwind css typography plugin
          "border rounded-md", // border
          "p-3", // padding
          "leading-[1.2] min-h[156px] max-w-none", // height of input container
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setTouch(field, true);
    },
    onBlur: () => {
      if (editor?.isEmpty) setError(field, `${label} is required`);
    },
  });
  return (
    <div>
      <Label className="mb-2">{label}</Label>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor?.isEmpty && isTouch && (
        <p className="text-xs text-red-500">{label} is required</p>
      )}
    </div>
  );
};

export default TiptapRichtextEditor;
