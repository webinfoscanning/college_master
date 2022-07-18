const initialState = {
    getExpenselist: []
};
export const Expense = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EXPENSE":
            return { ...state, getExpenselist: action.payload }
        default:
            return state;
    }
};