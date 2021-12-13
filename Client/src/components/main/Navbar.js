import "./Navbar.css";
import Logo from "./Logo";
import BtnMenu from "../buttons/BtnMenu";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import BtnWallet from "../buttons/BtnWallet";

export default function Navbar({ 
    filteredSearchList,
    searchValue,
    setSearchValue,
    showSuggestions,
    closeModalSearch,
    openModalSearch,
    closeModalMenu,
    openModalMenu,
    openModalConnect,
    handleLogout,
    address
}) {
    return (
        <nav className="navbar global-width">
                <Logo />
            <div className="navbar__left">
                <NavLinks
                    className="navbar__links"
                    closeModalMenu={closeModalMenu}
                />
                <BtnWallet
                    address={address}
                    openModalConnect={openModalConnect}
                    handleLogout={handleLogout}
                />
            </div>
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
