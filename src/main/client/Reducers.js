import { combineReducers } from 'redux';
import {
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns
} from './mapping/reducers/MappingReducer';

import { hideSpinner } from './common/Reducers';

const reducers = combineReducers({
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  hideSpinner: hideSpinner
});

export default reducers;
