import "./InputRadio.css";

export default function InputRadio({
    id,
    label,
    checked,
    itemsSortBy,
    setItemsSortBy
}) {

    const handleOnChange = e => {
        // Using the id as index
        const id = Number(e.target.id);
        const newItemsSortBy = [];
        itemsSortBy.forEach((elem, index) => {
            newItemsSortBy.push({
                ...elem,
                checked: id === index ? true : false
            });
        });
        setItemsSortBy(newItemsSortBy);
    }

    return (
        <div className="input-radio">
            <label
                className="input-radio__label"
            >{label}
                <input
                    id={id}
                    checked={checked}
                    type="radio"
                    name="radio"
                    onChange={handleOnChange}
                ></input>
                <span className="checkmark"></span>
            </label>
        </div>
    );
}
