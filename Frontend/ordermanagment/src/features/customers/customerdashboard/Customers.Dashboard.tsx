import { Grid, Typography} from '@mui/material';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema'
import CustomerList from './CustomerList';

export default function CustomerDashboard() {

    const { data:customersData, loading, error } = useGetCustomersQuery();

    if(loading)
    {
        return <div>Loading... </div>
    }

    if(error || !customersData)
    {
        return <div>Error... </div>
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