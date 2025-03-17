import { useEffect, useState } from "react"
import { FileList } from "./FileList";

export function Reciever({ peerObj }) {

    const [recievedData, setRecievedData] = useState([]);

    useEffect(() => {
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
    }, [peerObj])

    return (
        <div className="reciever-wrapper">
            <div className="top-bar-recieve">
                <h4 className="top-bar-header">Files you've recieved</h4>
                <button className="btn-files" onClick={() => {setRecievedData([])}}>Clear Files</button>
            </div>

            <FileList files={recievedData} recieve={true} />
        </div>
    )
}