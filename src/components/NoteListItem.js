import PropTypes from "prop-types";

const NoteListItem = ({ note, onClick, active, relativeDate }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer rounded-md ${
        active && "bg-yellow-300"
      }`}
    >
      <h3 className="text-sm font-bold">{note.title}</h3>
      <p className="text-xs font-medium">{relativeDate}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  relativeDate: PropTypes.string.isRequired,
};

export default NoteListItem;
