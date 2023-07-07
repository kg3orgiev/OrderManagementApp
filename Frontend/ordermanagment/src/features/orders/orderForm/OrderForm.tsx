import React, { useState } from "react";
import { Order, Status, OrderModelInput, useAddOrUpdateOrderMutation } from "../../../graphql/generated/schema";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import {Alert, Grid, Snackbar, Typography} from '@mui/material'
import OmTextField from "../../../components/formsui/OmTextField";
import OmSelect from "../../../components/formsui/OmSelect";
import OmSubmitButton from "../../../components/formsui/OmSubmitButton";
import statuses from "../../../data/statuses.json";
import { formatDatePicker } from "../../../util/DateFormater";
import OmDatePicker from "../../../components/formsui/OmDatePicker";
import OmCheckbox from "../../../components/formsui/OmCheckBox";
import OmLoading from "../../../components/elements/OmLoading";

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
    isDelivery :  yup.boolean(),
    status: yup.string()
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
 
    const [addOrUpdateOrder,
        { loading: addOrUpdateOrderLoading,
             error: addOrUpdateOrderError}
         ] = useAddOrUpdateOrderMutation();

    const handleClose = (event:any) =>
    {
        if(event?.reason === 'clickaway')
        {
            return;
        }

        setOpen(false);
    }

    async function addOrUpdatOrderDetails(value : OrderModelInput)
    {
        const response = await addOrUpdateOrder({
            variables:{
                order : value
            }
           });
           setOpen(false);
           const order = response.data?.addOrUpdateOrder as Order;
    
           if(order.id)
           {
              navigate(`/orders/${order.id}`);
           }
    }
    if(addOrUpdateOrderLoading)
    {
        return <OmLoading />;
    }
    if(addOrUpdateOrderError)
    {
        return (
            <Snackbar open={true} autoHideDuration={6000} >
                <Alert severity="error">Error retreiving customer data </Alert>
            </Snackbar>
        );
    }

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <Alert severity="success" onClose={handleClose} sx={{width:'100%'}}>
                    {!order.id ? "Order details successfully added":  "Order details successfully updated"}
                </Alert>
            </Snackbar>
            <div>
                <Formik initialValues={INITIAL_FORM_STATE} validationSchema={FORM_VALIDATION} onSubmit={addOrUpdatOrderDetails}>
                    <Form>
                        <Grid container spacing={2}>
                             <Grid item xs={12}>
                                <OmSelect name="status" options={statuses} otherProps={{label:"Order Status"}} />
                             </Grid>
                            <Grid item xs={12}>
                                <OmDatePicker name="orderDate" otherProps={{label:"Order Date"}} />
                            </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="descriptions" otherProps={{label:"Description"}} />
                            </Grid>
                             <Grid item xs={12}>
                                <OmTextField name="otherNotes" otherProps={{
                                        label:"Other Notes",
                                        multiline: true,
                                        rows:4
                                    }} />
                            </Grid>
                            <Grid item xs={12}><Typography>Pricing Information</Typography> </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="totalAmount" otherProps={{label:"Total Amount", type:"number"}} />
                            </Grid>
                            <Grid item xs={12}>
                                <OmTextField name="depositAmount" otherProps={{label:"Deposit Amount",type:"number"}} />
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