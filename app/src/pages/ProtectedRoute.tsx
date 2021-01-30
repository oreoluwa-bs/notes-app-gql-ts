import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext, AuthContextType } from "../store/context/auth";

interface Props extends RouteProps {}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const { getAccessToken } = useContext(AuthContext) as AuthContextType;

  if (!getAccessToken()) return <Redirect to={{ pathname: "/signin" }} />;
  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
