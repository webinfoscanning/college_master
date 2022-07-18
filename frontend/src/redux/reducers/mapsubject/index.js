const initialState = {
    arrayofincrementdecrementMapsubject: [],
    getMapAllSubjcet: [],
    getMapSubjectHeaders: [],
    getSubfacultyNotmapped: [],
    getFacultylist: [],
    getMappedSubjectFaculties: [],
    getallSubjects: []
};
export const MapSubject = (state = initialState, action) => {
    switch (action.type) {
        case "ARRAY_INCRIMENT_DICRIMENTM_MAP_SUBJECT":
            return { ...state, arrayofincrementdecrementMapsubject: action.payload }
        case "GET_MAP_ALL_SUBJECT":
            return {
                ...state, getMapAllSubjcet: action.payload
            }
        case "ADD_MAP_SUBJECT":
            return {
                ...state, getMapAllSubjcet: [...state.getMapAllSubjcet, action.payload]
            }
        case "GET_MAP_SUBJECT_HEADER":
            return { ...state, getMapSubjectHeaders: action.payload }

        case "GET_SUBJECT_FACULTY_NOTMAPPED":
            return {
                ...state, getSubfacultyNotmapped: action.payload
            }
        case "GET_FACULTY_LIST":
            return { ...state, getFacultylist: action.payload }

        case "GET_MAPPED_SUBJECT_FACULTIES":
            return { ...state, getMappedSubjectFaculties: action.payload }
        case "GET_ALL_SUBJECTS":
            return {
                ...state, getallSubjects: action.payload
            }
        default:
            return state;
    }
};
export default MapSubject;