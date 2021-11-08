import "./BtnTab.css";

export default function BtnTab({ tab, setTab, name }) {
    return (
        <button
            className={`btn-tab ${tab === name ? "active" : ""}`}
            name={name}
            onClick={e => setTab(e.currentTarget.name)}
        >
            {name}
        </button>
    );
}
