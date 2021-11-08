import "./Column.css"
import { Droppable } from "react-beautiful-dnd";
import Row from "./Row";

export default function Column({ column, rows }) {
    return (
        <div className="dnd-column">
            <Droppable
                droppableId={column.id}
                direction="horizontal"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`
                            dnd-column__rows 
                            ${snapshot.isDraggingOver ? "isDraggingOver" : ""}`}
                        style={{gridTemplateColumns: `repeat(${rows.length}, minmax(154px, 1fr)`}}
                    >
                        {
                            rows.map((row, index) => (
                                <Row
                                    key={row.id}
                                    row={row}
                                    index={index}
                                />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
