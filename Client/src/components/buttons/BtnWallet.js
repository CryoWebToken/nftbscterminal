import { useState } from "react";
import "./BtnWallet.css";
import { trimAddress } from "../../helpers/functions";
import BtnLogout from "./BtnLogout";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import udLogo from "../../assets/ud-logo.png";

export default function BtnWallet({
    user,
    address,
    openModalConnect,
    handleLogout
}) {
    const [showButton, setShowButton] = useState(false);

    const handleOnMouseEnter = () => {
        setShowButton(true);
    }

    const handleOnMouseLeave = () => {
        setShowButton(false);
    }

    const handleOnClick = () => {
        openModalConnect();
    }

    return (
        <div
            className={`btn-wallet
                ${!address ? "hover__disconnect" : "hover__connect"}
                ${showButton ? "active" : ""}
            `}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            {
                !address &&
                <button
                    className="btn-wallet__connect"
                    onClick={handleOnClick}
                >Connect Wallet</button>
            }
            {
                address && 
                <>
                <button className="wallet-btn__address">
                    {
                        user.split("").indexOf(".") !== -1 &&
                        <img src={udLogo} alt=""></img>
                    }
                    {trimAddress(user)}
                    {
                        !showButton &&
                        <ArrowDown color="var(--purple)" />
                    }
                    {
                        showButton &&
                        <ArrowUp color="var(--purple)" />
                    }
                </button>
                    {
                        showButton &&
                        <BtnLogout handleLogout={handleLogout}/>
                    }
                </>
            }
        </div>
    );
}
