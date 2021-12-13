import "./Header.css";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Navbar from "../main/Navbar";
import ModalSearch from "../modals/ModalSearch";
import ModalMenu from "../modals/ModalMenu";
import ModalConnect from "../modals/ModalConnect";

export default function Header() {
    const dataContext = useContext(DataContext);

    return (
        <header>
            <Navbar
                filteredSearchList={dataContext.filteredSearchList}
                searchValue={dataContext.searchValue}
                showSuggestions={dataContext.showSuggestions}
                closeModalSearch={dataContext.closeModalSearch}
                openModalSearch={dataContext.openModalSearch}
                setSearchValue={dataContext.setSearchValue}
                openModalMenu={dataContext.openModalMenu}
                openModalConnect={dataContext.openModalConnect}
                handleLogout={dataContext.handleLogout}
                address={dataContext.address}
            />
            <ModalSearch
                showModalSearch={dataContext.showModalSearch}
                closeModalSearch={dataContext.closeModalSearch}
                showSidebar={dataContext.showSidebar}
            />
            <ModalMenu
                showModalMenu={dataContext.showModalMenu}
                closeModalMenu={dataContext.closeModalMenu}
            />
            <ModalConnect
                showModalConnect={dataContext.showModalConnect}
                closeModalConnect={dataContext.closeModalConnect}
                handleLogin={dataContext.handleLogin}
            />
        </header>
    );
}
