import React, { FC, MouseEventHandler } from "react";
import { Editor } from "@tiptap/core";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListBulletIcon,
  ListNumberedIcon,
} from "../assets/icons";

const buttonClassName = "group hover:bg-yellow-400 p-1 rounded";
const activeClassName = "bg-gray-200";
const iconClassName = "group-hover:text-white size-4 sm:size-5 md:size-6";

const buttonConfigs = [
  {
    id: "bold",
    icon: BoldIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
  },
  {
    id: "italic",
    icon: ItalicIcon,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
  },
  {
    id: "heading1",
    icon: Heading1Icon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    id: "heading2",
    icon: Heading2Icon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    id: "heading3",
    icon: Heading3Icon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    id: "bulletList",
    icon: ListBulletIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
  },
  {
    id: "orderedList",
    icon: ListNumberedIcon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive("orderedList"),
  },
];

interface IconProps {
  className: string;
}

interface ToolbarButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
  Icon: FC<IconProps>;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, isActive, Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonClassName} ${isActive && activeClassName}`}
    >
      <Icon className={iconClassName} />
    </button>
  );
};

interface ToolbarProps {
  editor: Editor | null;
  className?: string;
}

const Toolbar: FC<ToolbarProps> = ({ editor, className }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 border-b ${className} min-h-20`}
    >
      {buttonConfigs.map(({ icon: Icon, action, isActive, id }) => (
        <ToolbarButton
          key={id}
          onClick={() => editor && action(editor)}
          isActive={editor ? isActive(editor) : false}
          Icon={Icon}
        />
      ))}
    </div>
  );
};

export default Toolbar;
