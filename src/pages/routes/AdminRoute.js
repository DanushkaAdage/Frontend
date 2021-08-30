import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AdminRoute({ component:Component, ...rest}) {
    const acctype = (sessionStorage.getItem("acctype"));
    const isAuth = (sessionStorage.getItem("isAuth"));
    return (
        <Route 
            {...rest}
            render={(props) => {
                if(isAuth){
                    if(acctype === "Admin"){
                        return(
                            <Component />
                        );
                    }else if (acctype === "Collector"){
                        return(
                            <Redirect to={{ pathname: "/collectionform", state: {from: props.location} }} />
                        );
                    }
                } else {
                    return(
                        <Redirect to={{ pathname: "/", state: {from: props.location} }} />
                    );
                }
            }}
        />
    );
}

export default AdminRoute;