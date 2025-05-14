import React, { useState } from "react";
import {
    Plus,
    Pencil,
    ClipboardPaste as PasteIcon,
    Upload,
    FileText,
    X,
} from "lucide-react";
import axiosClient from "../util/axiosClient";
import toast from "react-hot-toast";

const PasteEditor = ({
    title,
    setTitle,
    content,
    setContent,
    createOrUpdatePaste,
    pasteFromClipboard,
    fetchPastes,
    clearEditor,
    editingId,
}) => {
    const [pasteKind, setPasteKind] = useState("text");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async () => {
        if (!file) {
            toast.error("Please select a file first.");
            return
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        setUploading(true);
        try {
            const res = await axiosClient.post("/api/paste/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.status === 200) {
                toast.success("File uploaded successfully!");
                setTitle("");
                setContent("");
                fetchPastes();
                setFile(null);
            } else {
                toast.error("Upload failed");

            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Something went wrong.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6 text-center">
                {editingId ? "Edit Your Paste" : "Create a New Paste"}
            </h3>

            {/* Paste Type Toggle */}
            <div className="flex mb-6 gap-4">
                <button
                    onClick={() => setPasteKind("text")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-200 font-medium text-sm
          ${pasteKind === "text"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <FileText size={18} /> Text
                </button>
                <button
                    onClick={() => setPasteKind("file")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-200 font-medium text-sm
          ${pasteKind === "file"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                        }`}
                >
                    <Upload size={18} /> File
                </button>
            </div>

            {/* Title Input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title (optional)"
                className="w-full px-4 py-3 mb-4 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Content / File Input */}
            {pasteKind === "text" ? (
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your content here..."
                    className="w-full px-4 py-3 mb-4 text-sm rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[12rem]"
                ></textarea>
            ) : (
                <label className="w-full mb-4">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                    />
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer text-gray-500 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:hover:border-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition">
                        <Upload size={20} className="mr-2" />
                        {file ? file.name : "Click to select a file"}
                    </div>
                </label>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {pasteKind === "text" ? (
                    <>
                        <button
                            onClick={createOrUpdatePaste}
                            className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                        >
                            {editingId ? (
                                <>
                                    <Pencil size={18} /> Update
                                </>
                            ) : (
                                <>
                                    <Plus size={18} /> Create
                                </>
                            )}
                        </button>

                        {editingId ? (
                            <button
                                onClick={clearEditor}
                                className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        ) : (
                            <button
                                onClick={pasteFromClipboard}
                                className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                            >
                                <PasteIcon size={18} /> Paste from Clipboard
                            </button>
                        )}

                    </>
                ) : (
                    <button
                        onClick={uploadFile}
                        disabled={uploading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                    >
                        <Upload size={18} />
                        {uploading ? "Uploading..." : "Upload File"}
                    </button>
                )}
            </div>
        </div>
    );

};

export default PasteEditor;
