import { Grid, Typography} from '@mui/material';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema'
import CustomerList from './CustomerList';
import OmLoading from '../../../components/elements/OmLoading';
import OmAlert from '../../../components/elements/OmAlert';

export default function CustomerDashboard() {
    const { data:customersData, loading, error } = useGetCustomersQuery();

    if(loading)
    {
        return <OmLoading />
    }

    if(error || !customersData)
    {
        return <OmAlert message='Could not load customers data' />
    }

    var customers = customersData.customers as Customer[]

    return (
        <Grid container spacing={2} >
            <Grid item xs={11}>
                <Typography align='center' gutterBottom display={'block'} variant='h5' component={'div'} >
                    Customer List
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <CustomerList customers={customers} />
            </Grid>
        </Grid>
    )
}