import React from 'react';
import { auditLogEventDetails } from '../common/constants';
import auditLog from '../common/AuditLog';


export default class LogDashboard extends React.Component {
    componentDidMount() {
        auditLog(auditLogEventDetails.OPEN_DHIS_LOG);
    }

    render() {
    return (
      <div>
        <p>
          Logging Dashboard
        </p>
      </div>
    );
  }
}
