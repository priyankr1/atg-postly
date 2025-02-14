import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useChange } from "../context/StateProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
  const { user, setUser, setToken } = useChange();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <Box
      bg="rgb(9, 1, 62)"
      px={6}
      py={3}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={10}
      width="100%"
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <NavLink
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            color: "white",
          }}
          to="/"
        >
          POSTLY
        </NavLink>

        {/* Navigation Links */}
        <Flex display={{ base: "none", md: "flex" }} align="center">
          <NavLink to="/" style={{ margin: "0 20px", fontSize: "20px", color: "white" }}>
            All-Post
          </NavLink>
          <NavLink to="/add-post" style={{ margin: "0 20px", fontSize: "20px", color: "white" }}>
            Add-Post
          </NavLink>
        </Flex>

        {/* Profile Menu */}
        <Menu>
          <MenuButton as={Button} p={0} bg="transparent" _hover={{ bg: "transparent" }}>
           <Avatar size="sm" src={user?.pic} name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/me")}>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;
