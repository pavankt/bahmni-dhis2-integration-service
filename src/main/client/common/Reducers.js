export function hideSpinner(state = true, action = {}) {
    switch(action.type) {
        case 'hideSpinner' :
            return action.hideSpinner;
        default :
            return state;
    }
}

export function showMessage(state = { 'responseMessage': '', 'responseType': '' }, action = {}) {
    switch (action.type) {
        case 'showMessage' :
            return { 'responseMessage' : action.responseMessage, 'responseType': action.responseType };
        default :
            return state;
    }
}