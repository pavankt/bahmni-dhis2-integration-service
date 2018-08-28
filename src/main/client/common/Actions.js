import Ajax from './Ajax';
import { privileges as appPrivileges } from './constants';

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
            let response = await ajax.get('/dhis-integration/api/session');
            if (response.length === 0) {
                window.location.pathname = '/home';
            }
            (response.length === 1 && response.includes(appPrivileges.APP)) ?
                dispatch(showMessage("You do not have permissions assigned. Contact admin to assign privileges for your user",
                    "error"))
                :dispatch(privileges(response));
        } catch (e) {
            window.location.pathname = '/home';
        }
        dispatch(hideSpinner());
    };
}