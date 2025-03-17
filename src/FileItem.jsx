import fileIcon from "./assets/fileListIcon.png"
import imgDownload from "./assets/arrow.png"

export function FileItem({ fileData, id, downloadable, type }) {
    if (fileData) {
        if (downloadable) {

            const blob = new Blob([fileData], { type: type })
    
            return (
                <div className="file-row-download" key={id}>
                    <div className="file-download-root">
                        <div className="file-icon">
                            <img className="icon" src={fileIcon} alt="" />
                        </div>
                        <h4 className="file-name">{fileData.name}</h4>
                    </div>
                    <div className="download-container">
                        <a href={URL.createObjectURL(blob)} download={fileData.name}>
                            <button className="btn-download"><img className="icon-row" src={imgDownload} /></button>
                        </a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="file-row" key={id}>
                    <div className="file-icon">
                        <img className="icon" src={fileIcon} alt="" />
                    </div>
                    <h4 className="file-name">{fileData.name}</h4>
                </div>
            )
        }
    }
}