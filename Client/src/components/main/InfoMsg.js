import { useState } from "react";
import "./InfoMsg.css";
import Info from "../icons/Info";

export default function InfoMsg({ message }) {
    const [showMsg, setShowMsg] = useState(false);

    const handleOnMouseEnter = () => setShowMsg(true);

    const handleOnMouseLeave = () => setShowMsg(false);

    return (
        <div
            className="info"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <Info />
            {
                showMsg &&
                <div className="info__message">{message}</div>
            }
        </div>
    );
}
