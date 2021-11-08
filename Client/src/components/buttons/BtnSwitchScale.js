import "./BtnSwitchScale.css";

export default function BtnSwitchScale({ scale, setScale }) {

    const handleOnClick = e => {
        setScale(Number(e.currentTarget.value));
    }

    return (
        <div className="btn-switch-scale">
            <button
                className={`${scale ? "" : "active"}`}
                name="linear"
                value={0}
                onClick={handleOnClick}
            >lin</button>
            <button
                className={`${scale ? "active" : ""}`}
                name="logarithmic"
                value={1}
                onClick={handleOnClick}
            >log</button>
        </div>
    );
}
