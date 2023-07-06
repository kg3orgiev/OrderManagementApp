import { Grid, Typography} from '@mui/material';
import { Order, useGetOrdersQuery } from '../../../graphql/generated/schema'
import OrderLists from './OrderList';
import OmLoading from '../../../components/elements/OmLoading';
import OmAlert from '../../../components/elements/OmAlert';

export default function OrdersDashboard() {

    const { data:ordersData, loading, error } = useGetOrdersQuery();

    if(loading)
    {
        return <OmLoading />
    }

    if(error || !ordersData)
    {
        return <OmAlert message='Could not load orders data' />
    }

    var orders = ordersData.orders as Order[]

    return (
        <Grid container spacing={2} >
            <Grid item xs={11}>
                <Typography align='center' gutterBottom display={'block'} variant='h5' component={'div'} >
                 Orders List
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <OrderLists orders={orders} />
            </Grid>
        </Grid>
    )
}