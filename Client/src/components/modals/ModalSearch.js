import "./ModalSearch.css";

export default function ModalSearch({
    showModalSearch,
    closeModalSearch
}) {
    return (
        <>
            {
                showModalSearch &&
                <div
                    className="modal-search"
                    onClick={() => closeModalSearch()}
                ></div>
            }
        </>
    )
}
