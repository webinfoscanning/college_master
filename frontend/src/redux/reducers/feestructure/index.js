const initialState = {
    arrayOfincremnetdecremnetViewDetails: [0],
    getstructure: [],
};
export const FeeStructure = (state = initialState, action) => {
    switch (action.type) {
        case "ARRAY_INCREMENT_DECREMENT_VIEW_DETAILS":
            return {
                ...state, arrayOfincremnetdecremnetViewDetails: action.payload
            }
        case "GET_FEE_STRUCHER_LIST":
            return {
                ...state, getstructure: action.payload
            }
        case "ADD_FEE_STRUCTURE":
            return {
                ...state, getstructure: [...state.getstructure, action.payload]
            }
        default:
            return state;
    }
};
export default FeeStructure;