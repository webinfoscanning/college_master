const initialState = {
    getAssest: [],
    getAssetMaster: []
};
export const Assest = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ASSEST":
            return { ...state, getAssest: action.payload }
        case "GET_ASSET_MASTER":
            return { ...state, getAssetMaster: action.payload }
        default:
            return state;
    }
};