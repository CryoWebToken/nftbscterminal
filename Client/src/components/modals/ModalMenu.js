import "./ModalMenu.css";
import Logo from "../main/Logo";
import BtnClose from "../buttons/BtnClose";
import NavLinks from "../main/NavLinks";

export default function ModalMenu({
    showModalMenu,
    closeModalMenu
}) {

    const handleOnClick = e => {
        if(e.target.className === "modal__menu__wrapper") {
            closeModalMenu();
        }
    }

    return (
        <>
            {
                showModalMenu &&
                <div
                    className="modal__menu__wrapper"
                    onClick={handleOnClick}
                >
                    <div className="modal__menu">
                        <div className="modal__menu__top">
                            <Logo />
                            <BtnClose 
                                closeModalMenu={closeModalMenu}
                            />
                        </div>
                        <NavLinks
                            className="modal__menu__links"
                            closeModalMenu={closeModalMenu}
                        />
                    </div>
                </div>
            }
        </>
    );
}
