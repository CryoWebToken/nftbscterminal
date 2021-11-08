import "./BtnTransaction.css";
import { intlNumFormatMaxDecimals, trimAddress, intlDateFormat } from "../../helpers/functions";
import binanceLogo from "../../assets/binance-logo.webp";

export default function BtnTransaction({
    tx_hash,
    block_signed_at,
    from,
    to,
    val,
    fee
}) {
    return (
        <a
            className="btn-transaction grid--transactions"
            href={`https://bscscan.com/tx/${tx_hash}`}
            rel="noreferrer"
            target="_blank"
        >
            <div>{trimAddress(tx_hash)}</div>
            <div>{intlDateFormat(block_signed_at)}</div>
            <div>{trimAddress(from)}</div>
            <div>{trimAddress(to)}</div>
            <div className="btn-transaction__currency">
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormatMaxDecimals(val, 3)}</div>
            </div>
            <div className="btn-transaction__currency">
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormatMaxDecimals(fee, 3)}</div>
            </div>
        </a>
    );
}
