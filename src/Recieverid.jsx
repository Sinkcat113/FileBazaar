import { use, useEffect, useState } from "react"



export function Recieverid({ peerObj, files, peerId }) {

    const [recieverID, setRecieverID] = useState("")
    const [sending, setSending] = useState("Send")
    const [sendingBool, setSendingBool] = useState(false)

    function asssignID(e) {
        setRecieverID(e.target.value)
    }

    useEffect(() => {
        if (files.length === 0) {
            setSending("Send")
            setSendingBool(false)
        }
    }, [files])


    function send(e) {
        e.preventDefault();
        if (files.length > 0 && recieverID) {

            let conn = peerObj.connect(recieverID)
            
            conn.on("open", () => {
                setSending("Sending")
                setSendingBool(true)
                
                files.forEach(fileItem => {
                    let file = fileItem.fileData;
                    const blob = new Blob([file], { type: file.type })

                    const fileFinal = {blobData: blob, fileName: file.name, id: fileItem.id, type: file.type, from: peerId }

                    conn.send(fileFinal)
                })
            })
        }
    }

    return (
        <>
            <form onSubmit={send}>
                <input disabled={sendingBool} className="id-textbox-long" id="idTextBox" name="reciever" placeholder="Reciever ID" value={recieverID} type="text" onChange={asssignID} />
                <button className="btn-send" disabled={sendingBool} >{sending}</button>
            </form>
        </>
    )
}