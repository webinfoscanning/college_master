import React, { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@emotion/react";
import Navigation from "../../components/Navigations";
import AddSubjecticon from "../../assets/icons/svg/CollegeManagement/AddSubjectIcon.svg";
import StudentIcon from "../../assets/icons/svg/CollegeManagement/studenicon1.svg";
import FeeManagement1 from "../../assets/icons/svg/CollegeManagement/FeeManagement1.svg";
import MasterIcon from "../../assets/icons/svg/CollegeManagement/User_cicrle.svg";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import { Collapse, Drawer } from "@mui/material";
import { IoIosArrowDropdown } from "react-icons/io";
import ExpenseManagement from "../../assets/icons/svg/CollegeManagement/ExpenseManagement.svg"
import employee from "../../assets/icons/svg/CollegeManagement/AddEmployee.svg"
import AssetManagement from "../../assets/icons/svg/CollegeManagement/AssetManagement.svg"
import timetable from "../../assets/icons/svg/CollegeManagement/CreateTimetable.svg"
import StudentAttendance from "../../assets/icons/svg/CollegeManagement/studentattendance.png"
const Listofdata = Navigation;
const _GetIcon = (name) => {
  if (name === "Add Subject") {
    return AddSubjecticon;
  } else if (name === "Fee Management") {
    return FeeManagement1;
  } else if (name === "Student") {
    return StudentIcon;
  } else if (name === "Expense Management") {
    return ExpenseManagement
  } else if (name === "Employee") {
    return employee;
  } else if (name === "Create TimeTable") {
    return timetable;
  } else if (name === "Asset Management") {
    return AssetManagement;
  }
  else if (name === "Student Attendance") {
    return StudentAttendance;
  } else {
    return MasterIcon;
  }
};

const DRAWER_WIDTH = 280;

const Sidebar = () => {
  const ThemeClasses = useTheme();
  const [open, setOpen] = React.useState(null);

  const handleNested = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  const drawer = (
    <div>
      <List
        sx={{
          background: ThemeClasses.palette.primary.main,
          height: "100%",
          marginTop: "50px",
          padding: "2em",
          paddingRight: "0",
        }}
      >
        {Listofdata.map((item, index) => (
          <Fragment key={index}>
            <ListItem
              component={Link}
              to={item?.link !== "#" && item?.link}
              disablePadding
              onClick={() => {
                handleNested(item?.id);
              }}
            >
              <img src={_GetIcon(item.name)} alt={"Somthing went worng"} />
              <ListItem
                sx={{ color: ThemeClasses.palette.primary.contrastText }}
              >
                <ListItemText primary={item.name} />
                {item?.children?.length > 0 && (
                  <ListItemIcon>
                    {(open === item?.id) === true ? (
                      <IoIosArrowDropdown
                        style={{
                          color: ThemeClasses.palette.primary.contrastText,
                          height: "1em",
                        }}
                      />
                    ) : (
                      <IoIosArrowDropright
                        style={{
                          color: ThemeClasses.palette.primary.contrastText,
                          height: "1em",
                        }}
                      />
                    )}
                  </ListItemIcon>
                )}
              </ListItem>
            </ListItem>
            {item?.children?.length > 0 && (
              <Collapse in={open === item?.id} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {item?.children?.map((nestedItem, i) => {
                    return (
                      <ListItem
                        key={i}
                        component={Link}
                        to={nestedItem?.link}
                        disablePadding
                      >
                        <ListItem
                          sx={{
                            color: ThemeClasses.palette.primary.contrastText,
                          }}
                        >
                          <ListItemText primary={nestedItem.name} />
                        </ListItem>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </div>
  );
  return (
    <Drawer
      open
      variant="persistent"
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          padding: "10px",
          bgcolor: ThemeClasses.palette.primary.main,
          borderRightStyle: "dashed",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};
export default Sidebar;
