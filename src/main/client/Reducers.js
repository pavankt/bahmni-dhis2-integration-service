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
    session,
    showHeader
} from './common/Reducers';

import {
    logs,
    filters,
    noEventsToDisplay
} from './log/reducers/LogReducer';

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
  showHeader,
  session,
  logs,
  filters,
  noEventsToDisplay
});

export default reducers;
