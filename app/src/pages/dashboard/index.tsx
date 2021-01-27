import React from "react";
import { Box, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { SideBar } from "../../components/Dashboard";
import NotePage from "./NotePage";
import WelcomePage from "./WelcomePage";

interface DashboardProps {}

const DashboardPage = (props: DashboardProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const {
    isOpen: isSideNavOpen,
    onOpen: onOpenSideNav,
    onClose: onCloseSideNav,
  } = useDisclosure({ defaultIsOpen: isMobile });

  const currentMath = useRouteMatch();

  return (
    <Box display="flex">
      <SideBar
        isOpen={isSideNavOpen}
        onClose={onCloseSideNav}
        onOpen={onOpenSideNav}
      />
      <Box flex="1" bg="secondary" height="100vh">
        <Box
          bg="white"
          height="inherit"
          ml="auto"
          width={isSideNavOpen ? "calc(100% - 12px)" : "calc(100% - 260px)"}
          transition="width 0.5s"
          padding="30px"
        >
          <Switch>
            <Route exact path={`${currentMath.path}`} component={WelcomePage} />
            <Route
              path={`${currentMath.path}/:noteslug`}
              component={NotePage}
            />
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
