import { useState } from "react";
import "./BtnWallet.css";
import { trimAddress } from "../../helpers/functions";
import BtnLogout from "./BtnLogout";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";

export default function BtnWallet({ address, openModalConnect, handleLogout }) {
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
                    {trimAddress(address)}
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
