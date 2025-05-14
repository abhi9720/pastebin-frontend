// import React from "react";
// import { Copy, Edit2, Trash2, Share2, Check } from "lucide-react";
// import { motion } from "framer-motion";
// const PasteItem = ({
//     paste,
//     copiedId,
//     setCopiedId,
//     editPaste,
//     deletePaste,
//     shareLink,
//     copyToClipboard,
//     readonly,
// }) => {
//     const isCopied = copiedId === paste.id;

//     return (
//         <motion.div
//             key={paste.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 relative">
//             <div>
//                 <div className="flex items-center justify-between mb-2">
//                     <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300 truncate max-w-[65%]">
//                         {paste.title}
//                     </h2>

//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => copyToClipboard(paste.content, paste.id)}
//                             className={`${isCopied
//                                 ? "text-green-600 dark:text-green-400"
//                                 : "text-gray-500 dark:text-gray-400"
//                                 } hover:text-green-800 dark:hover:text-green-500`}
//                             title="Copy"
//                         >
//                             {isCopied ? <Check size={18} /> : <Copy size={18} />}
//                         </button>
//                         {!readonly && (
//                             <>
//                                 <button
//                                     onClick={() => editPaste(paste)}
//                                     className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-300"
//                                     title="Edit"
//                                 >
//                                     <Edit2 size={18} />
//                                 </button>
//                                 <button
//                                     onClick={() => deletePaste(paste.id)}
//                                     className="text-red-500 hover:text-red-700 dark:text-red-400"
//                                     title="Delete"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//                             </>
//                         )}
//                         <button
//                             onClick={() => shareLink(paste.id)}
//                             className="text-blue-500 hover:text-blue-700 dark:text-blue-400"
//                             title="Share"
//                         >
//                             <Share2 size={18} />
//                         </button>
//                     </div>
//                 </div>
//                 <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words text-sm">
//                     {paste.content}
//                 </p>
//             </div>
//         </motion.div>
//     );
// };

// export default PasteItem;
import React from "react";
import { motion } from "framer-motion";
import {
    Check,
    Copy,
    Edit2,
    Trash2,
    Share2,
    Download,
} from "lucide-react";

const PasteItem = ({
    paste,
    copiedId,
    setCopiedId,
    editPaste,
    deletePaste,
    shareLink,
    copyToClipboard,
    readonly,
}) => {
    const isCopied = copiedId === paste.id;
    const isFile = paste.type === "file";

    return (
        <motion.div
            key={paste.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 relative"
        >
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300 truncate max-w-[65%]">
                        {paste.title}
                    </h2>

                    <div className="flex gap-2">
                        {isFile ? (
                            <a
                                href={process.env.REACT_APP_BACKEND_URL + paste.content}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-500"
                                title="Download File"
                            >

                                <Download size={18} />
                            </a>
                        ) : (
                            <button
                                onClick={() => copyToClipboard(paste.content, paste.id)}
                                className={`${isCopied
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-500 dark:text-gray-400"
                                    } hover:text-green-800 dark:hover:text-green-500`}
                                title="Copy"
                            >
                                {isCopied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        )}

                        {!readonly && !isFile && (
                            <button
                                onClick={() => editPaste(paste)}
                                className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-300"
                                title="Edit"
                            >
                                <Edit2 size={18} />
                            </button>
                        )}

                        {!readonly && (
                            <button
                                onClick={() => deletePaste(paste.id)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}

                        <button
                            onClick={() => shareLink(paste.id)}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400"
                            title="Share"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words text-sm">
                    {isFile ? (
                        <p className="italic text-gray-500 dark:text-gray-400">

                            Uploaded file: <span className="underline">{paste.title}</span>
                        </p>
                    ) : (
                        <p>{paste.content}</p>
                    )}

                    <small className="absolute bottom-2 right-3 text-xs text-gray-600 dark:text-gray-400">
                        {new Date(paste.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </small>

                </div>

            </div>

        </motion.div>
    );
};

export default PasteItem;
