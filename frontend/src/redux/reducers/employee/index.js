const initialState = {
    arrayofincrementdecrementEmployeeExperince: [],
    arrayofincrementdecrementEmployeeEducation: [],
    arrayofincrementdecrementEmployeeDependent: [],
    getemployeelist: [],
    addemployeedata: [],
    getEmplyee: []

};
export const Employee = (state = initialState, action) => {
    switch (action.type) {
        case "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EXPERINCE":
            return { ...state, arrayofincrementdecrementEmployeeExperince: action.payload }
        case "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_EDUCATION":
            return { ...state, arrayofincrementdecrementEmployeeEducation: action.payload }
        case "ARRAY_INCRIMENT_DICRIMENT_EMPLOYEE_DEPENDENT":
            return { ...state, arrayofincrementdecrementEmployeeDependent: action.payload }
        case "GET_EMPLOYEELIST":
            return { ...state, getemployeelist: action.payload }
        case "GET_EMPLOYEE":
            return {
                ...state, getEmplyee: action.payload
            }
        case "ADD_EMPLOYEE":
            return { ...state, getemployeelist: [...state.getemployeelist, action.payload], addemployeedata: action.payload }
        default:
            return state;
    }
};
export default Employee;