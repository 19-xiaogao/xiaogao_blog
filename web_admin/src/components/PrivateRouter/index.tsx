import React, { useEffect } from "react";
import { useHistory } from "react-router";
// import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
// import { selector } from '../../redux/selector'
interface IPrivateRoute {
  component: any;
  [props: string]: any;
}
const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  // const token = useSelector(selector)
  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token") as any);
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [history, token]);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        typeof token === "string" ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};
export default PrivateRoute;
