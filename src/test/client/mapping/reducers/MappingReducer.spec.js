import {
    allTables,
    filteredTables,
    selectedTable,
    selectedTableColumns
} from "../../../../main/client/mapping/reducers/MappingReducer";

describe('#mappingReducers', function () {

    let action, state;

    describe('allTables', function () {

        beforeEach(() => {
            action = {
                "type": "allTables",
                allTables: []
            };
        });

        it('should return state when "action.type" is anything other than "allTables"', function () {
            state = ["someValue"];
            expect(allTables(state)).toEqual(["someValue"]);
        });

        it('should return action.allTables when "action.type" is allTables', function () {
            action.allTables = ["patient_identifier", "tb-service"];
            expect(allTables(state, action)).toEqual(["patient_identifier", "tb-service"]);
        });

        it('should return state when "action.type" is anything other than "allTables"', function () {
            expect(allTables()).toEqual([]);
        });
    });


    describe('filteredTables', function () {

        beforeEach(() => {
            action = {
                "type": "filteredTables",
                filteredTables: []
            };
        });

        it('should return state when "action.type" is anything other than "filteredTables"', function () {
            state = ["someValue"];
            expect(filteredTables(state)).toEqual(["someValue"]);
        });

        it('should return action.filteredTables when "action.type" is filteredTables', function () {
            action.filteredTables = ["patient_identifier"];
            expect(filteredTables(state, action)).toEqual(["patient_identifier"]);
        });

        it('should return state when "action.type" is anything other than "filteredTables"', function () {
            expect(filteredTables()).toEqual([]);
        });
    });

    describe('selectedTable', function () {

        beforeEach(() => {
            action = {
                "type": "selectedTable",
                selectedTable: ""
            };
        });

        it('should return state when "action.type" is anything other than "selectedTable"', function () {
            state = "someValue";
            expect(selectedTable(state)).toEqual("someValue");
        });

        it('should return action.selectedTable when "action.type" is selectedTable', function () {
            action.selectedTable = "patient_identifier";
            expect(selectedTable(state, action)).toEqual("patient_identifier");
        });

        it('should return state when "action.type" is anything other than "selectedTable"', function () {
            expect(selectedTable()).toEqual("");
        });
    });

    describe('selectedTableColumns', function () {

        beforeEach(() => {
            action = {
                "type": "selectedTableColumns",
                selectedTableColumns: []
            };
        });

        it('should return state when "action.type" is anything other than "selectedTableColumns"', function () {
            state = ["someValue"];
            expect(selectedTableColumns(state)).toEqual(["someValue"]);
        });

        it('should return action.selectedTableColumns when "action.type" is selectedTableColumns', function () {
            action.selectedTableColumns = ["patient_identifier", "tb-service"];
            expect(selectedTableColumns(state, action)).toEqual(["patient_identifier", "tb-service"]);
        });

        it('should return state when "action.type" is anything other than "selectedTableColumns"', function () {
            expect(selectedTableColumns()).toEqual([]);
        });
    });
});