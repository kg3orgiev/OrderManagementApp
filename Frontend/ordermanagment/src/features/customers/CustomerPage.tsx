import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Customer, useGetCustomerByIdQuery } from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import CustomerForm from "./customerForms/CustomerForm";

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

    var customer = customerData.customers[0] as Customer

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography 
                    component={'div'} 
                    variant="h5"
                    display={'block'}
                    gutterBottom
                    align="center">
                        Customer Details
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    );
}