import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AdminNavbar from './AdminNavbar';
import CollectorNavbar from './CollectorNavbar';
import Navibar from './Navibar';


function NavCol() {
    const acctype = (sessionStorage.getItem("acctype"));
    const isAuth = (sessionStorage.getItem("isAuth"));

    if(isAuth){
        if(acctype === "Admin"){
            return(
                <AdminNavbar />
            );
        } 
        if(acctype === "Collector") {
            return(
                <CollectorNavbar />
            );
        } 
    }else{
        return(
            <Navibar />
        );
    }
}

export default NavCol;