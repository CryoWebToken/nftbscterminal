import "./Navbar.css";
import Logo from "./Logo";
import BtnMenu from "../buttons/BtnMenu";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

export default function Navbar({ 
    filteredSearchList,
    searchValue,
    setSearchValue,
    showSuggestions,
    closeModalSearch,
    openModalSearch,
    closeModalMenu,
    openModalMenu
}) {
    return (
        <nav className="navbar global-width">
            <Logo />
            <NavLinks
                className="navbar__links"
                closeModalMenu={closeModalMenu}
            />
            <div className="center">
                <SearchBar
                    filteredSearchList={filteredSearchList}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    showSuggestions={showSuggestions}
                    closeModalSearch={closeModalSearch}
                    openModalSearch={openModalSearch}
                />
                <BtnMenu
                    openModalMenu={openModalMenu}
                />
            </div>
        </nav>
    );
}
