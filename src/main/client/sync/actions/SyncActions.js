import {showMessage} from "../../common/Actions";
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
            document.getElementById("preview_" + mappingName).disabled = true;
            document.getElementById("send_" + mappingName).disabled = true;
        } catch (e) {
            dispatch(showMessage("No data to sync for " + mappingName, "error"));
        }
    }
}
