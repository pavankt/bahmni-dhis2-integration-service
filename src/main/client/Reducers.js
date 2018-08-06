import {combineReducers} from 'redux';
import {hideSpinner} from './common/Reducers';
import {
    allMappingNames,
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns
} from './mapping/reducers/MappingReducer';

const reducers = combineReducers({
  filteredTables,
  selectedTable,
  allTables,
  selectedTableColumns,
  allMappingNames,
  hideSpinner
});

export default reducers;
