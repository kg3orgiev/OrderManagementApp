import React from 'react';
import { Outlet } from 'react-router-dom';
import {  Container} from "@mui/material";
import Navbar from './nav/NavBar';



export default function Layout()
{
    return (
        <>
            <Navbar/>
            <Container sx={{p:'2rem'}}>
                <Outlet />
            </Container>
        </>
    )
}