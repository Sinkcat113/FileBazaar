import { useEffect, useState } from "react"
import imageToast from "./assets/imageToast.png"

export function ErrorToast({ error }) {
    
    const [showing, setShowing] = useState(false)
    const [showClass, setShowClass] = useState("toast")

    useEffect(() => {
        if (error) {
            setShowing(true)
            setShowClass('toast')
    
            let timer = setInterval(() => {
                setShowClass("toast-out")
                setShowing(false)
                clearInterval(timer)
            }, 3000)
        }
    }, [error])

    if (showing) {
        return (
            <div className="bread-root">
                <div className={showClass}>
                    <div className="error-toast">
                        <img className="image-toast" src={imageToast} alt="" />
                    </div>
                    <div>
                        <p className="errorMsg">{error}</p>
                    </div>
                </div>
            </div>
        )
    }
}