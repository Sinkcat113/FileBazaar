import { useEffect, useRef, useState } from "react"
import { FileList } from "./FileList";
import { Recieverid } from "./Sender"
import { ErrorToast } from "./errorToast";
import imgRemove from "./assets/removeFiles.png"
import imgSelection from "./assets/selection.png"


export function Uploader({ peerObj, peerId }) {

    const inputRef = useRef(null)

    const [files, setFiles] = useState([]);

    const [errorState, setErrorState] = useState("")

    useEffect(() => {
        peerObj.on("connection", (conn) => {
            conn.on("open", () => {
                conn.on("data", (data) => {
                    if (data.purgeFile) {
                        try {
                            setFiles(currentFiles => {
                                return currentFiles.filter(file => file.id !== data.purgeFile)
                            })
                            return []
                        } catch (error) {
                            setErrorState("Hrm, an error has occurred removing your files from the list.")
                            console.error(error)
                        }
                    }
                })
            })
        })
    }, [peerObj])

    function openFiles() {
        inputRef.current.click()
    }

    function clear() {
        setFiles([])
    }

    function getDroppedFiles(e) {
        e.preventDefault()
        const selectedFiles = Array.from(e.dataTransfer.files)

        selectedFiles.forEach(file => {
            try {
                setFiles(currentFiles => {
                    return [...currentFiles, {fileData: file, id: crypto.randomUUID()}]
                })
            } catch (error) {
                setErrorState("Uh oh, an error occurred getting the dropped files :/")
                console.error(error)
            }
        })
    }

    function getFiles(e) {
        const selectedFiles = Array.from(e.target.files)

        selectedFiles.forEach(file => {
            try {
                setFiles(currentFiles => {
                    return [...currentFiles, {fileData: file, id: crypto.randomUUID()}]
                })
            } catch (error) {
                setErrorState("Uh oh, an error occurred getting your files :/")
                console.error(error)
            }
        })
    }

    function handleDragOver(e) {
        e.preventDefault()
    }


    return (
        <>
            <input className="file-input" type="file" ref={inputRef} onChange={getFiles} multiple={true} />
            <div className="uploader-wrapper" onDragOver={handleDragOver} onDrop={getDroppedFiles}>
                <div className="top-bar">
                    <div>
                        <Recieverid peerObj={peerObj} peerId={peerId} files={files} />
                    </div>
                    <div className="btn-row">
                        <button className="btn-files" onClick={() => clear()}><img className="icon-row" src={imgRemove} /></button>
                        <button className="btn-files" onClick={() => openFiles()}><img className="icon-row" src={imgSelection} /></button>
                    </div>
                </div>
                <FileList files={files} />
            </div>
            <ErrorToast error={errorState} />
        </>
    )
}
