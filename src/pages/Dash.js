import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Reviewform from './ReviewForm';
import CollectionForm from './CollectionForm';
import Home from './Home';


function Dash() {
    const acctype = (sessionStorage.getItem("acctype"));
    const isAuth = (sessionStorage.getItem("isAuth"));

    if(isAuth){
        if(acctype === "Admin"){
            return(
                <Reviewform />
            );
        } 
        if(acctype === "Collector") {
            return(
                <CollectionForm />
            );
        } 
    }else{
        return(
            <Home />
        );
    }
       
}

export default Dash;
