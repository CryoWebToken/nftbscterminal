import "./InputSlider.css";
import ReactSlider from "react-slider";

export default function InputSlider({
    minAmount,
    maxAmount,
    sliderValue,
    setSliderValue
}) {

    const handleOnChangeAfter = (value, index) => {
        document.getElementsByClassName(`input-slider__thumb-${index}`)[0].blur();
        setSliderValue(value);
    }

    return (
        <div className="input-slider">
            <h4>Amount Traded</h4>
            <ReactSlider
                value={sliderValue}
                min={minAmount}
                max={maxAmount}
                minDistance={0.1}
                step={1}
                onAfterChange={handleOnChangeAfter}
                className="horizontal-slider"
                trackClassName="input-slider__track"
                thumbActiveClassName="input-slider__thumb-active"
                thumbClassName="input-slider__thumb"
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
        </div>
    );
}
