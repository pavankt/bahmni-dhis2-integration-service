import {
    allTables,
    filteredInstanceTables,
    selectedInstanceTable,
    selectedInstanceTableColumns,
    allMappingNames,
    currentMapping,
    mappingJson, filteredEnrollmentTables, selectedEnrollmentsTable, selectedEnrollmentTableColumns
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

        it('should return action.allTables when "action.type" is allTables', () => {
            action.allTables = ['patient_identifier', 'tb-service'];
            expect(allTables(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "allTables"', () => {
            expect(allTables()).toEqual([]);
        });
    });


    describe('filteredInstanceTables', () => {
        beforeEach(() => {
            action = {
                type: 'filteredInstanceTables',
                filteredInstanceTables: []
            };
        });

        it('should return state when "action.type" is anything other than "filteredInstanceTables"', () => {
            state = ['someValue'];
            expect(filteredInstanceTables(state)).toEqual(['someValue']);
        });

        it('should return action.filteredInstanceTables when "action.type" is filteredInstanceTables', () => {
            action.filteredInstanceTables = ['patient_identifier'];
            expect(filteredInstanceTables(state, action)).toEqual(['patient_identifier']);
        });

        it('should return state when "action.type" is anything other than "filteredInstanceTables"', () => {
            expect(filteredInstanceTables()).toEqual([]);
        });
    });

    describe('filteredEnrollmentTables', () => {
        beforeEach(() => {
            action = {
                type: 'filteredEnrollmentTables',
                filteredEnrollmentTables: []
            };
        });

        it('should return state when "action.type" is anything other than "filteredEnrollmentTables"', () => {
            state = ['someValue'];
            expect(filteredEnrollmentTables(state)).toEqual(['someValue']);
        });

        it('should return action.filteredEnrollmentTables when "action.type" is filteredEnrollmentTables', () => {
            action.filteredEnrollmentTables = ['patient_identifier'];
            expect(filteredEnrollmentTables(state, action)).toEqual(['patient_identifier']);
        });

        it('should return state when "action.type" is anything other than "filteredEnrollmentTables"', () => {
            expect(filteredEnrollmentTables()).toEqual([]);
        });
    });

    describe('selectedInstanceTable', () => {
        beforeEach(() => {
            action = {
                type: 'selectedInstanceTable',
                selectedInstanceTable: ''
            };
        });

        it('should return state when "action.type" is anything other than "selectedInstanceTable"', () => {
            state = 'someValue';
            expect(selectedInstanceTable(state)).toEqual('someValue');
        });

        it('should return action.selectedInstanceTable when "action.type" is selectedInstanceTable', () => {
            action.selectedInstanceTable = 'patient_identifier';
            expect(selectedInstanceTable(state, action)).toEqual('patient_identifier');
        });

        it('should return state when "action.type" is anything other than "selectedInstanceTable"', () => {
            expect(selectedInstanceTable()).toEqual('');
        });
    });

    describe('selectedEnrollmentsTable', () => {
        beforeEach(() => {
            action = {
                type: 'selectedEnrollmentsTable',
                selectedEnrollmentsTable: ''
            };
        });

        it('should return state when "action.type" is anything other than "selectedEnrollmentsTable"', () => {
            state = 'someValue';
            expect(selectedEnrollmentsTable(state)).toEqual('someValue');
        });

        it('should return action.selectedEnrollmentsTable when "action.type" is selectedEnrollmentsTable', () => {
            action.selectedEnrollmentsTable = 'patient_identifier';
            expect(selectedEnrollmentsTable(state, action)).toEqual('patient_identifier');
        });

        it('should return state when "action.type" is anything other than "selectedEnrollmentsTable"', () => {
            expect(selectedEnrollmentsTable()).toEqual('');
        });
    });

    describe('selectedInstanceTableColumns', () => {
        beforeEach(() => {
            action = {
                type: 'selectedInstanceTableColumns',
                selectedInstanceTableColumns: []
            };
        });

        it('should return state when "action.type" is anything other than "selectedInstanceTableColumns"', () => {
            state = ['someValue'];
            expect(selectedInstanceTableColumns(state)).toEqual(['someValue']);
        });

        it('should return action.selectedInstanceTableColumns when "action.type" is selectedInstanceTableColumns', () => {
            action.selectedInstanceTableColumns = ['patient_identifier', 'tb-service'];
            expect(selectedInstanceTableColumns(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "selectedInstanceTableColumns"', () => {
            expect(selectedInstanceTableColumns()).toEqual([]);
        });
    });

    describe('selectedEnrollmentTableColumns', () => {
        beforeEach(() => {
            action = {
                type: 'selectedEnrollmentTableColumns',
                selectedEnrollmentTableColumns: []
            };
        });

        it('should return state when "action.type" is anything other than "selectedEnrollmentTableColumns"', () => {
            state = ['someValue'];
            expect(selectedEnrollmentTableColumns(state)).toEqual(['someValue']);
        });

        it('should return action.selectedEnrollmentTableColumns when "action.type" is selectedEnrollmentTableColumns', () => {
            action.selectedEnrollmentTableColumns = ['patient_identifier', 'tb-service'];
            expect(selectedEnrollmentTableColumns(state, action)).toEqual(['patient_identifier', 'tb-service']);
        });

        it('should return state when "action.type" is anything other than "selectedEnrollmentTableColumns"', () => {
            expect(selectedEnrollmentTableColumns()).toEqual([]);
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
            expect(mappingJson()).toEqual({instance:{},enrollments:{}});
        });

        it('should return state when "action.type" is anything other than "mappingJson"', () => {
            state = {
                "instance": {"pat_id" : "patHn67"},
                "enrollments": {"pat_id": "pafsr3"}
            };
            expect(mappingJson(state)).toEqual(state);
        });

        it('should return action.mappingJson when "action.type" is mappingJson', () => {
            let action = {
                type : "mappingJson",
                mappingJson : {
                    "instance": {"pro_id" : "ASG67J", "rpo_name" : "9Yu6TR" },
                    "enrollments": {"pat_id": "pafsr3"}
                }
            };
            expect(mappingJson({}, action)).toEqual(action.mappingJson);
        });
    });

});
