import {useState} from 'react';
import { Address, Customer } from '../../../graphql/generated/schema';
import OmGrid from '../../../components/elements/OmGrid';
import { IconButton } from '@mui/material';
import LunchIcon from '@mui/icons-material/Launch';

interface CustomerListProps{
    customers: Customer[]
}

export default function CustomerList({customers}: CustomerListProps) {
    const [columnDefs] = useState([
    {
        field:'id',
        width:50,
        supperssSizeToFit : true,
        cellRenderer: function(params: any){
            const id = params.value;
           
            return (
                <IconButton onClick={()=> window.open(`customers/${id}`,"_blank")}>
                    <LunchIcon fontSize='small' color='secondary'></LunchIcon>
                </IconButton>
            );
        }
    },
    {
        field:'firstName'
    },
    {
        field:'lastName'
    },
    {
        field:'contactNumber'
    },
    {
        field:'email'
    },
    {
        field:'address',
        cellRenderer: function(params: any){
            const address = params.value as Address;
            return address.addressLine1
             + ', ' + address.addressLine2
             + ', ' + address.city
             + ', ' + address.state
             + ', ' + address.country;
        }
    }
    ]);
    
    return <OmGrid rowDate={customers} columnDefs={columnDefs} />;
}