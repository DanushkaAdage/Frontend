import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AdminRoute({ isAuth, acctype , component:Component, ...rest}) {
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