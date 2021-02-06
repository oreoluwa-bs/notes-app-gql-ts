import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { HiMoon, HiSun } from "react-icons/hi";
import { VscSignOut } from "react-icons/vsc";
import { AuthContext, AuthContextType } from "../../../store/context/auth";

interface Props {
  isMobile: boolean;
}

const SideNavUserActions = ({ isMobile }: Props) => {
  const history = useHistory();
  const { handleSignOutUser } = useContext(AuthContext) as AuthContextType;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Menu key="account-menu-settings" placement="right-end" isLazy>
        <Tooltip
          label="Settings & preferences"
          aria-label="Settings & preferences tooltip"
          placement="right"
        >
          <MenuButton
            as={Avatar}
            aria-label="Settings & Options"
            _hover={{ cursor: "pointer" }}
            bg="secondary"
            // icon={<Icon as={HiUser} fontSize="1.5rem" />}
            css={{ "& span": { flex: 0 } }}
          />
        </Tooltip>
        <MenuList>
          <MenuItem
            onClick={toggleColorMode}
            icon={<Icon as={colorMode === "light" ? HiMoon : HiSun} />}
          >
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon as={VscSignOut} />}
            onClick={async () => {
              await handleSignOutUser();
              history.push("/signin");
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default SideNavUserActions;
