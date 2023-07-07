import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import OrderForm from "../orders/orderForm/OrderForm";
import OmHeader from "../../components/elements/OmHeader";
import { Order } from "../../graphql/generated/schema";
import { useParams } from "react-router-dom";

export default function NewOrderPage()
{
    const params  = useParams();
    const customerId  = parseInt(params.customerId || '0');
    const order = {
        customerId : customerId
    } as Order;

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <OmHeader header={`New Order Details `} />
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