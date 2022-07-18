
const initialState = {
    AdmissionPrintOpen: null,
    trackMouseClickInAdmistion: [],
    searchStudent: [],
    getFeeStructureAddmission: [],
    getMappedFeeStudent: []
};
export const AdmissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_OPEN_PRINT_ADDMISION_CARD":
            return { ...state, AdmissionPrintOpen: action.payload }
        case "TRACK_MOUSE_CLICK_IN_ADMISSION":
            return { ...state, trackMouseClickInAdmistion: action.payload }
        case "GET_SEARCH_STUDENT":
            return {
                ...state, searchStudent: action.payload
            }
        case "GET_FEE_STRUCTURE_ADMISSION":
            return {
                ...state, getFeeStructureAddmission: action.payload
            }
        case "GET_MAPPED_FEE_STUDENT":
            return {
                ...state, getMappedFeeStudent: action.payload
            }
        default:
            return state;
    }
};