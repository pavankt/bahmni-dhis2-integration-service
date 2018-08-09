import { combineReducers } from 'redux';
import {
    allMappingNames,
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns
} from './mapping/reducers/MappingReducer';

import { hideSpinner,
    showMessage
} from './common/Reducers';

const reducers = combineReducers({
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  allMappingNames,
  hideSpinner,
  showMessage
});

export default reducers;
