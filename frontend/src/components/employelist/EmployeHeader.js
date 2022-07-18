import { useTheme } from "@emotion/react";
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import "./../../style/style.css"
import {
  Button,
  MenuItem,
  Select,
  InputBase,
  Typography,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { connect } from "react-redux";
import AddHeader from "./../Master/AddHeader";
import Employeelist from "./Employeelist";
import GoBack from "../back/GoBack";
import { GET_MASTER } from "../../redux/action/master"
import { GET_EMPLOYEELIST } from "../../redux/action/employee"

const SelectInputBase = styled(Select)(({ theme }) => ({
  color: "primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "1em",
    borderRadius: (theme.shape.borderRadius),
  },
}));

const EmployeeListTabs = () => {

  return (
    <div className="m-1">
      <Typography
        variant="h6"
        color="secondary"
      >Employee List</Typography>
    </div>
  )
}
const EmployeHeader = (props) => {

  const { getMasterdata, GET_MASTER, ADD_EMPLOYEE, getemployeelist, GET_EMPLOYEELIST } = props;
  const [data, setdata] = useState([])
  const [empdata, setEmpdata] = useState([])
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    GET_MASTER()
    GET_EMPLOYEELIST()
    filterEmployees("Active")
  }, [GET_MASTER, GET_EMPLOYEELIST])

  useMemo(() => {
    setdata(getMasterdata)
  }, [data, getMasterdata])

  useMemo(() => {
    setEmpdata(getemployeelist)
  }, [empdata, getemployeelist])

  useEffect(() => {
    filterEmployees("Active")
  }, [])

  const _handleChange = (e) => {
    const { name, value } = e.target
    filterEmployees(value)
  }

  const filterEmployees = (status) => {

    if (status === "All") {
      setEmployees(getemployeelist)
    }
    else {
      let filteremployees = getemployeelist.filter((item) => {
        if (item.employeeStatus?.subHeader === status) {
          return item;
        }
        else {
          return null;
        }

      });
      setEmployees(filteremployees)
    }

  }

  const _handlechangeSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
  }

  const _handleKeyPress = (e) => {
    e.preventDefault()
    const SearchValue = search.toLowerCase();
    if (SearchValue.length > 3) {
      let filterdata = getemployeelist.filter(
        (item) =>

          item.firstName.toLowerCase().includes(SearchValue) ||
          item.lastName.toLowerCase().includes(SearchValue) ||
          item.nickName.toLowerCase().includes(SearchValue) ||
          item.email.toLowerCase().includes(SearchValue) ||
          item.department.subHeader.toLowerCase().includes(SearchValue) ||
          item.location.subHeader.toLowerCase().includes(SearchValue) ||
          item.createdOn.toLowerCase().includes(SearchValue) ||
          item.employeeStatus.subHeader.toLowerCase().includes(SearchValue) ||
          item.title.toLowerCase().includes(SearchValue)
      );
      setEmployees(filterdata)
    } else {
      setEmployees(getemployeelist)
    }
  }

  return (
    <Fragment>
      <AddHeader
        StyledButton={
          <EmployeeListTabs />}
        ArrowBack={
          <div className="d-flex-column m-1">
            <GoBack />
          </div>
        } />

      <div style={{ float: "right" }}>
        {getMasterdata?.map((item, i) => (

          item.name === "Employee status" ? (
            <FormGroup>
              <FormLabel>Search by &nbsp;&nbsp;{item.name}</FormLabel>
              <SelectInputBase
                type="select"
                name="employeeStatus"
                defaultValue="Active"
                onChange={_handleChange}
              >
                {item?.headerValue !== null && item?.headerValue.map((i) => {
                  return (
                    <MenuItem value={i.subHeader} key={i?.subHeader} >{i.subHeader}</MenuItem>
                  )
                })}
                <MenuItem value="All">All</MenuItem>
              </SelectInputBase>
            </FormGroup>
          ) : null
        ))}
      </div>
      <Employeelist
        rows={getemployeelist}
        search={search}
        _handlechangeSearch={_handlechangeSearch}
        _handleKeyPress={_handleKeyPress}
      />
    </Fragment >
  );
};

const mapStateprops = (state) => {
  return {
    getMasterdata: state.master.getMasterdata,
    getemployeelist: state.Employee.getemployeelist
  }
}

export default connect(mapStateprops, { GET_MASTER, GET_EMPLOYEELIST })(EmployeHeader)
