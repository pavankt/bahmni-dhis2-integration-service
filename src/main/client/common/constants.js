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
  OPEN_DHIS_SYNC: { patientUuid: null, eventType: 'OPEN_DHIS_SYNC', message: 'OPEN_DHIS_SYNC_MESSAGE', module: audit.LABEL },
  SAVE_MAPPING: { patientUuid: null, eventType: 'SAVE_MAPPING', message: 'SAVE_MAPPING_MESSAGE', module: audit.LABEL }
};
