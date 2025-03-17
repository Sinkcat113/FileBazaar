import { use, useEffect, useState } from "react"
import { ErrorToast } from "./errorToast"



export function Recieverid({ peerObj, files, peerId }) {

    const [recieverID, setRecieverID] = useState("")
    const [sending, setSending] = useState("Send")
    const [sendingBool, setSendingBool] = useState(false)
    const [recieverBox, setRecieverBox] = useState(false)

    const [errorState, setErrorState] = useState("")

    function asssignID(e) {
        setRecieverID(e.target.value)
    }

    useEffect(() => {
        peerObj.on("error", (error) => {
            setErrorState("Shoot, an error occurred sending your files :/")
            console.error(error)
            setSending("Send")
            setSendingBool(true)
            setRecieverBox(false)
            peerObj.disconnect()
            let timer = setInterval(() => {
                setErrorState("")
                clearInterval(timer)
            }, 3000)
        })

        if (files.length <= 0) {
            setSending("Send")
            setSendingBool(true)
            setRecieverBox(false)
        } else {
            setSending("Send")
            setSendingBool(false)
            setRecieverBox(false)
        }
    }, [files])


    function send(e) {
        e.preventDefault();
        if (files.length > 0 && recieverID) {

            let conn = peerObj.connect(recieverID)
            
            conn.on("open", () => {
                setSending("Sending")
                setSendingBool(true)
                setRecieverBox(true)
                
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