import "./BtnConnect.css";

export default function BtnConnect({
    imgSrc,
    title,
    handleLogin
}) {
    const handleOnClick = () => {
        handleLogin();
    }

    return (
        <button
            className="btn-connect"
            onClick={handleOnClick}
        >
            <img src={imgSrc} alt="wallet logo"></img>
            <div>{title}</div>
        </button>
    );
}
