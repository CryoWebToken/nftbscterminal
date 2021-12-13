import "./Message.css";

export default function Message({ message }) {
    return (
        <div className="message">
            <div>
                <span>Connect wallet</span>
            </div>
            <div>{message}</div>
        </div>
    );
}
