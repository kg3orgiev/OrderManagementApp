import React, { useState } from "react";
import { Order, Status } from "../../../graphql/generated/schema";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import {Grid, Typography} from '@mui/material'
import OmTextField from "../../../components/formsui/OmTextField";
import OmSelect from "../../../components/formsui/OmSelect";
import OmSubmitButton from "../../../components/formsui/OmSubmitButton";
import Countries from "../../../data/countries.json";
import { formatDatePicker } from "../../../util/DateFormater";
import OmDatePicker from "../../../components/formsui/OmDatePicker";
import OmCheckbox from "../../../components/formsui/OmCheckBox";

interface OrderFormProps{
    order : Order
}

const FORM_VALIDATION = yup.object().shape({
    orderDate: yup.date()
        .required("Order Date is required"),
    descriptions: yup.string()
        .required("Description is required"),
    depositAmount: yup.number()
        .required("Deposit Amount is required"),
    otherNotes: yup.string(),
    totalAmount: yup.number()
        .required("Total Amount is required"),
    isDelivery :  yup.boolean()
});
export default function OrderForm({order}:OrderFormProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    
   const INITIAL_FORM_STATE = {
        id: order.id,
        customerId: order.customerId,
        orderDate : formatDatePicker(order.orderDate ?? new Date()),
        descriptions : order.descriptions || '',
        depositAmount : order.depositAmount || 0,
        otherNotes : order.otherNotes || '',
        totalAmount : order.totalAmount || 0,
        isDelivery : order.isDelivery || false,
        status: order.status || Status.Draft
    } 
 
    function addOrUpdatOrderDetails(values : any)
    {
        console.log(values);
    }
    return (
        <Container>
            <div>
                <Formik initialValues={INITIAL_FORM_STATE} validationSchema={FORM_VALIDATION} onSubmit={addOrUpdatOrderDetails}>
                    <Form>
                        <Grid container spacing={2}>
                             <Grid item xs={12}>
                                <OmSelect name="status" options={Status} otherProps={{label:"Order Status"}} />
                             </Grid>
                            <Grid item xs={12}>
                                <OmDatePicker name="orderDate" otherProps={{label:"Order Date"}} />
                            </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="descriptions" otherProps={{label:"Description"}} />
                            </Grid>
                             <Grid item xs={12}>
                                <OmTextField name="otherNotes" otherProps={{label:"Other Notes"}} />
                            </Grid>
                            <Grid item xs={12}><Typography>Pricing Information</Typography> </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="totalAmount" otherProps={{label:"Total Amount"}} />
                            </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="depositAmount" otherProps={{label:"Deposit Amount"}} />
                            </Grid>
                           <Grid item xs={12}>
                                <OmCheckbox name="isDelivery" label="Include Delivery"  legend="Include Delivery" otherProps={{label:"Delivery Included"}} />
                            </Grid> 
                            <Grid item xs={12}>
                                <OmSubmitButton otherProps={{}} >
                                    {!order.id ? "Add New Order": "Update Order"}
                                </OmSubmitButton>
                            </Grid>
                        </Grid>
                   </Form>
                </Formik>
            </div>
        </Container>
    ); 
}