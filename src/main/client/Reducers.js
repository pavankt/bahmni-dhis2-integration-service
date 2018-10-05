import { combineReducers } from 'redux';
import {
    mappingDetails,
    allMappingNames,
    allTables,
    selectedInstanceTable,
    selectedEnrollmentsTable,
    selectedEventTable,
    selectedInstanceTableColumns,
    selectedEventTableColumns,
    currentMapping,
    mappingJson,
} from './mapping/reducers/MappingReducer';

import { hideSpinner,
    showMessage,
    showHomeButton,
    session
} from './common/Reducers';

const reducers = combineReducers({
  selectedInstanceTable,
  selectedEnrollmentsTable,
  selectedEventTable,
  allTables,
  selectedInstanceTableColumns,
  selectedEventTableColumns,
  allMappingNames,
  mappingDetails,
  hideSpinner,
  showMessage,
  currentMapping,
  showHomeButton,
  mappingJson,
  session
});

export default reducers;
