import "./DnD.css";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function DnD({ state, dispatch }) {

    const handleOnDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.dndData.columns[source.droppableId];
        const finish = state.dndData.columns[destination.droppableId];

        if (start === finish) {
            const column = state.dndData.columns[source.droppableId];
            const newRowIds = [...column.rowIds];
            newRowIds.splice(source.index, 1);
            newRowIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                rowIds: newRowIds
            }

            const newData = {
                ...state.dndData,
                columns: {
                    ...state.dndData.columns,
                    [newColumn.id]: newColumn
                }
            }
            dispatch({
                type: "updateDndDataOrder", payload: {
                    orderedDndData: newData
                }
            });
            return;
        }

        const startRowIds = [...start.rowIds];
        startRowIds.splice(source.index, 1);
        const newStart = {
            ...start,
            rowIds: startRowIds
        }

        const finishRowIds = [...finish.rowIds];
        finishRowIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            rowIds: finishRowIds
        }

        const newData = {
            ...state.dndData,
            columns: {
                ...state.dndData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        dispatch({
            type: "updateDndDataOrder", payload: {
                orderedDndData: newData
            }
        });
    }

    return (
        <DragDropContext
            onDragEnd={handleOnDragEnd}
        >
            <div className="dnd">
                {
                    state.dndData.columnOrder?.length > 0 &&
                    state.dndData.columnOrder.map(columnId => {
                        const column = state.dndData.columns[columnId];
                        const rows = column.rowIds.map(rowId => state.dndData.rows[rowId]);

                        return <Column
                            key={column.id}
                            column={column}
                            rows={rows}
                        />
                    })
                }
            </div>
        </DragDropContext>
    );
}
