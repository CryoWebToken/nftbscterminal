import "./BtnClose.css";
import Close from "../icons/Close";

export default function BtnClose({ closeModalMenu }) {
    return (
        <div className="btn-close">
            <button 
                className="center btn-close__icon"
                name="close"
                aria-label="close"
                onClick={closeModalMenu}
            >
                <Close />
            </button>
        </div>
    );
}
