import {useState} from 'react';
import { Customer, Order } from '../../../graphql/generated/schema';
import OmGrid from '../../../components/elements/OmGrid';
import { IconButton } from '@mui/material';
import LunchIcon from '@mui/icons-material/Launch';

interface OrderListsProps{
    orders: Order[]
}

export default function OrderLists({orders}: OrderListsProps) {
    const [ columnDefs] = useState([
        {
            field:'id',
            width:50,
            supperssSizeToFit : true,
            cellRenderer: function(params: any){
                const id = params.value;
                return (
                    <IconButton onClick={()=> window.open(`/orders/${id}`,"_blank")}>
                        <LunchIcon fontSize='small' color='secondary'></LunchIcon>
                    </IconButton>
                );
            }
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
        
        return <OmGrid rowDate={orders} columnDefs={columnDefs} />;
}