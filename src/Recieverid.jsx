import { use, useEffect, useState } from "react"
import { ErrorToast } from "./errorToast"


export function Recieverid({ peerObj, files, peerId }) {

    const [recieverID, setRecieverID] = useState("")
    const [sending, setSending] = useState("Send")
    const [sendingBool, setSendingBool] = useState(true)
    const [recieverBox, setRecieverBox] = useState(false)
    const [isSending, setIsSending] = useState(false)

    const [errorState, setErrorState] = useState("")

    function asssignID(e) {
        setRecieverID(e.target.value)
    }

    useEffect(() => {
        peerObj.on("error", (error) => {
            setSendingBool(false)
            setRecieverBox(false)
            setErrorState("Shoot, an error occurred sending your files :/")
            console.error(error)
            peerObj.disconnect()
            let timer = setInterval(() => {
                setErrorState("")
                clearInterval(timer)
            }, 3000)
        })

        if (files.length > 0 && isSending == false) {
            setSending("Send")
            setSendingBool(false)
            setRecieverBox(false)
        }
    }, [files, peerObj])


    function send(e) {
        e.preventDefault();

        setSending("Sending")
        setSendingBool(true)
        setRecieverBox(true)
        setIsSending(true)


        if (files.length > 0 && recieverID) {
            let conn = peerObj.connect(recieverID)

            peerObj.on("connection", (conn) => {
                conn.on("open", () => {
                    conn.on("data", (data) => {
                        if (data.filesSent == data.remainingFiles || files.length == 0) {
                            setSending("Send")
                            setRecieverBox(false)
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
            <form onSubmit={send}>
                <input disabled={recieverBox} className="id-textbox-long" id="idTextBox" name="reciever" placeholder="Reciever ID" value={recieverID} type="text" onChange={asssignID} />
                <button className="btn-send" disabled={sendingBool} >{sending}</button>
            </form>
            <ErrorToast error={errorState} />
        </>
    )
}