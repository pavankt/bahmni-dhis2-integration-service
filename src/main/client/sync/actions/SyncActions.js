import {showMessage} from "../../common/Actions";
import {auditLogEventDetails, sync} from '../../common/constants';
import Ajax from "../../common/Ajax";
import auditLog from '../../common/AuditLog';

export function syncData(mappingName = '', user = '') {
    return dispatch => {
        try {
            let ajax = Ajax.instance();
            ajax.put(sync.URI + '?service=' + mappingName + '&user=' + user);
            dispatch(showMessage("Sync started for " + mappingName, "success"));
            auditLog(auditLogEventDetails.SEND_DATA_TO_DHIS);
        } catch (e) {
            window.location.pathname = '/home';
        }
    }
}
