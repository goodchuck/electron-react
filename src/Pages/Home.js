import React from "react";
import DeviceInfo from "./deviceInfo";
import Layout from "./layout";
import { useLocation } from 'react-router-dom';
import Ajax from "./Ajax";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header";
import Web from "./Web";

function Home() {
    const location = useLocation();
    console.log("location",location,location.pathname);
    let pn = location.pathname.replace("/","");
    var pathObject = {
        layout : <><h1>Layout!</h1></>,
        home : <><h1>Home!</h1></>,
        deviceInfo : <DeviceInfo />,
        ajax : <Ajax />,
        web : <Web />
    }
    
    return (
        <>
            <Header />
            <Layout>
               {
                   pathObject[pn]
               }
            </Layout>
        </>
    )

}

export default Home;