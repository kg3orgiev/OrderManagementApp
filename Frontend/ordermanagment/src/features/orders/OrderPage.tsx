import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import OrderForm from "../orders/orderForm/OrderForm";
import { Order, useGetOrderByIdQuery } from "../../graphql/generated/schema";
import OmHeader from "../../components/elements/OmHeader";

export default function OrderPage()
{
    const params  = useParams();
    const orderId  = parseInt(params.orderId || '0');
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const { data:orderData, loading, error } = useGetOrderByIdQuery({
        variables:{
            id : orderId
        }
    });

    if(loading)
    {
        return <OmLoading />
    }

    if(error || !orderData || !orderData.orders)
    {
        return <OmAlert message='Could not retreiving order data' />
    }

    var order = orderData.orders[0] as Order

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header='Order Details' />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <OrderForm order={order} />
                </Grid>
            </Grid>
        </Container>
    );
}