import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Customer, Order, useGetCustomerByIdQuery } from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import CustomerForm from "./customerForm/CustomerForm";
import OmHeader from "../../components/elements/OmHeader";
import OrderLists from "../orders/orderdashboard/OrderList";

export default function CustomerPage()
{
    const params  = useParams();
    const customerId  = parseInt(params.customerId || '0');
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const { data:customerData, loading, error } = useGetCustomerByIdQuery({
        variables:{
            id:customerId
        }
    });

    if(loading)
    {
        return <OmLoading />
    }

    if(error || !customerData || !customerData.customers)
    {
        return <OmAlert message='Could not retreiving customer data' />
    }

    var customer = customerData.customers[0] as Customer;
    var customerOrders = customer.orders as Order[];
    console.log(customerOrders);
    debugger;
    
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header='Customer Details' />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
                <Grid item xs={12}>
                    <OmHeader header='Customer Orders' />
                </Grid>
                <Grid item xs={12}>
                    <OrderLists orders={customerOrders} />
                </Grid>
            </Grid>
        </Container>
    );
}