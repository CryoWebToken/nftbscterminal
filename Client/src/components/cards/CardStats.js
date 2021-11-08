import "./CardStats.css";
import { intlNumFormatMaxDecimals } from "../../helpers/functions";
import binanceLogo from "../../assets/binance-logo.webp";

export default function CardStats({ statsData }) {
    const {
        items,
        owners,
        average,
        floor,
        ath,
        sales_24h,
        sales_7d,
        sales_30d,
        sales_all,
        fees_24h,
        fees_7d,
        fees_30d,
        fees,
        volume_24h,
        volume_7d,
        volume_30d,
        volume_all,
        currentOwners
    } = statsData;

    return (
        <>
            {
                Object.keys(statsData)?.length > 0 &&
                <div className="card-stats">
                    <h3>Stats</h3>
                    <div className="card-stats__item">
                        <div>Supply</div>
                        <div>{intlNumFormatMaxDecimals(items, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Owners (all)</div>
                        <div>{intlNumFormatMaxDecimals(owners, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Owners (current)</div>
                        <div>{intlNumFormatMaxDecimals(currentOwners, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Lowest Price</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(floor, 2)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Highest Price</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(ath, 2)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Avg. Price</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(average, 2)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Sales (24h)</div>
                        <div>{intlNumFormatMaxDecimals(sales_24h, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Sales (7d)</div>
                        <div>{intlNumFormatMaxDecimals(sales_7d, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Sales (30d)</div>
                        <div>{intlNumFormatMaxDecimals(sales_30d, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Sales (all)</div>
                        <div>{intlNumFormatMaxDecimals(sales_all, 0)}</div>
                    </div>
                    <div className="card-stats__item">
                        <div>Fees (24h)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(fees_24h, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Fees (7d)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(fees_7d, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Fees (30d)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(fees_30d, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Fees (all)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(fees, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Volume (24h)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(volume_24h, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Volume (7d)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(volume_7d, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Volume (30d)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(volume_30d, 3)}</div>
                        </div>
                    </div>
                    <div className="card-stats__item">
                        <div>Volume (all)</div>
                        <div className="card-stats__item__currency">
                            <img
                                className="binance-logo"
                                src={binanceLogo}
                                alt="currency"
                            ></img>
                            <div>{intlNumFormatMaxDecimals(volume_all, 3)}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
