import {hideSpinner, showMessage} from "../../common/Actions";
import {auditLogEventDetails, sync} from '../../common/constants';
import Ajax from "../../common/Ajax";
import auditLog from '../../common/AuditLog';

export function syncData(mappingName = '', user = '', comment = '') {
    return async dispatch => {
        comment = comment.trim();
        if (comment === '') {
            dispatch(showMessage("Enter comment before syncing " + mappingName, "error"));
            return;
        }
        try {
            let ajax = Ajax.instance();
            let body = {
                service: mappingName,
                user: user,
                comment: comment
            };
            dispatch(showMessage("Sync started for " + mappingName, "success"));
            auditLog(auditLogEventDetails.SEND_DATA_TO_DHIS);
            await ajax.put(sync.URI, body);
        } catch (e) {
            dispatch(showMessage("No data to sync for " + mappingName, "error"));
        }
    }
}

export function getAllMappingsSyncInfo() {
    return async dispatch => {
        try {
            dispatch(hideSpinner(false));
            let ajax = Ajax.instance();
            let response = await ajax.get('/dhis-integration/api/getMappingSyncInfo');
            dispatch(mappingNames(Object.keys(response)));
            dispatch(syncDetails(response));
        } catch (e) {
            dispatch(showMessage(e.message, "error"))
        } finally {
            dispatch(hideSpinner());
        }
    }
}

export function mappingNames(mappingNames = []) {
    return {
        type: 'mappingNames',
        mappingNames
    }
}

export function syncDetails(syncDetails = {}) {
    return {
        type: 'syncDetails',
        syncDetails
    }
}
