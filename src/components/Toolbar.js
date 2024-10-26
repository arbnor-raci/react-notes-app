import PropTypes from "prop-types";
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
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    id: "italic",
    icon: ItalicIcon,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    id: "heading1",
    icon: Heading1Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    id: "heading2",
    icon: Heading2Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    id: "heading3",
    icon: Heading3Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    id: "bulletList",
    icon: ListBulletIcon,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    id: "orderedList",
    icon: ListNumberedIcon,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
];

const ToolbarButton = ({ onClick, isActive, Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonClassName} ${isActive && activeClassName}`}
    >
      <Icon className={iconClassName} />
    </button>
  );
};

const Toolbar = ({ editor, className }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 border-b ${className} min-h-20`}
    >
      {buttonConfigs.map(({ icon: Icon, action, isActive, id }) => (
        <ToolbarButton
          key={id}
          onClick={() => action(editor)}
          isActive={isActive(editor)}
          Icon={Icon}
        />
      ))}
    </div>
  );
};

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

Toolbar.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default Toolbar;
