import fileIcon from "./assets/fileIcon.png"
import { FileItem } from "./FileItem"

export function FileList({ files, recieve }) {

    if (files.length > 0) {
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
                        <img className="no-files-image" src={fileIcon} alt="" />
                        <h4 className="no-files-text">Files you recieve will appear here.</h4>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="file-list-root">
                    <div className="no-files">
                        <img className="no-files-image" src={fileIcon} alt="" />
                        <h4 className="no-files-text">Click "Choose Files" to select files to send.</h4>
                    </div>
                </div>
            )
        }
    }
}