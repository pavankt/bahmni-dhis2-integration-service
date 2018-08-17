import {
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns,
    allMappingNames,
    currentMapping,
    mappingJson
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
                type: 'allMappings',
                allMappings: []
            };
        });

        it('should return state when "action.type" is anything other than "renderedMappingNames"', () => {
            state = ['someValue'];
            expect(allMappingNames(state)).toEqual(['someValue']);
        });

        it('should return action.renderedMappingNames when "action.type" is renderedMappingNames', () => {
            action.allMappings = ['patient_identifier', 'tb-service'];
            expect(allMappingNames(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "renderedMappingNames"', () => {
            expect(allMappingNames()).toEqual([]);
        });

        it('should add new mapping name to the existing list', () => {
           let action = {
               type: 'addNewMapping',
               mappingName: "new mapping"
           };

           expect(allMappingNames([ "first name", "second name" ], action))
               .toEqual([ "first name", "second name", "new mapping" ]);
        });
    });

    describe('currentMapping', () => {
        it('should return state with default params', () => {
            expect(currentMapping()).toEqual("");
        });

        it('should return state when "action.type" is anything other than "currentMapping"', () => {
            state = "HTS Service";
            expect(currentMapping(state)).toEqual(state);
        });

        it('should return action.currentMapping when "action.type" is currentMapping', () => {
            let action = {
                type : "currentMapping",
                mappingName : "HTS Service"
            };
            expect(currentMapping("", action)).toEqual("HTS Service");
        });
    });

    describe('mappingJson', () => {
        it('should return state with default params', () => {
            expect(mappingJson()).toEqual({});
        });

        it('should return state when "action.type" is anything other than "mappingJson"', () => {
            state = {
                "pat_id" : "patHn67"
            };
            expect(mappingJson(state)).toEqual(state);
        });

        it('should return action.mappingJson when "action.type" is mappingJson', () => {
            let action = {
                type : "mappingJson",
                mappingJson : {
                    "pro_id" : "ASG67J",
                    "rpo_name" : "9Yu6TR"
                }
            };
            expect(mappingJson({}, action)).toEqual(action.mappingJson);
        });
    });

});
