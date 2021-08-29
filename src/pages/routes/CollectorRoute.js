import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function CollectorRoute({ isAuth, acctype , component:Component, ...rest}) {
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