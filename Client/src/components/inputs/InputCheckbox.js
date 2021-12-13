import { useState } from "react";
import "./InputCheckbox.css";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

export default function InputCheckbox({
    attribute,
    properties,
    attributesData,
    setAttributesData
}) {
    const [showOptions, setShowOptions] = useState(false);

    const handleOnChange = e => {
        // Using the id as index
        const id = Number(e.target.id);
        const checked = e.target.checked;
        const oldAttribute = attributesData.find(elem => elem.attribute === attribute);
        const property = oldAttribute.properties[id];
        const newProperties = [...properties];

        newProperties[id] = {
            ...property,
            checked: checked
        }

        const newAttribute = {
            ...oldAttribute,
            properties: newProperties
        }

        const newAttributeData = [...attributesData];
        newAttributeData[newAttribute.id] = newAttribute;

        setAttributesData(newAttributeData);
    }

    const handleOnClick = () => setShowOptions(prev => !prev);

    return (
        <div className="input-checkbox">
            <div
                className="input-checkbox__trait"
                onClick={handleOnClick}
            >
                <h4>{attribute}</h4>
                {
                    !showOptions &&
                    <ArrowDown />
                }
                {
                    showOptions &&
                    <ArrowUp />
                }
            </div>
            {
                showOptions &&
                <div className="input-checkbox__options">
                    {
                        properties?.length > 0 &&
                        properties.map((elem, index) => (
                            <label
                                key={index}
                                className="input-checkbox__label"
                            >{elem.property}
                                <input
                                    className="input"
                                    type="checkbox"
                                    onChange={handleOnChange}
                                    id={elem.id}
                                    checked={elem.checked}
                                ></input>
                                <span className="checkmark"></span>
                                <span className="count">({elem.count})</span>
                            </label>
                        ))
                    }
                </div>
            }
        </div>
    );
}
