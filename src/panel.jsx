import { useEffect, useRef, useState } from "react"
import { FileList } from "./FileList";
import { Recieverid } from "./Recieverid"
import { ErrorToast } from "./errorToast";


export function Uploader({ peerObj, peerId }) {

    const inputRef = useRef(null)

    const [files, setFiles] = useState([]);

    const [errorState, setErrorState] = useState("")

    useEffect(() => {
        peerObj.on("connection", (conn) => {
            conn.on("open", () => {
                conn.on("data", (data) => {
                    console.log(data)
                    if (data.purgeFile) {
                        try {
                            setFiles(currentFiles => {
                                return currentFiles.filter(file => file.id !== data.purgeFile)
                            })
                            return []
                        } catch (error) {
                            setErrorState("Hrm, an error has occurred removing your files from the list.")
                            console.error(error)
                            let timer = setInterval(() => {
                                setErrorState("")
                                clearInterval(timer)
                            }, 3000)
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
                let timer = setInterval(() => {
                    setErrorState("")
                    clearInterval(timer)
                }, 3000)
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
                let timer = setInterval(() => {
                    setErrorState("")
                    clearInterval(timer)
                }, 3000)
            }
        })
    }

    function handleDragOver(e) {
        e.preventDefault()
    }


    return (
        <>
            <input className="file-input" type="file" ref={inputRef} onChange={getFiles} multiple={true} />
            <div className="uploader-wrapper" onDragOver={handleDragOver} onDrop={getDroppedFiles} onClick={() => openFiles()}>
                <div className="top-bar">
                    <Recieverid peerObj={peerObj} peerId={peerId} files={files} />
                    <button className="btn-files" onClick={() => clear()}>Clear Files</button>
                    <button className="btn-files" onClick={() => openFiles()}>Choose Files</button>
                </div>
                <FileList files={files} />
            </div>
            <ErrorToast error={errorState} />
        </>
    )
}
