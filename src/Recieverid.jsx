import { use, useEffect, useState } from "react"
import { ErrorToast } from "./errorToast"


export function Recieverid({ peerObj, files, peerId }) {

    const [recieverID, setRecieverID] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [errorState, setErrorState] = useState("")

    function asssignID(e) {
        setRecieverID(e.target.value)
    }

    useEffect(() => {
        peerObj.on("error", (error) => {
            setSendingBool(false)
            setErrorState("Shoot, an error occurred sending your files :/")
            console.error(error)
            peerObj.disconnect()
        })
    }, [files, peerObj])


    function send(e) {
        e.preventDefault();

        setIsSending(true)


        if (files.length > 0 && recieverID) {
            let conn = peerObj.connect(recieverID)

            peerObj.on("connection", (conn) => {
                conn.on("open", () => {
                    conn.on("data", (data) => {
                        if (data.filesSent == data.remainingFiles || files.length == 0) {
                            setIsSending(false)
                        }
                    })
                })
            })

            conn.on("open", () => {
                files.forEach(fileItem => {
                    let file = fileItem.fileData;
                    const blob = new Blob([file], { type: file.type })

                    const fileFinal = {blobData: blob, fileName: file.name, id: fileItem.id, type: file.type, from: peerId, expected: files.length }

                    conn.send(fileFinal)
                })
            })
        }
    }

    return (
        <>
            <form onSubmit={send} disabled={isSending ? true : false}>
                <input disabled={isSending ? true : false} className="id-textbox-long" id="idTextBox" name="reciever" placeholder="Reciever ID" value={recieverID} type="text" onChange={asssignID} />
                <button className="btn-send" disabled={isSending === false && files.length > 0 ? false : true} type="submit">{isSending ? "Sending" : "Send"}</button>
            </form>
            <ErrorToast error={errorState} />
        </>
    )
}