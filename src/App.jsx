import { useEffect, useState } from "react"
import "./style.css"
import Peer from "peerjs";

import { Uploader } from "./uploader";
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
        <Uploader peerObj={peer} peerId={peerID} />
        <Reciever peerObj={peer} />
      </div>
      <div className="devtag">
        <span><b>FileBazaar</b> | </span> <span className="developer-tag">Developed by <a className="devlink" href="https://www.youtube.com/@sinkcat0113">Sinkcat</a></span>
      </div>
    </>
  )
}

export default App