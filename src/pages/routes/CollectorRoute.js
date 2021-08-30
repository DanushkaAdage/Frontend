import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function CollectorRoute({ component:Component, ...rest}) {
    const acctype = (sessionStorage.getItem("acctype"));
    const isAuth = (sessionStorage.getItem("isAuth"));
    return (
        <Route 
            {...rest}
            render={(props) => {
                if(isAuth){
                    if(acctype === "Admin"){
                        return(
                            <Redirect to={{ pathname: "/reviewform", state: {from: props.location} }} />
                        );
                    }else if (acctype === "Collector"){
                        return(
                            <Component />
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

export default CollectorRoute;