// @mui
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Card,
  FormLabel,
  FormGroup,
  Button
} from "@mui/material";
import Logo from "../../assets/icons/svg/CollegeManagement/Student0101.svg";
import StudentSvgIcon from "../../assets/icons/svg/CollegeManagement/User_cicrle_duotone.svg";
import "../../style/style.css"
import { useState } from "react";
import { REGISTER } from "../../redux/action/signup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  width: "100%",
  background: theme.palette.primary.main,
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));
const FormStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  height: "auto",
  padding: "3em",
  borderRadius: 8,
}));
const TextFiledStyle = styled("input")(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  padding: "10px",
  borderRadius: 30,
  border: `${theme.palette.grey[200]} solid`,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  padding: theme?.spacing(1, 1),
  borderRadius: 30,
  color: theme.palette.common.black,
  fontSize: "30px",
  fontWeight: "bold",
}));
const RegisterMainDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const FormLableText = styled(FormLabel)(({ theme }) => ({
  padding: theme.spacing(1, 1),
}));

const LoginChip = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const RegisterFrom = (props) => {
  const { REGISTER } = props
  const [state, setState] = useState({})
  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })
  }
  const _handleSumbit = (e) => {
    e.preventDefault()
    REGISTER(state)
  }
  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <FormStyle>
            <RegisterMainDiv>
              <img alt={"Somthing went worng"} src={Logo} />
            </RegisterMainDiv>
            <RegisterMainDiv>
              <LogoText>Logo</LogoText>
            </RegisterMainDiv>
            <RegisterMainDiv>
              <img alt={"Somthing went worng"} src={StudentSvgIcon} />
            </RegisterMainDiv>
            <RegisterMainDiv>
              <Typography justifyContent={"center"}>Register</Typography>
            </RegisterMainDiv>
            <form onSubmit={_handleSumbit}>
              <FormGroup>
                <FormLableText>Name</FormLableText>
                <TextFiledStyle
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={_handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLableText>E-Mail</FormLableText>
                <TextFiledStyle
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  required
                  onChange={_handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLableText>Password</FormLableText>
                <TextFiledStyle
                  type="text"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={_handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLableText> Institution Id</FormLableText>
                <TextFiledStyle
                  type="text"
                  placeholder="Institution Id"
                  name="institutionId"
                  required
                  onChange={_handleChange}
                />
              </FormGroup>
              <br />
              <LoginChip className="d-flex">
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  component={Link}
                  to="/login"
                  className="white-color m-1">
                  Back
                </Button>
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  type="submit"
                  className="white-color m-1">
                  Save
                </Button>
              </LoginChip>
            </form>
          </FormStyle>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
export default connect(null, { REGISTER })(RegisterFrom);