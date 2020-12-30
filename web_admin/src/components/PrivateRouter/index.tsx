import React from "react";
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import { selector } from '../../redux/selector'
interface IPrivateRoute {
  component: any
  [props: string]: any
};
const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component, ...rest }) => {
  const token = useSelector(selector)
  return (
    <Route
      {...rest}
      render={(routeProps) =>
       typeof token === 'string' ? <Component {...routeProps} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
