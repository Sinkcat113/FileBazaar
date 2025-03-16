import { useEffect, useRef, useState } from "react"
import { FileList } from "./FileList";
import { Recieverid } from "./RecieverID";

export function Uploader({ peerObj }) {

    const inputRef = useRef(null)

    const [files, setFiles] = useState([]);

    function openFiles() {
        inputRef.current.click()
    }

    function clear() {
        setFiles([])
    }

    function getFiles(e) {
        const selectedFiles = Array.from(e.target.files)

        selectedFiles.forEach(file => {
            setFiles(currentFiles => {
                return [...currentFiles, {fileData: file, id: crypto.randomUUID()}]
            })
        })
    }

    return (
        <>
            <input className="file-input" type="file" ref={inputRef} onChange={getFiles} multiple={true} />
            <div className="uploader-wrapper">
                <div className="top-bar">
                    <Recieverid peerObj={peerObj} files={files} />
                    <button className="btn-files" onClick={() => clear()}>Clear Files</button>
                    <button className="btn-files" onClick={() => openFiles()}>Choose Files</button>
                </div>
                <FileList files={files} />
            </div>
        </>
    )
}
