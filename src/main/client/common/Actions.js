import Ajax from "./Ajax";

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
    return async dispatch => {
        let ajax = Ajax.instance();
        dispatch(hideSpinner(false));
        try {
            let response = await ajax.get('/dhis-integration/session');
            response.length === 0 ?
                dispatch(showMessage("You do not have permissions assigned. Contact admin to assign privileges for your user",
                    "error"))
                :dispatch(privileges(response));
        } catch (e) {
            dispatch(showMessage("Could not get Privileges", "error"));
        }
        dispatch(hideSpinner());
    };
}