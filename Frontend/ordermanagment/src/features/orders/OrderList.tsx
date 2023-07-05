import React, {useMemo, useState} from 'react';
import { Customer, Order } from '../../graphql/generated/schema';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface OrderListsProps{
    orders: Order[]
}

export default function OrderLists({orders}: OrderListsProps) {
    const [ columnDefs] = useState([
        {
            field:'id',
            width:50,
            supperssSizeToFit : true
        },
        {
            field:'customer',
            cellRenderer: function(params: any){
                const customer = params.value as Customer;
                return customer.firstName  + ' ' + customer.lastName;
            }
        },
        {
            field:'orderDate'
        },
        {
            field:'status'
        },
        {
            field:'descriptions'
        },
        {
            field:'depositAmount'
        },
        {
            field:'totalAmount'
        },
        {
            field:'isDelivery'
        },
        {
            field:'otherNotes'
        }
        ]);
        
        const defaultColDef = useMemo(()=>({
            sortable: true,
            filter: true,
            resizable: true,
        }), []);
        
        
        return (
            <div className='ag-theme-alpine' style={{height:500, width:'100%'  }}>
                <AgGridReact  
                rowData={orders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                />
            </div>
        );
}