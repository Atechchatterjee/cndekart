"use client";
import { useEditor, EditorContent, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "./ui/toggle";
import { GoBold, GoItalic } from "react-icons/go";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { Card } from "./ui/card";
import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CustomParagraph } from "./tiptap-components/customParagraph";
import { MdFormatUnderlined } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { Indent } from "./tiptap-components/indent";
import { LuIndent, LuOutdent } from "react-icons/lu";
import { useEffect } from "react";

const Tiptap = ({
  content,
  onChange,
  placeholder = "",
  editable = true,
  clear = false,
  setClear,
  textMode = false,
  toolbar = editable,
  ...props
}: {
  content: string;
  onChange?: Function;
  toolbar?: boolean;
  clear?: boolean;
  textMode?: boolean;
  placeholder?: string;
  setClear?: Function;
} & Partial<EditorOptions>) => {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Indent.configure({}),
      Underline.configure({}),
      Placeholder.configure({ placeholder: placeholder }),
      BulletList.configure({
        itemTypeName: "listItem",
        keepAttributes: false,
        keepMarks: false,
      }),
      CustomParagraph.configure({}),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: editable
          ? "rounded-md border min-h-[23rem] border-input p-3 pl-4 text-md"
          : "",
      },
    },
    onUpdate({ editor }) {
      if (onChange) onChange(JSON.stringify(editor.getJSON()));
    },
    ...props,
  });

  // clears the editor contents (when needed)
  useEffect(() => {
    if (editor && clear) {
      editor.commands.clearContent();
      if (setClear) {
        setClear(false);
      }
    }
  }, [editor, clear]);

  // makes sure the editor renders only the text output (when needed)
  useEffect(() => {
    if (editor && textMode)
      editor.commands.setContent(editor.state.doc.textContent);
  }, [editor, textMode]);

  if (!editor) return <></>;

  return (
    <div className="flex flex-col gap-3">
      {toolbar && (
        <Card className="flex p-1">
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => {
              editor.chain().focus().toggleBold().run();
            }}
          >
            <GoBold size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => {
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <GoItalic size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("underline")}
            onPressedChange={() => {
              editor.chain().focus().toggleUnderline().run();
            }}
          >
            <MdFormatUnderlined size={16} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
          >
            <LuHeading1 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
          >
            <LuHeading2 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
          >
            <LuHeading3 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 4 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
            }}
          >
            <LuHeading4 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 5 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
            }}
          >
            <LuHeading5 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("heading", { level: 6 })}
            onPressedChange={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
            }}
          >
            <LuHeading6 size={20} />
          </Toggle>
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
          >
            <MdOutlineFormatListBulleted />
          </Toggle>
          <Toggle
            pressed={editor.isActive("indent")}
            onPressedChange={() => {
              (editor.chain().focus() as any).indent().run();
            }}
          >
            <LuIndent />
          </Toggle>
          <Toggle
            pressed={editor.isActive("indent")}
            onPressedChange={() => {
              (editor.chain().focus() as any).outdent().run();
            }}
          >
            <LuOutdent />
          </Toggle>
        </Card>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
