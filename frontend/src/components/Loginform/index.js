// @mui
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  Button,
  Divider,
} from "@mui/material";
import Logo from "../../assets/icons/svg/CollegeManagement/Student0101.svg";
import StudentSvgIcon from "../../assets/icons/svg/CollegeManagement/User_cicrle_duotone.svg";
import HelpAndSupport from "../../assets/icons/svg/CollegeManagement/Info&Help.svg";
import PrivecyAndPolicy from "../../assets/icons/svg/CollegeManagement/privacypolicy1.svg";
import TermAndCondition from "../../assets/icons/svg/CollegeManagement/TermAndCondition.svg";
import BackgroundImage from "../../assets/icons/svg/CollegeManagement/Book.svg"
// ----------------------------------------------------------------------
import "../../style/style.css"
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LOGIN } from "../../redux/action/Login/index"
import { Link, useHistory } from "react-router-dom";
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
  // zIndex:100
}));
const FormStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  height: "auto",
  padding: "3em",
  borderRadius: 8,
  zIndex: 10
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
const LogoMainDiv = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const FormLableText = styled(FormLabel)(({ theme }) => ({
  padding: theme.spacing(1, 1),
}));
const Footer = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1),
  display: "flex",
  justifyContent: "space-between",
}));
const LoginChip = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
const Footer2 = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1),
  display: "flex",
  justifyContent: "space-around",
}));
const IconsText = styled("small")(({ theme }) => ({
  padding: theme.spacing(1, 1),
  color: theme.palette.grey[500],
}));
const ImageDiv = styled("div")(({ }) => ({
  display: "flex", justifyContent: "end",
  position: "absolute",
  bottom: "0",
  right: "0",
}));

const Login = (props) => {
  const { LOGIN } = props
  const history = useHistory()
  const [state, setState] = useState({ email: "", password: "" })

  const _handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const _handleSumbit = async (e) => {
    e.preventDefault()
    let res = await LOGIN(state)
    if (res) {
      window.location.href = '/dashboard/master'
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push('/dashboard/master')
    }
  }, [])
  const Redirecttosignin = () => {
    history.push('/register')
  }

  return (
    <RootStyle>
      <ImageDiv>
        <img src={BackgroundImage} alt="Book" />
      </ImageDiv>
      <Container>
        <ContentStyle>
          <FormStyle>
            <LogoMainDiv>
              <img alt={"Somthing went worng"} src={Logo} />
            </LogoMainDiv>
            <LogoMainDiv>
              <LogoText>Logo</LogoText>
            </LogoMainDiv>
            <LogoMainDiv>
              <img alt={"Somthing went worng"} src={StudentSvgIcon} />
            </LogoMainDiv>
            <LogoMainDiv>
              <Typography justifyContent={"center"}>Login</Typography>
            </LogoMainDiv>
            <form
              onSubmit={_handleSumbit}
            >
              <FormGroup>
                <FormLableText>E-Mail</FormLableText>
                <TextFiledStyle
                  defaultValue={state.email}
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  onChange={_handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLableText>Password</FormLableText>
                <TextFiledStyle
                  defaultValue={state.password}
                  type="Password"
                  name="password"
                  placeholder="Password"
                  onChange={_handleChange}
                  required
                />
              </FormGroup>
              <Footer>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember Me"
                  />
                </FormGroup>
                <Link to="/">Forgot password</Link>
              </Footer>
              <LoginChip>
                <Button
                  color="warning"
                  size="small"
                  type="submit"
                  variant="contained"
                  className="white-color"
                  sx={{ borderRadius: 10 }}
                >Login</Button>
              </LoginChip>
              <br />
              <LoginChip>
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  className="white-color fullWidht"
                  onClick={Redirecttosignin}
                  sx={{ borderRadius: 10 }}
                >Register</Button>
              </LoginChip>
            </form>
            <br />
            <Footer2>
              <IconsText>
                <LogoMainDiv>
                  <img alt={"Somthing went worng"} src={PrivecyAndPolicy} />
                </LogoMainDiv>
                <small>Privacy Policy</small>
              </IconsText>
              <IconsText>
                <LogoMainDiv>
                  <img alt={"Somthing went worng"} src={TermAndCondition} />
                </LogoMainDiv>
                <small>T&C Contact us</small>
              </IconsText>
              <IconsText>
                <LogoMainDiv>
                  <img alt={"Somthing went worng"} src={HelpAndSupport} />
                </LogoMainDiv>
                <small>Info & Help</small>
              </IconsText>
            </Footer2>
          </FormStyle>
        </ContentStyle>
      </Container>
    </RootStyle >
  );
}
export default connect(null, { LOGIN })(Login)