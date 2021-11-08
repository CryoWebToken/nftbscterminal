import "./InputControl.css";
import BtnItemsSort from "../buttons/BtnItemsSort";
import InputSlider from "../inputs/InputSlider";
import InputCheckbox from "../inputs/InputCheckbox";
import BtnRemoveFilter from "../buttons/BtnRemoveFilter";
import BtnRemoveAmountFilter from "../buttons/BtnRemoveAmountFilter";

export default function InputControl({
    attributesData,
    setAttributesData,
    sliderValue,
    setSliderValue,
    activeFilters,
    minAmount,
    maxAmount,
    itemsSortBy,
    setItemsSortBy
}) {

    return (
        <div className="input-control">
            <div className="input-control__active-filters">
                <h4>Active Filters</h4>
                {
                    ((sliderValue[0] !== minAmount) || (sliderValue[1] !== maxAmount)) &&
                    <BtnRemoveAmountFilter
                        minAmount={minAmount}
                        maxAmount={maxAmount}
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                    />
                }
                {
                    activeFilters?.length > 0 &&
                    activeFilters.map((elem, index) => (
                        <BtnRemoveFilter
                            key={index}
                            attributeId={elem.attributeId}
                            attribute={elem.attribute}
                            propertyId={elem.propertyId}
                            property={elem.property}
                            attributesData={attributesData}
                            setAttributesData={setAttributesData}
                        />
                    ))
                }
            </div>
            <BtnItemsSort
                itemsSortBy={itemsSortBy}
                setItemsSortBy={setItemsSortBy}
            />
            <InputSlider
                minAmount={minAmount}
                maxAmount={maxAmount}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
            />
            {
                attributesData?.length > 0 &&
                attributesData.map((elem, index) => (
                    <InputCheckbox
                        key={index}
                        attribute={elem.attribute}
                        properties={elem.properties}
                        attributesData={attributesData}
                        setAttributesData={setAttributesData}
                    />
                ))
            }
        </div>
    );
}
