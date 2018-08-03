export function hideSpinner(state=true, action = {}) {
    switch(action.type) {
        case 'hideSpinner' :
            return action.hideSpinner;
        default :
            return state;
    }
}
