import Ajax from '../../common/Ajax';
import moment from "moment";
import {showMessage} from "../../common/Actions";

export function logs(logs = []) {
    return {
        type: "logs",
        logs
    }
}

export function filterValues(date, service = '', user = '') {
    return {
        type: "filterOn",
        filter: {
            date,
            service,
            user
        }
    }
}

export function noEventsToDisplay(noEvents = false) {
    return {
        type: "noEventsToDisplay",
        noEvents
    }
}

export function noFilterEventsToDisplay(noFilterEvents = false) {
    return {
        type: "noFilterEventsToDisplay",
        noFilterEvents
    }
}

async function get(date, service, user, getAbove, logId, dispatch) {
    let ajax = Ajax.instance();
    try {
        let response = await ajax.get("/dhis-integration/api/logs", {date, service, user, getAbove, logId});
        if(response.length > 0) {
            dispatch(logs(response));
            dispatch(noEventsToDisplay());
        } else {
            dispatch(noEventsToDisplay(true));
        }
    } catch (e) {
        dispatch(showMessage("Could not get Events", "error"));
    }
}


export function getLogs(date, service = '', user = '') {
    return async dispatch => {
        let logId = 0;
        await get(date, service, user, true, logId, dispatch);
    }
}

export function getLogsOnFilter(date, service = '', user = '') {
    return async dispatch => {
        let ajax = Ajax.instance();
        let logId = 0;
        try {
            let response = await ajax.get("/dhis-integration/api/logs", {date, service, user, getAbove: true, logId});
            if (response.length > 0) {
                dispatch(logs(response));
                dispatch(noEventsToDisplay());
                dispatch(noFilterEventsToDisplay());
            } else {
                dispatch(logs([]));
                dispatch(noFilterEventsToDisplay(true));
            }
        } catch (e) {
            dispatch(showMessage("Could not get Events", "error"));
        }
    }
}

export function getNextPageLogs(service = '', user = '') {
    return async (dispatch, getState) => {
        let StateLogs = getState().logs;
        let logId = StateLogs[StateLogs.length - 1]["log_id"];
        let date = StateLogs[StateLogs.length - 1]["date_created"];

        await get(date, service, user, false, logId, dispatch);
    }
}

export function getPrevPageLogs(service = '', user = '') {
    return async (dispatch, getState) => {
        let StateLogs = getState().logs;
        let logId = StateLogs[0]["log_id"];
        let date = StateLogs[0]["date_created"];

        await get(date, service, user, true, logId, dispatch);
    }
}

export function getUtcFromLocal(date) {
    let isoString = moment(date, "YYYY-MM-DD HH:mm:ss", true).toISOString();
    return moment(isoString).utc().format("YYYY-MM-DD HH:mm:ss");
}

export function getLocalFromUtc(date) {
   return moment(moment.utc(date)).local().format("YYYY-MM-DD HH:mm:ss")
}