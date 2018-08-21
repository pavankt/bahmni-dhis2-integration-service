import { combineReducers } from 'redux';
import {
    allMappingNames,
    allTables,
    filteredInstanceTables,
    selectedInstanceTable,
    selectedTableColumns,
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
  allTables,
  selectedTableColumns,
  allMappingNames,
  hideSpinner,
  showMessage,
  currentMapping,
  showHomeButton,
  mappingJson,
  privileges
});

export default reducers;
