import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar()
{
    return (
        <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters> 
                        <Typography variant="h6" noWrap 
                        sx={
                            {
                                fontFamily:'monospace',
                                fontWeight:700,
                                letterSpacing:'.3rem',
                                color:'inherit',
                                textDecoration:'none',
                                mr:2,
                                display:{xs:'none',md:'flex'}
                            }
                        }>
                            <Link to='/'>Order Management App</Link>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs:'none', md:'flex'}}} >
                            <Button key='Customers' sx={{my: 2, color:'white' , display:'block'}}>
                            <Link to='/customers'>Customers</Link>
                            </Button>

                        </Box>
                    </Toolbar>
                </Container>
        </AppBar>
    )
}