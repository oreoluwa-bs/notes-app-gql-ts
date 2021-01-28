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
import { HiCog, HiLogout, HiMoon, HiSun } from "react-icons/hi";

interface AccountSettingsProps {
  actions?: React.ReactNode[];
}

const AccountSettings = ({ actions }: AccountSettingsProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="relative">
      <Box display="flex" position="absolute" right={{ base: "10px" }}>
        <HStack spacing="1rem">
          {actions?.map((element) => element)}
          <Menu placement="bottom-end" isLazy fixed>
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
              <MenuItem icon={<Icon as={HiLogout} />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </Box>
  );
};

export default AccountSettings;
