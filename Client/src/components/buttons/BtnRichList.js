import "./BtnRichList.css";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

export default function BtnRichList({
    showRichOptions,
    openModalRich,
    closeModalRich,
    options,
    valueSelected,
    setValueSelected
}) {

    const handleOnClickSelect = () => {
        openModalRich();
    }

    const handleOnClickOption = e => {
        closeModalRich();
        setValueSelected({
            name: e.currentTarget.name,
            address: e.currentTarget.value
        });
    }

    return (
        <div className="btn-rich-list">
            <button
                className={`btn-rich-list__button ${showRichOptions ? "active" : ""}`}
                onClick={handleOnClickSelect}
            >
                <h1>{`${valueSelected.name} Rich list`}</h1>
                {
                    !showRichOptions &&
                    <ArrowDown />
                }
                {
                    showRichOptions &&
                    <ArrowUp />
                }
            </button>
            {
                showRichOptions &&
                <div className="btn-rich-list__options">
                    {
                        options
                            .filter(elem => elem.address !== valueSelected.address)
                            .map((elem, index) => (
                            <button
                                key={index}
                                value={elem.address}
                                name={elem.name}
                                onClick={handleOnClickOption}
                            >
                                <img src={elem.icon} alt="icon"></img>
                                <span>{elem.name}</span>
                            </button>
                        ))
                    }
                </div>
            }
        </div>
    );
}
