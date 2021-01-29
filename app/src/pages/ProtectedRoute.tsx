import { Redirect, Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const auth = false;

  if (!auth) return <Redirect to={{ pathname: "/signin" }} />;
  return <Route {...rest} component={Component} />;
};

export default ProtectedRoute;
