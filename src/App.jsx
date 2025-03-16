import { useEffect, useState } from "react"
import "./style.css"
import Peer from "peerjs";

import { Uploader } from "./panel";
import { Reciever } from "./reciever";
import { Id } from "./Session";

let peer = new Peer();

function App() {

  const [peerID, setPeerID] = useState("Generating...");

  useEffect(() => {
    peer.on("open", (id) => {
      setPeerID(id)
    })
  }, [peer, peerID])

  return (
    <>
      <Id peerObj={peer}/>
      <div className="panel-container">
        <Uploader peerObj={peer} />
        <Reciever peerObj={peer} />
      </div>
    </>
  )
}

export default App