const defaultState = {
    selected: "",
    highlighted: "",
}

function Reducer(state = defaultState, action) {
    switch(action.type) {
        case "SET_SELECTED":
            return {
                ...state,
                selected: action.payload,
            }
        case "SET_HIGHLIGHTED":
            console.log("Setting the highlighted to \"" + action.payload + "\"");
            return {
                ...state,
                highlighted: action.payload,
            }
        default: return state;
    }
} 

export default Reducer;
