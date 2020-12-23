import React from "react";
import { Route, Switch } from "react-router-dom";
import routers from "../../router/index";
import { IRouters } from "../../types/routerType";
const HomeBody: React.FC = () => {
  const renderRoute = (router: IRouters[]) =>
    router.map((item) => (
      <Route path={item.path} render={() => item.components()} key={item.path} />
    ));
  return <Switch>{renderRoute(routers)}</Switch>;
};
export default HomeBody;
