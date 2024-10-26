import Logo from "./components/Logo";
import MarkdownEditor from "./components/MarkdownEditor";
import NoteList from "./components/NoteList";
import { NotesProvider } from "./context/NoteContext";

function App() {
  return (
    <NotesProvider>
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 md:px-2 lg:px-0">
        <div className="flex flex-row bg-white h-screen md:h-4/6 w-full max-w-5xl shadow-2xl shadow-gray-200 rounded-none md:rounded-xl overflow-hidden">
          <div className="w-72 bg-white border-r">
            <div className="py-4 border-b min-h-20 flex items-center justify-center">
              <Logo />
            </div>
            <NoteList />
          </div>
          <MarkdownEditor />
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
