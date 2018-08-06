import { hideSpinner } from './common/Reducers';
import { combineReducers } from 'redux';
import {
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  allMappingNames
} from './mapping/reducers/MappingReducer';

const reducers = combineReducers({
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  allMappingNames,
  selectedTableColumns,
  hideSpinner
});

export default reducers;
