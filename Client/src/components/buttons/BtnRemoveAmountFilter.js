import "./BtnRemoveAmountFilter.css";
import Close from "../icons/Close";

export default function BtnRemoveAmountFilter({
    minAmount,
    maxAmount,
    sliderValue,
    setSliderValue
}) {

    const handleOnClick = () => setSliderValue([minAmount, maxAmount]);

    return (
        <div className="btn-remove-amount-filter">
            <div>{`Amount [${sliderValue[0]} - ${sliderValue[1]}]`}</div>
            <button className="center" onClick={handleOnClick}>
                <Close />
            </button>
        </div>
    );
}
