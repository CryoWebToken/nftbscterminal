import "./BtnConnect.css";

export default function BtnConnect({
    imgSrc,
    title,
    handleLogin,
    value
}) {
    const handleOnClick = e => {
        handleLogin(e.currentTarget.value);
    }

    return (
        <button
            className="btn-connect"
            onClick={handleOnClick}
            value={value}
        >
            <img src={imgSrc} alt="wallet logo"></img>
            <div>{title}</div>
        </button>
    );
}
