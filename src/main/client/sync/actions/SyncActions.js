import {showMessage} from "../../common/Actions";
import {auditLogEventDetails, sync} from '../../common/constants';
import Ajax from "../../common/Ajax";
import auditLog from '../../common/AuditLog';

export function syncData(mappingName = '', user = '') {
    return async dispatch => {
        try {
            let ajax = Ajax.instance();
            dispatch(showMessage("Sync started for " + mappingName, "success"));
            auditLog(auditLogEventDetails.SEND_DATA_TO_DHIS);
            await ajax.put(sync.URI + '?service=' + mappingName + '&user=' + user);
        } catch (e) {
            dispatch(showMessage("No data to sync for " + mappingName, "error"));
        }
    }
}
