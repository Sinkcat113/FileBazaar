import { useEffect, useState } from "react"


export function Id({ peerObj }) {

    const [peerID, setPeerID] = useState("Generating...")

    const [isCopying, setIsCopying] = useState(false)

    useEffect(() => {
        peerObj.on("open", (id) => {
            setPeerID(id)
        })

        if (isCopying) {
            const timer = setTimeout(() => {
                setIsCopying(false)
            }, 600)

            return () => clearTimeout(timer)
        }
    }, [peerObj, isCopying])

    function copy() {
        navigator.clipboard.writeText(peerID)

        setIsCopying(true)
    }

    return (
        <div className="id-container">
            <label className="label-session" htmlFor="idTextBox">Session ID: </label>
            <input className="id-textbox" id="idTextBox" readOnly={true} type="text" value={peerID} />
            <button className={isCopying ? "btn-copied" : "btn-copy"} onClick={() => {copy()}} >{isCopying ? "Copied!" : "Copy"}</button>
        </div>
    )
}