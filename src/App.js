import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import DarkModeToggle from "./components/DarkModeToggle";
import PasteEditor from "./components/PasteEditor";
import PasteList from "./components/PasteList";
import axiosClient from "./util/axiosClient";
import LogoutButton from "./components/LogoutButton";

import { ClipboardList } from "lucide-react";



export default function App() {
  const { pasteId } = useParams();
  const [pastes, setPastes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (pasteId) {
      fetchSinglePaste(pasteId);
    } else {
      fetchPastes();
    }
  }, [pasteId]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const fetchPastes = async () => {
    try {
      const res = await axiosClient.get(`/pastes`);
      setPastes(res.data);
    } catch (err) {
      toast.error("Failed to fetch pastes.");
    }
  };

  const fetchSinglePaste = async (id) => {
    try {
      const res = await axiosClient.get(`/pastes/${id}`);
      setPastes([res.data]);
    } catch (err) {
      toast.error("Failed to load paste.");
    }
  };

  const createOrUpdatePaste = async () => {
    if (!content.trim()) return;

    try {
      if (editingId) {
        await axiosClient.put(`/pastes/${editingId}`, { title, content });
        toast.success("Paste updated successfully");
      } else {
        await axiosClient.post(`/pastes`, { title, content });
        toast.success("Paste created successfully");
      }
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchPastes();
    } catch (err) {
      toast.error("Failed to save paste.");
    }
  };

  const clearEditor = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText.trim()) {
        toast.error("Clipboard is empty!");
        return;
      }
      await axiosClient.post(`/pastes`, { title: "From Clipboard", content: clipboardText });
      toast.success("Pasted from clipboard!");
      fetchPastes();
    } catch (err) {
      toast.error("Failed to paste from clipboard.");
    }
  };

  const editPaste = (paste) => {
    setTitle(paste.title);
    setContent(paste.content);
    setEditingId(paste.id);
  };

  const deletePaste = async (id) => {
    try {
      await axiosClient.delete(`/pastes/${id}`);
      fetchPastes();
      toast.success("Paste deleted successfully");
    } catch (err) {
      toast.error("Failed to delete paste.");
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareLink = (id) => {
    const url = `${window.location.origin}/pastes/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Shareable link copied");
  };

  return (
    <div
      className={`${darkMode
        ? "dark bg-gray-900 text-white"
        : "bg-gradient-to-br from-blue-100 to-white text-gray-800"
        } min-h-screen flex flex-col`}
    >
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 z-50 py-4 px-4 shadow-sm border-b dark:border-gray-800 flex justify-between items-center w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 md:w-8 md:h-8" />
          PasteBin
        </h1>
        <div className="flex items-center gap-3 md:gap-4">
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto px-2 md:px-6 py-4 md:py-6 md:h-[calc(100vh-125px)] flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

          {/* Left: Paste Editor */}
          {!pasteId && (
            <section className="order-1 md:order-1 bg-white dark:bg-gray-800 rounded-2xl md:border border-gray-200 dark:border-gray-700 p-4 md:p-6 flex flex-col justify-start">

              <PasteEditor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                fetchPastes={fetchPastes}
                createOrUpdatePaste={createOrUpdatePaste}
                pasteFromClipboard={pasteFromClipboard}
                clearEditor={clearEditor}
                editingId={editingId}
              />
            </section>
          )}

          {/* Right: Paste List */}
          <section className="order-2 md:order-2 bg-white dark:bg-gray-800 shadow-lg rounded-2xl md:border md:border-gray-200 dark:border-gray-700 p-4 md:p-6 md:overflow-y-auto h-full">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Your Pastes</h2>
            <PasteList
              pastes={pastes}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
              editPaste={editPaste}
              deletePaste={deletePaste}
              shareLink={shareLink}
              copyToClipboard={copyToClipboard}
            />
          </section>
        </div>
      </main>
    </div>

  );

}
