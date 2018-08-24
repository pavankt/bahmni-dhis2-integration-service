export const privileges = {
  MAPPING : 'app:dhis2sync:mapping',
  LOG : 'app:dhis2sync:log',
  UPLOAD: 'app:dhis2sync:upload',
  APP: 'app:dhis2sync'
};

export const audit = {
  LABEL: 'MODULE_LABEL_DHIS_SYNC_KEY',
  URI: '/openmrs/ws/rest/v1/auditlog'
};

export const auditLogEventDetails = {
  OPEN_DHIS_SYNC_APP: { patientUuid: null, eventType: 'OPEN_DHIS_SYNC_APP', message: 'OPEN_DHIS_SYNC_APP_MESSAGE', module: audit.LABEL },
  SAVE_DHIS_MAPPING: { patientUuid: null, eventType: 'SAVE_DHIS_MAPPING', message: 'SAVE_DHIS_MAPPING_MESSAGE', module: audit.LABEL },
  OPEN_DHIS_MANAGE_MAPPING: { patientUuid: null, eventType: 'OPEN_DHIS_MANAGE_MAPPING', message: 'OPEN_DHIS_MANAGE_MAPPING_MESSAGE', module: audit.LABEL },
  OPEN_SYNC_TO_DHIS: { patientUuid: null, eventType: 'OPEN_SYNC_TO_DHIS', message: 'OPEN_SYNC_TO_DHIS_MESSAGE', module: audit.LABEL },
  OPEN_DHIS_LOG: { patientUuid: null, eventType: 'OPEN_DHIS_LOG', message: 'OPEN_DHIS_LOG_MESSAGE', module: audit.LABEL }
};

export const sync = {
    // LABEL: 'MODULE_LABEL_DHIS_SYNC_KEY',
    URI: '/sync/pushData?service='
};
