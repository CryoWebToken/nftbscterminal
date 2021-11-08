import "./TableTransactions.css";
import BtnTransaction from "../buttons/BtnTransaction";

export default function TableTransactions({ transactions }) {
    return (
        <div className="table">
            <div className="table-list table-list--transactions">
                <div className="table-list__header grid--transactions">
                    <div>Tx hash</div>
                    <div>Date</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Amount</div>
                    <div>Fee</div>
                </div>
                <div className="table-list__body">
                    {
                        transactions.map((elem, index) => (
                            <BtnTransaction
                                key={index}
                                tx_hash={elem.tx_hash}
                                block_signed_at={new Date(elem.block_signed_at)}
                                from={elem.from}
                                to={elem.to}
                                val={elem.val}
                                fee={elem.fee}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
