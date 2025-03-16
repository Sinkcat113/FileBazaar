import { useEffect, useState } from "react"



export function Recieverid({ peerObj, files }) {

    const [recieverID, setRecieverID] = useState("");

    function asssignID(e) {
        setRecieverID(e.target.value)
    }

    function send(e) {
        e.preventDefault();
        if (files.length > 0 && recieverID) {

            let conn = peerObj.connect(recieverID)
            
            conn.on("open", () => {

                files.forEach(fileItem => {
                    let file = fileItem.fileData;
                    const blob = new Blob([file], { type: file.type })

                    conn.send({blobData: blob, fileName: file.name, id: crypto.randomUUID(), type: file.type})
                });
            })
        }
    }

    return (
        <>
            <form onSubmit={send}>
                <input className="id-textbox-long" id="idTextBox" name="reciever" placeholder="Reciever ID" value={recieverID} type="text" onChange={asssignID} />
                <button className="btn-send" >Send</button>
            </form>
        </>
    )
}