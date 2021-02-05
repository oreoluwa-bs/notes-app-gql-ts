import { useContext } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { AuthContext, AuthContextType } from "../store/context/auth";
// import { getAccessToken } from "../store/global/accessToken";

interface Props extends RouteProps {}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const { getAccessToken } = useContext(AuthContext) as AuthContextType;
  const currLocation = useLocation();

  if (!getAccessToken())
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: {
            routeTo: currLocation.pathname,
          },
        }}
      />
    );
  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
