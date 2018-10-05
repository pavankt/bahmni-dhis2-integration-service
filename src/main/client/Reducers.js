import {combineReducers} from 'redux';
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

import {
    hideSpinner,
    showMessage,
    showHomeButton,
    session,
    showHeader
} from './common/Reducers';

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
    showHeader,
    mappingJson,
    session
});

export default reducers;
