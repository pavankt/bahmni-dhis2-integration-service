import { combineReducers } from 'redux';
import {
    allMappingNames,
    allTables,
    filteredInstanceTables,
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
    privileges
} from './common/Reducers';

const reducers = combineReducers({
  filteredInstanceTables,
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
  privileges
});

export default reducers;
