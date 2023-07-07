import React from "react";
import { Customer } from "../../graphql/generated/schema";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import CustomerForm from "./customerForm/CustomerForm";
import OmHeader from "../../components/elements/OmHeader";

export default function NewCustomerPage()
{
    const customer = {} as Customer
   
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header='New Customer Details' />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    );
}