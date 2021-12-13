import "./BtnLogout.css";
import Logout from "../icons/Logout";

export default function BtnLogout({ handleLogout }) {
    const handleOnClick = () => {
        handleLogout();
    }

    return (
        <button
            className="bnt-logout"
            onClick={handleOnClick}
        >
            <div>Logout</div>
            <Logout />
        </button>
    );
}
