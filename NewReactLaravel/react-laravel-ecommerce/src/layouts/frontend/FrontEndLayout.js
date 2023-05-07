import React from "react";
import { Switch, Route } from "react-router-dom";

import public_routes_list from "../../routes/PublicRouteList";
import Navbar from "../../layouts/frontend/Navbar";

const FrontEndLayout = () => {
    return (
        <div>
            <Navbar />

            <div >

                <Switch>
                    {
                        public_routes_list.map((routedata, index) => {
                            return (
                                routedata.component && (
                                    <Route key={index} path={routedata.path} exact={routedata.exact} name={routedata.name}
                                        render={(props) => (
                                            <routedata.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })
                    }

                </Switch>

            </div>
        </div>

    );
}

export default FrontEndLayout;