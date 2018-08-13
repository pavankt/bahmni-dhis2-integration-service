export function hideSpinner(hide = true) {
    return {
        type : "hideSpinner",
        hideSpinner : hide
    }
}

export function showMessage(responseMessage = "", responseType = "") {
    return {
        type : "showMessage",
        responseMessage,
        responseType
    };
}

export function showHome(show = true) {
    return {
        type : "showHome",
        show
    }
}