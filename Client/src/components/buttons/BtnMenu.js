import "./BtnMenu.css";
import Menu from "../icons/Menu";

export default function BtnMenu({ openModalMenu }) {
    return (
        <div className="btn-menu">
            <button 
                className="btn-menu__icon"
                name="menu"
                aria-label="menu"
                onClick={openModalMenu}
            >
                <Menu />
            </button>
        </div>
    );
}
