import {
  AppBar,
  Box,
  IconButton,
  TextField,
  Typography,
  Badge,
  Avatar,
  MenuItem, Menu
} from "@mui/material";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { BsBell } from "react-icons/bs";
import { useTheme } from "@emotion/react";
import SearchBar from "../../components/Master/SearchBar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: (theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: (theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[400],
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    borderRadius: "20% !important",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const AvtarDiv = styled("div")(({ theme }) => ({
  padding: "1em",
}));

const LogoWrapper = styled("div")(({ theme }) => ({
  width: 280,
  display: "flex",
  justifyContent: "center",
  color: "black",
}));

const Dashboardnavbar = () => {
  const theme = useTheme();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ background: theme.palette.common.lighter, zIndex: 1300 }}
      >
        <Toolbar>
          <LogoWrapper>
            <Typography variant="h4" component="div">
              Logo
            </Typography>
          </LogoWrapper>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <FormatListBulletedIcon
              size='large'
              sx={{ color: "black" }} />
          </IconButton>
          <Search>
            <SearchBar
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton>
              <Typography>English</Typography>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
            >
              <Badge badgeContent={17} color="error">
                <BsBell   sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <AvtarDiv>
              {auth && (
                <div>
                  <Avatar onClick={handleMenu} />
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </div>
              )}
            </AvtarDiv>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Dashboardnavbar;
