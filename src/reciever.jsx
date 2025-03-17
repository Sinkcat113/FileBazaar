import { useEffect, useState } from "react"
import { FileList } from "./FileList";
import { ErrorToast } from "./errorToast";

export function Reciever({ peerObj }) {

    const [recievedData, setRecievedData] = useState([]);

    const [errorState, setErrorState] = useState("")

    useEffect(() => {
        try {
            peerObj.on("connection", (conn) => {
                conn.on("open", () => {
                    conn.on("data", (data) => {
                        if (data.purgeFile != null || data.purgeFile != undefined) return
    
                        const file = new File([data.blobData], data.fileName, { type: data.blobData.type })
                        const fileData = {fileData: file, id: data.id, type: data.type}
    
                        setRecievedData((currentFiles) => {
                            if (currentFiles.some(item => item.id === data.id)) {
                                return currentFiles
                            }
                            return [...currentFiles, fileData]
                        })
                        
                        const con = peerObj.connect(data.from)
    
                        con.on("open", () => {
                            con.send({purgeFile: fileData.id})
                        })
                    })
                })
            })
        } catch (error) {
            setErrorState("Oh no, an error occurred obtaining your files...")
            console.error(error)
            let timer = setInterval(() => {
                setErrorState("")
                clearInterval(timer)
            }, 1200)
        }
    }, [peerObj])

    return (
        <>
            <div className="reciever-wrapper">
                <div className="top-bar-recieve">
                    <h4 className="top-bar-header">Files you've recieved</h4>
                    <button className="btn-files" onClick={() => {setRecievedData([])}}>Clear Files</button>
                </div>
                <FileList files={recievedData} recieve={true} />
            </div>
            <ErrorToast error={errorState} />
        </>

    )
}