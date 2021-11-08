import "./BtnNav.css";
import { Link } from "react-router-dom";

export default function BtnNav({ path, label, closeModalMenu }) {
    return (
        <Link
            to={path}
            className="btn-nav"
            onClick={closeModalMenu}
        >
            {label}
        </Link>
    );
}
