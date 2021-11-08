import "./NavLinks.css";
import { ROUTES } from "../../helpers/constants";
import BtnNav from "../buttons/BtnNav";

export default function NavLinks({ className, closeModalMenu }) {
    return (
        <div className={`links ${className}`}>
            {
                ROUTES.map(route => (
                    <BtnNav
                        key={route.id}
                        path={route.path}
                        label={route.label}
                        closeModalMenu={closeModalMenu}
                    />
                ))
            }
        </div>
    );
}
