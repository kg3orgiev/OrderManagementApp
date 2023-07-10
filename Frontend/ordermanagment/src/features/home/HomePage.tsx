import { Stats,  useGetStatusQuery } from '../../graphql/generated/schema';
import OmLoading from '../../components/elements/OmLoading';
import OmAlert from '../../components/elements/OmAlert';
import StatsGrid from './StatsGrid';
import { Container, Grid, IconButton } from '@mui/material';
import OmHeader from '../../components/elements/OmHeader';
import  PersonIcon  from '@mui/icons-material/Person';
import  FolderShared  from '@mui/icons-material/FolderShared';

export default function HomePage()
{
    const { data, loading, error } = useGetStatusQuery();

    if(loading)
    {
        return <OmLoading />
    }

    if(error || !data)
    {
        return <OmAlert message='Could not load status data' />
    }

    const status = data.stats as Stats;

    return (
        <Container>
            <Grid container spacing={2} alignItems={'center'} >
                <Grid item xs={12}>
                   <OmHeader header='Order Managment App' />
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={2}>
                   <IconButton onClick={()=>window.open("/customers")}>
                        <PersonIcon fontSize='large' color='secondary'/>Customers
                   </IconButton>
                </Grid>
                <Grid item xs={2}>
                   <IconButton onClick={()=>window.open("/orders")}>
                        <FolderShared fontSize='large' color='secondary'/>Orders
                   </IconButton>
                </Grid>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={12}>
                 <StatsGrid stats={status} />
                </Grid>
            </Grid>
        </Container>
       //
    );
}