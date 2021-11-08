import "./SearchBar.css";
import Search from "../icons/Search";
import Close from "../icons/Close";
import BtnResult from "../buttons/BtnResult";

export default function SearchBar({ 
    filteredSearchList,
    searchValue,
    setSearchValue,
    showSuggestions,
    closeModalSearch,
    openModalSearch
}) {

    return (
        <div className={`search-bar ${showSuggestions ? "active" : ""}`}>
            <input
                className="search-bar__input"
                onChange={e => setSearchValue(e.target.value)}
                onClick={() => openModalSearch()}
                value={searchValue}
                type="text"
                placeholder="Search collection"
            ></input>
            {
                showSuggestions &&
                <button 
                    className="center search-bar__input__icon" 
                    onClick={closeModalSearch}
                    aria-label="close"
                >
                    <Close />
                </button>
            }
            {
                !showSuggestions &&
                <button 
                    className="center search-bar__input__icon"
                    onClick={openModalSearch}
                    aria-label="search"
                >
                    <Search />
                </button>
            }
            {
                showSuggestions && filteredSearchList?.length > 0 &&
                <>
                    <div className="search-bar__options">
                        {
                            filteredSearchList.map((elem, index) => (
                                <BtnResult
                                    key={index}
                                    icon={elem.icon}
                                    name={elem.name}
                                    address={elem.address}
                                    closeModalSearch={closeModalSearch}
                                />
                            ))
                        }
                    </div>
                </>
            }
        </div>
    );
}
