import "./ModalRich.css";

export default function ModalRich({ showModalRich, closeModalRich }) {
    return (
        <>
            {
                showModalRich &&
                <div
                    className="modal__rich__wrapper"
                    onClick={() => closeModalRich()}
                ></div>
            }
        </>
    );
}
