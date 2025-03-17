import { useEffect, useState } from "react"
import { FileList } from "./FileList";
import { ErrorToast } from "./errorToast";
import imgRemove from "./assets/removeFiles.png"

export function Reciever({ peerObj }) {

    const [recievedData, setRecievedData] = useState([]);

    const [errorState, setErrorState] = useState("")

    useEffect(() => {

        let filesFullfilled = 0
        let filesExpected = 0
        let fullfillSet = false

        peerObj.on("disconnected", () => {
            if (recievedData.length !== filesFullfilled) {
                setErrorState("Oh no, an error occurred obtaining your files...")
                console.error("The sending client disconnected prematurely.")
                let timer = setInterval(() => {
                    setErrorState("")
                    clearInterval(timer)
                }, 3000)
            }
        })

        peerObj.on("error", (error) => {
            setErrorState("Oh no, an error ocurred during file transit")
            console.error(error)
            let timer = setInterval(() => {
                setErrorState("")
                clearInterval(timer)
            }, 3000)
        })

        peerObj.on("connection", (conn) => {
            conn.on("open", () => {
                conn.on("data", (data) => {
                    if (data.purgeFile != null || data.purgeFile != undefined) return

                    if (data.expected && fullfillSet == false) {
                        filesExpected = data.filesExpected
                        fullfillSet = true
                    }

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
        <>
            <div className="reciever-wrapper">
                <div className="top-bar">
                    <button className="btn-files" onClick={() => {setRecievedData([])}}><img className="icon-row" src={imgRemove} /></button>
                    <h4 className="top-bar-header">Files you've recieved</h4>
                </div>
                <FileList files={recievedData} recieve={true} />
            </div>
            <ErrorToast error={errorState} />
        </>
    )
}