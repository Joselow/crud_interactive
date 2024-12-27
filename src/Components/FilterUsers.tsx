import { SORT_BY } from '../constants/sortBy'
import type { SortByOptions } from '../interfaces/sortBy'

interface Props {
    togglePaintRows: () => void,
    selectSortBy: (sortBy: SortByOptions) => void,
    restoreUsers: () => void,
}

export function FilterUsers ({ togglePaintRows, selectSortBy, restoreUsers }: Props) {
    return <>
         <button onClick={togglePaintRows}>Colorear Filas</button>
        <button onClick={() => selectSortBy(SORT_BY.country)}>Ordenar por pais</button>
        <button onClick={restoreUsers}>Restaurar datos</button>
    </>
}