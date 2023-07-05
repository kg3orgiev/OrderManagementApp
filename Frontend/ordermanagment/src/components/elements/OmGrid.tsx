import {useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface OmGridProps{
    rowDate: any,
    columnDefs: any
}

export default function OmGrid({rowDate, columnDefs}:OmGridProps) {
    const defaultColDef = useMemo(()=>({
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    return (
        <div className='ag-theme-alpine' style={{height:500, width:'100%' }}>
                <AgGridReact  
                rowData={rowDate}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                />
        </div>
    );
}