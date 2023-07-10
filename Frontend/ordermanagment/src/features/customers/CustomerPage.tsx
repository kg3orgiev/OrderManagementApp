import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Customer, Order, useGetCustomerByIdQuery, useDeleteCustomerMutation } from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container } from "@mui/system";
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import CustomerForm from "./customerForm/CustomerForm";
import OmHeader from "../../components/elements/OmHeader";
import OrderLists from "../orders/orderdashboard/OrderList";
import { Delete } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

    const [deleteCustomer, {loading : deleteCustomerLoading, error: deleteCustomerError} ]  = useDeleteCustomerMutation();

    async function deleteCustomerDetails() {
        const response = await deleteCustomer({
            variables:{
                id:customerId
            }
        });

        if(!response.errors)
        {
            navigate('/customers');
        }
    } 

    function handleClickOpen()
    {
       setOpen(true);  
    }
    function handleClose()
    {
       setOpen(false);  
    }

    if(loading || deleteCustomerLoading)
    {
        return <OmLoading />
    }

    if(error || !customerData || !customerData.customers)
    {
        return <OmAlert message='Could not retreiving customer data' />
    }

    if(deleteCustomerError)
    {
        return <OmAlert message='Error deleting customer' />
    }

    var customer = customerData.customers[0] as Customer;
    var customerOrders = customer.orders as Order[];
    return (
        <Container>
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-aria-describedby="alert-dialog-description">
                    <DialogTitle id='alert-dialog-title'>{"Delete Customer Details"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            You are about to remove this customer and all realted orders. Confrim to continue or cancel!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={deleteCustomerDetails} color="error" autoFocus>Delete</Button>
                    </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header='Customer Details' />
                </Grid>
                <Grid item xs={2}>
                     <Button variant="outlined" size="medium" color="error" startIcon={<Delete />} onClick={handleClickOpen}>
                       Customer
                    </Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <OmHeader header='Customer Orders' />
                </Grid>
                <Grid item xs={2}>
                <Button variant="contained" size="medium" href={`/customers/${customer.id}/neworder`} startIcon={<AddBoxIcon />}>
                       New Order
                </Button>
                </Grid>
                <Grid item xs={12}>
                    <OrderLists orders={customerOrders} />
                </Grid>
            </Grid>
        </Container>
    );
}