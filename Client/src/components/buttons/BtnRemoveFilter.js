import "./BtnRemoveFilter.css";
import Close from "../icons/Close";

export default function BtnRemoveFilter({
    attributeId,
    attribute,
    propertyId,
    property,
    attributesData,
    setAttributesData
}) {
    const handleOnClick = () => {
        const oldAttribute = attributesData[attributeId];
        const property = oldAttribute.properties[propertyId];
        const newProperties = [...oldAttribute.properties];

        newProperties[propertyId] = {
            ...property,
            checked: false
        }

        const newAttribute = {
            ...oldAttribute,
            properties: newProperties
        }

        const newAttributeData = [...attributesData];
        newAttributeData[attributeId] = newAttribute;

        setAttributesData(newAttributeData);
    }

    return (
        <div className="btn-remove-filter">
            <div>{`${attribute} | ${property}`}</div>
            <button className="center" onClick={handleOnClick}>
                <Close />
            </button>
        </div>
    );
}
