const initialState = {
    studentid: ""
};
export const Student = (state = initialState, action) => {
    switch (action.type) {
        case "STUDENT_ID":
            return { ...state, studentid: action.payload }

        default:
            return state;
    }
};
export default Student;