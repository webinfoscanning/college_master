import React, { Fragment } from "react";
import { ToastContainer, } from 'react-toastify';
import { styled } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';
import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";
const ViewAttendancepage= loadable(()=>import("../../pages/viewAttendancepage"))
const Markattendence =loadable(() => import("../../layouts/markattendence/index"))
const Masterpage = loadable(() => import("../../pages/master"))
const Studentpage = loadable(() => import("../../pages/student"))
const Page404 = loadable(() => import("../../pages/Page404"))
const CreatefeeStructure = loadable(() => import("../../pages/CreateFee"))
const FeeandManagementAllReports = loadable(() => import("../../pages/FeeandManagementAllReports"))
const ReviewStudentFee = loadable(() => import("../../pages/ReviewStudentFee"))
const DashboardNavbar = loadable(() => import("./DashboardNavbar"))
const DashboardSidebar = loadable(() => import("./DashboardSidebar"))
const FeecollectionPage = loadable(() => import("../../pages/FeecollectionPage"))
const AdmissionPage = loadable(() => import("../../pages/AdmissionPage"))
const Mapsubjectpage = loadable(() => import("../../pages/Mapsubjectpage"))
const AddemployePage = loadable(() => import("../../pages/AddemployePage"))
const EditemployeePage = loadable(() => import("../../pages/EditemployePage"))
const EmployeeListPage = loadable(() => import("../../pages/EmployeeListPage"))
const Addexpensepage = loadable(() => import("../../pages/Addexpensepage"))
const ExpenseListPage = loadable(() => import("../../pages/ExpenseListPage"))
const Mapsubjetfaculty = loadable(() => import("../Mapsubjetfaculty"))
const SelectFaculty = loadable(() => import("../selectFaculty"))
const AssestPage = loadable(() => import("../../pages/AssestPage"))
const Addtimetablepage = loadable(() => import("../../pages/Addtimetablepage"))
const TimeTablelistPage = loadable(() => import("../../pages/TimeTablelistPage"))

const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  padding: '1rem',
  background: theme.palette.secondary.lighter,

}));
const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  width: '100%',
  overflowX: "hidden",
  marginLeft: 280,
  minHeight: "100%",
  height: "1000px",
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP - 20,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DashboardLayout = () => {
  return (
    <Fragment>
      <RootStyle>
        <DashboardNavbar />
        <DashboardSidebar />
        <MainStyle>
          <Switch>
            <Route exact path="/dashboard/master" component={Masterpage} />
            <Route exact path="/dashboard/student" component={Studentpage} />
            <Route exact path="/dashboard/createfee" component={CreatefeeStructure} />
            <Route exact path="/dashboard/allreports" component={FeeandManagementAllReports} />
            <Route exact path="/dashboard/studentfee/:id" component={ReviewStudentFee} />
            <Route exact path="/dashboard/feecollection" component={FeecollectionPage} />
            <Route exact path="/dashboard/Admission" component={AdmissionPage} />
            <Route exact path="/dashboard/mapsubject" component={Mapsubjectpage} />
            <Route exact path="/dashboard/mapsubjctefaculaty" component={Mapsubjetfaculty} />
            <Route exact path="/dashboard/selectmapsubjctefaculaty" component={SelectFaculty} />
            <Route exact path="/dashboard/employelist" component={EmployeeListPage} />
            <Route exact path="/dashboard/addemployee" component={AddemployePage} />
            <Route exact path="/dashboard/editemployee/:id" component={EditemployeePage} />
            <Route exact path="/dashboard/addexpense" component={Addexpensepage} />
            <Route exact path="/dashboard/expenselist" component={ExpenseListPage} />
            <Route exact path="/dashboard/addassets" component={AssestPage} />
            <Route exact path="/dashboard/addtimetable" component={Addtimetablepage} />
            <Route exact path="/dashboard/classdegreetimetable" component={TimeTablelistPage} />
            <Route exact path="/dashboard/markattendence" component={Markattendence} />
            <Route exact path="/dashboard/viewattendance" component={ViewAttendancepage} />
            <Route component={Page404} />
          </Switch>
          <ToastContainer />
        </MainStyle>
      </RootStyle>
    </Fragment>
  );
};

export default DashboardLayout;
