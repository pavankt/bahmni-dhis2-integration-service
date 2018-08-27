import {hideSpinner, showMessage} from "../../common/Actions";
import {sync, auditLogEventDetails} from '../../common/constants';
import Ajax from "../../common/Ajax";
import auditLog from '../../common/AuditLog';

export function syncData(mappingName = "") {
    return async dispatch => {
        dispatch(hideSpinner(false));
        try {
            let ajax = Ajax.instance();
            await ajax.get(sync.URI + mappingName);
            auditLog(auditLogEventDetails.SEND_DATA_TO_DHIS);
            dispatch(showMessage("Sync started for " + mappingName, "success"));
        } catch (e) {
            window.location.pathname = '/home';
        } finally {
            dispatch(hideSpinner());
        }
    }
}