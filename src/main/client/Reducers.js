import { combineReducers } from 'redux';
import {
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

import {
    logs,
    filters,
    noEventsToDisplay,
    noFilterEventsToDisplay
} from './log/reducers/LogReducer';

const reducers = combineReducers({
  selectedInstanceTable,
  selectedEnrollmentsTable,
  selectedEventTable,
  allTables,
  selectedInstanceTableColumns,
  selectedEventTableColumns,
  allMappingNames,
  hideSpinner,
  showMessage,
  currentMapping,
  showHomeButton,
  mappingJson,
  session,
  logs,
  filters,
  noEventsToDisplay,
  noFilterEventsToDisplay
});

export default reducers;
