import "./BtnRankSort.css";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

export default function BtnRankSort({
    name,
    label,
    rankSortBy,
    setRankSortBy
}) {

    const handleOnClick = e => {
        const name = e.currentTarget.name;
        setRankSortBy(prev => {
            return {
                column: name,
                ascending: !prev.ascending
            }
        });
    }

    return (
        <button
            className="btn-rank-sort"
            name={name}
            aria-label={name}
            onClick={handleOnClick}
        >
            {label}
            {
                rankSortBy.column === name &&
                !rankSortBy.ascending &&
                <ArrowUp />
            }
            {
                rankSortBy.column === name &&
                rankSortBy.ascending &&
                <ArrowDown />
            }
        </button>
    );
}
