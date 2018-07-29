import { combineReducers } from 'redux';
import { filteredTables,
selectedTable,
    allTables,
    selectedTableColumns
} from './mapping/reducers/MappingReducer';

const reducers = combineReducers({
    filteredTables,
    selectedTable,
    allTables,
    selectedTableColumns
});

export default reducers;