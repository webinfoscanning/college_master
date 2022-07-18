import React from "react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  fieldset: {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    transition: theme.transitions.create("width"),
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    borderRadius: "20px",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginLeft: 0,
  padding: "1em",
}));
const SearchBar = ({ _handlechangeSearch, search, _handleKeyPress }) => {
  return (
    <Search>
      <form onSubmit={_handleKeyPress}>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={_handlechangeSearch}
        />
      </form>
    </Search>
  );
};

export default SearchBar;
