import { combineReducers } from 'redux';
import {
    allMappingNames,
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns,
    currentMapping
} from './mapping/reducers/MappingReducer';

import { hideSpinner,
    showMessage,
    showHomeButton
} from './common/Reducers';

const reducers = combineReducers({
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  allMappingNames,
  hideSpinner,
  showMessage,
  currentMapping,
  showHomeButton
});

export default reducers;
