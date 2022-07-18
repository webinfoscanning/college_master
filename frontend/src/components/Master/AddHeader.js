import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import React from "react";
const MaindiveWrap = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "98%",
  height: "auto",
  margin: "0.5em",
}));

const AddHeader = (props) => {
  const { StyledButton, ArrowBack } = props;

  return (
    <>
      <MaindiveWrap>
        {StyledButton}
        {ArrowBack}
      </MaindiveWrap>
      <Divider
        sx={{ borderBottomWidth: 3, }}
        color="gray"
      />
    </>
  );
};

export default AddHeader;
