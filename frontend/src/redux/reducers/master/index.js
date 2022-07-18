const initialState = {
    arrayofincrementdecrement: [],
    getMasterdata: [],
    getHeaders: [],
    getStudentMaster: [],
    getFeeStructureMaster: [],
    getMapSubjectMaster: [],
    getEmployeeMaster: [],
    getExpenseMaster: []
};
export const Master = (state = initialState, action) => {
    switch (action.type) {
        case "ARRAY_INCRIMENT_DICRIMENT":
            return { ...state, arrayofincrementdecrement: action.payload }
        case "GET_MASTER":
            return { ...state, getMasterdata: action.payload }
        case "ADD_MASTER":
            return { ...state, getMasterdata: [...state.getMasterdata, action.payload] }
        case "GET_HEADER":
            return { ...state, getHeaders: action.payload }
        case "GET_STUDENT_MASTER":
            return { ...state, getStudentMaster: action.payload }
        case "GET_FEESTRUCTURE_MASTER":
            return { ...state, getFeeStructureMaster: action.payload }
        case "GET_MAPSUBJECT_MASTER":
            return { ...state, getMapSubjectMaster: action.payload }
        case "GET_EMPLOYEE_MASTER":
            return { ...state, getEmployeeMaster: action.payload }
        case "GET_EXPENSE_MASTER":
            return { ...state, getExpenseMaster: action.payload }
        default:
            return state;
    }
};
export default Master;