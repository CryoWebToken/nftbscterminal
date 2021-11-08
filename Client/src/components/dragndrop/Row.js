import "./Row.css";
import { Draggable } from "react-beautiful-dnd";
import Move from "../icons/Move";

export default function Row({ row, index }) {

    return (
        <Draggable
            draggableId={row.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                        dnd-row
                        ${snapshot.isDragging ? "isDragging" : ""}
                    `}
                >
                    <div style={{borderLeftColor:row.color}}>{row.key.toUpperCase()}</div>
                    <Move />
                </div>
            )
            }
        </Draggable >
    );
}
