import fileDown from "./assets/fileDown.png"
import fileUp from "./assets/fileUp.png"
import { FileItem } from "./FileItem"

import imgSelect from "./assets/selection.png"

export function FileList({ files, recieve }) {
    if (files.length > 0 || files == null) {
        if (recieve) {
            return (
                <div className="file-list-root">
                    {files.map(file => {
                        return (
                            <div key={file.id}>
                                <FileItem fileData={file.fileData} id={file.id} type={file.type} downloadable={true} />
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="file-list-root">
                    {files.map(file => {
                        return (
                            <div key={file.id}>
                                <FileItem fileData={file.fileData} id={file.id} />
                            </div>
                        )
                    })}
                </div>
            )
        }

    } else {

        if (recieve) {
            return (
                <div className="file-list-root">
                    <div className="no-files">
                        <img className="no-files-image" src={fileDown} alt="" />
                        <h4 className="no-files-text">Files you recieve will appear here.</h4>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="file-list-root">
                    <div className="no-files">
                        <img className="no-files-image" src={fileUp} alt="" />
                        <h4 className="no-files-text">Drag n' drop here or click <span><img className="icon-row" src={imgSelect} /></span> to select files to send.</h4>
                    </div>
                </div>
            )
        }
    }
}