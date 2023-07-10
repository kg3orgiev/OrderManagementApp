import { Grid, Button} from '@mui/material';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema'
import CustomerList from './CustomerList';
import OmLoading from '../../../components/elements/OmLoading';
import OmAlert from '../../../components/elements/OmAlert';
import OmHeader from '../../../components/elements/OmHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
                <OmHeader header='Customers' />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" size="medium" href={`/customers/newcustomer`} startIcon={<AddBoxIcon />}>
                    New Customer
                 </Button>
            </Grid>
            <Grid item xs={12}>
                <CustomerList customers={customers} />
            </Grid>
        </Grid>
    )
}