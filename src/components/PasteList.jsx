import React from "react";
import { useParams } from "react-router-dom";
import PasteItem from "./PasteItem";
import { AnimatePresence } from "framer-motion";

const PasteList = ({
    pastes,
    copiedId,
    setCopiedId,
    editPaste,
    deletePaste,
    shareLink,
    copyToClipboard,
}) => {
    const { pasteId } = useParams();

    return (



        <div className="space-y-5">
            <AnimatePresence>
                {pastes.map((paste) => (
                    <PasteItem
                        key={paste.id}
                        paste={paste}
                        copiedId={copiedId}
                        setCopiedId={setCopiedId}
                        editPaste={editPaste}
                        deletePaste={deletePaste}
                        shareLink={shareLink}
                        copyToClipboard={copyToClipboard}
                        readonly={!!pasteId}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default PasteList;
