import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
    height: "20px",
    width: "100%",
  },
}));

const TableHeader = (props) => {

  const { createSortHandler, headLabel, order, orderBy, action, _handleKeyPress, _handlechangeSearch, search } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell align={"left"} padding={"normal"} />
        {headLabel.map((item, i) => {
          return (
            <TableCell
              align={headLabel.alignRight === null ? "center" : headLabel.alignRight ? "right" : "left"}
              padding={"normal"}
              key={i} >

              {
                item?.id === "class" ? (
                  <form onSubmit={_handleKeyPress} name={item.id}>
                    <StyledInputBase
                      name={item?.id}
                      value={search?.class}
                      onChange={_handlechangeSearch}

                    />
                  </form>
                )
                  : item.id === "department" ? (
                    < form onSubmit={_handleKeyPress} name={item.id}>
                      <StyledInputBase
                        name={item.id}
                        value={search.department}
                        onChange={_handlechangeSearch}

                      />
                    </form>
                  ) : item.id === "subjectcode" ? (
                    < form onSubmit={_handleKeyPress} name={item.id}>
                      <StyledInputBase
                        name={item.id}
                        value={search.subjectcode}
                        onChange={_handlechangeSearch}

                      />
                    </form>
                  ) : item.id === "subjectname" ? (
                    < form onSubmit={_handleKeyPress} name={item.id}>
                      <StyledInputBase
                        name={item.id}
                        value={search.subjectname}
                        onChange={_handlechangeSearch}

                      />
                    </form>
                  )
                    : item.id === "academicyear" ? (
                      <form onSubmit={_handleKeyPress} name={item.id}>
                        <StyledInputBase
                          name={item.id}
                          value={search.academicyear}
                          onChange={_handlechangeSearch}

                        />
                      </form>
                    )
                      : item.id === "section" ? (
                        <form onSubmit={_handleKeyPress} name={item.id}>
                          <StyledInputBase
                            name={item.id}
                            value={search.section}
                            onChange={_handlechangeSearch}

                          />
                        </form>
                      )
                        : null
              }

              <TableSortLabel
                active={orderBy === i}
                direction={orderBy === i ? order : "asc"}
                onClick={createSortHandler(i)}
                sx={{ marginTop: "15px" }}
              >
                <Typography
                  variant="h6"
                  color={"secondary"}
                >{item.label}
                </Typography>
              </TableSortLabel>
            </TableCell>
          );
        })}
        {
          action ? <TableCell align={"center"} padding={"normal"} >
            <Typography
              variant="h6"
              color={"secondary"}
            >Action</Typography>
          </TableCell> : null
        }
      </TableRow>
    </TableHead >
  );
};
export default TableHeader;
