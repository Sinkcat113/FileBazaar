import { useEffect, useState } from "react"


export function Id({ peerObj }) {

    const [peerID, setPeerID] = useState("Generating...")

    useEffect(() => {
        peerObj.on("open", (id) => {
            setPeerID(id)
        })
    }, [peerObj])

    
    const [copied, setCopied] = useState("Copy");
    const [copiedStyle, setCopiedStyle] = useState("btn-copy");

    function copy() {
        navigator.clipboard.writeText(peerID)

        setCopied("Copied!")
        setCopiedStyle("btn-copied")

        let timer = setInterval(() => {
            setCopied("Copy")
            setCopiedStyle("btn-copy");
            clearInterval(timer)
        }, 700)
    }

    return (
        <div className="id-container">
            <label className="label-session" htmlFor="idTextBox">Session ID: </label>
            <input className="id-textbox" id="idTextBox" readOnly={true} type="text" value={peerID} />
            <button className={copiedStyle} onClick={() => {copy()}} >{copied}</button>
        </div>
    )
}