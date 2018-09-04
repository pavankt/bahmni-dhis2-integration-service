import { combineReducers } from 'redux';
import {
    allMappingNames,
    allTables,
    filteredInstanceTables,
    filteredEnrollmentTables,
    selectedInstanceTable,
    selectedEnrollmentsTable,
    selectedInstanceTableColumns,
    selectedEnrollmentTableColumns,
    currentMapping,
    mappingJson
} from './mapping/reducers/MappingReducer';

import { hideSpinner,
    showMessage,
    showHomeButton,
    session
} from './common/Reducers';

const reducers = combineReducers({
  filteredInstanceTables,
  filteredEnrollmentTables,
  selectedInstanceTable,
  selectedEnrollmentsTable,
  allTables,
  selectedInstanceTableColumns,
  selectedEnrollmentTableColumns,
  allMappingNames,
  hideSpinner,
  showMessage,
  currentMapping,
  showHomeButton,
  mappingJson,
  session
});

export default reducers;
