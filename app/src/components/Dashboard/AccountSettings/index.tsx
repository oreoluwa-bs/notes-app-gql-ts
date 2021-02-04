import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext } from "react";
import { HiCog, HiLogout, HiMoon, HiSun } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../../store/context/auth";

interface AccountSettingsProps {
  actions?: React.ReactNode[];
}

const AccountSettings = ({ actions }: AccountSettingsProps) => {
  const history = useHistory();
  const { handleSignOutUser } = useContext(AuthContext) as AuthContextType;
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="relative">
      <Box display="flex" position="absolute" right={{ base: "10px" }}>
        <HStack spacing="1rem">
          {actions?.map((element) => element)}
          <Menu
            key="account-menu-settings"
            placement="bottom-end"
            isLazy
            fixed
            offset={[-15, 10]}
          >
            <MenuButton
              as={isMobile ? IconButton : Button}
              aria-label="Options"
              icon={<Icon as={HiCog} />}
              rightIcon={isMobile ? null : <Icon as={HiCog} />}
            >
              Account
            </MenuButton>

            <MenuList>
              <MenuItem
                onClick={toggleColorMode}
                icon={<Icon as={colorMode === "light" ? HiMoon : HiSun} />}
              >
                {colorMode === "light" ? "Dark" : "Light"} Mode
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<Icon as={HiLogout} />}
                onClick={async () => {
                  await handleSignOutUser();
                  history.push("/signin");
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </Box>
  );
};

export default AccountSettings;
