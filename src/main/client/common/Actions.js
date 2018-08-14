import Ajax from "./Ajax";
import Privileges from "./constants";

export function hideSpinner(hide = true) {
    return {
        type: "hideSpinner",
        hideSpinner: hide
    }
}

export function showMessage(responseMessage = "", responseType = "") {
    return {
        type: "showMessage",
        responseMessage,
        responseType
    };
}

export function showHome(show = true) {
    return {
        type: "showHome",
        show
    }
}

export function privileges(privileges = []) {
    return {
        type: "privileges",
        privileges
    }
}

export function getPrivileges() {
    console.log("get privileges");
    return async dispatch => {
        let ajax = Ajax.instance();
        dispatch(hideSpinner(false));
        try {
            let response = await ajax.get('/dhis-integration/session');
            dispatch(privileges(response));
        }
        catch
            (e) {
            dispatch(showMessage("Could not get Privileges", "error"));
        }
    };
}