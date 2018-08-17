import React from 'react';
import { auditLogEventDetails } from '../common/constants';
import auditLog from '../common/AuditLog';

export default class SyncDashboard extends React.Component {
    componentDidMount() {
      auditLog(auditLogEventDetails.OPEN_SYNC_TO_DHIS);
    }

    render() {
    return (
      <div>
        <p>
          Sync Dashboard
        </p>
      </div>
    );
  }
}
