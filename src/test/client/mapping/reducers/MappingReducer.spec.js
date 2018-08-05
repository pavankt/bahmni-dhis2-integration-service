import {
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns,
    allMappingNames
} from '../../../../main/client/mapping/reducers/MappingReducer';

describe('#mappingReducers', () => {
    let action,
        state;

    describe('allTables', () => {
        beforeEach(() => {
            action = {
                type: 'allTables',
                allTables: []
            };
        });

        it('should return state when "action.type" is anything other than "allTables"', () => {
            state = ['someValue'];
            expect(allTables(state)).toEqual(['someValue']);
        });

        it('should return action.allTables when "action.type" is allTables', () => {
            action.allTables = ['patient_identifier', 'tb-service'];
            expect(allTables(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "allTables"', () => {
            expect(allTables()).toEqual([]);
        });
    });


    describe('filteredTables', () => {
        beforeEach(() => {
            action = {
                type: 'filteredTables',
                filteredTables: []
            };
        });

        it('should return state when "action.type" is anything other than "filteredTables"', () => {
            state = ['someValue'];
            expect(filteredTables(state)).toEqual(['someValue']);
        });

        it('should return action.filteredTables when "action.type" is filteredTables', () => {
            action.filteredTables = ['patient_identifier'];
            expect(filteredTables(state, action)).toEqual(['patient_identifier']);
        });

        it('should return state when "action.type" is anything other than "filteredTables"', () => {
            expect(filteredTables()).toEqual([]);
        });
    });

    describe('selectedTable', () => {
        beforeEach(() => {
            action = {
                type: 'selectedTable',
                selectedTable: ''
            };
        });

        it('should return state when "action.type" is anything other than "selectedTable"', () => {
            state = 'someValue';
            expect(selectedTable(state)).toEqual('someValue');
        });

        it('should return action.selectedTable when "action.type" is selectedTable', () => {
            action.selectedTable = 'patient_identifier';
            expect(selectedTable(state, action)).toEqual('patient_identifier');
        });

        it('should return state when "action.type" is anything other than "selectedTable"', () => {
            expect(selectedTable()).toEqual('');
        });
    });

    describe('selectedTableColumns', () => {
        beforeEach(() => {
            action = {
                type: 'selectedTableColumns',
                selectedTableColumns: []
            };
        });

        it('should return state when "action.type" is anything other than "selectedTableColumns"', () => {
            state = ['someValue'];
            expect(selectedTableColumns(state)).toEqual(['someValue']);
        });

        it('should return action.selectedTableColumns when "action.type" is selectedTableColumns', () => {
            action.selectedTableColumns = ['patient_identifier', 'tb-service'];
            expect(selectedTableColumns(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "selectedTableColumns"', () => {
            expect(selectedTableColumns()).toEqual([]);
        });
    });

    describe('allMappingNames', () => {
        beforeEach(() => {
            action = {
                type: 'renderedMappingNames',
                renderedMappingNames: []
            };
        });

        it('should return state when "action.type" is anything other than "renderedMappingNames"', () => {
            state = ['someValue'];
            expect(allMappingNames(state)).toEqual(['someValue']);
        });

        it('should return action.renderedMappingNames when "action.type" is renderedMappingNames', () => {
            action.renderedMappingNames = ['patient_identifier', 'tb-service'];
            expect(allMappingNames(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "renderedMappingNames"', () => {
            expect(allMappingNames()).toEqual([]);
        });
    });
});
