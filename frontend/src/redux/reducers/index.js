import { combineReducers } from "redux";
import master from "./master/index"
import feestructure from "./feestructure/index"
import { LoginReducer } from './Login'
import { AdmissionReducer } from "./Admission";
import Mapsubject from "./mapsubject/index"
import { Employee } from "./employee/index";
import { Student } from "./Student/index"
import { Assest } from "./assest/index"
import { Expense } from "./Expense/index";

const mainReducer = combineReducers({
  master,
  feestructure,
  LoginReducer,
  AdmissionReducer,
  Mapsubject,
  Employee,
  Student,
  Assest,
  Expense
});

export default mainReducer;