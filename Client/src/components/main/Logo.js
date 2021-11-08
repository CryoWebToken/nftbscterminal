import "./Logo.css";
import Cube from "../icons/Cube";

export default function Logo() {
    return (
        <a
            className="logo"
            href="/"
            target="_self"
        >
            <Cube />
            <div>
                <div>NFT</div>
                <div>BSC</div>
            </div>
        </a>
    );
}
