import { useState } from "react";
import "./BtnItemsSort.css";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import InputRadio from "../inputs/InputRadio";

export default function BtnItemsSort({ itemsSortBy, setItemsSortBy }) {
    const [showOptions, setShowOptions] = useState(false);

    const handleOnClick = () => setShowOptions(prev => !prev);

    return (
        <div className="btn-items-sort-wrapper">
            <div
                className="btn-items-sort"
                onClick={handleOnClick}
            >
                <h4>Sort by</h4>
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
                <div className="btn-items-sort__options">
                    {
                        itemsSortBy?.length > 0 &&
                        itemsSortBy.map((elem, index) => (
                            <InputRadio
                                id={elem.id}
                                key={index}
                                label={elem.label}
                                checked={elem.checked}
                                itemsSortBy={itemsSortBy}
                                setItemsSortBy={setItemsSortBy}
                            />
                        ))
                    }
                </div>
            }
        </div>
    );
}
