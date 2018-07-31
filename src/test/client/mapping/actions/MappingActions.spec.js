import * as MappingActions from "../../../../main/client/mapping/actions/MappingActions";

describe("#mappingActions", () => {
    describe("#allTables", () => {
        it("should return empty tables ", () => {
            expect(MappingActions.allTables()).toEqual({
                "type": "allTables",
                "allTables": []
            });
        });

        it("should return table name in an array", () => {
            expect(MappingActions.allTables(["patient_identifier", "program", "some_table"])).toEqual({
                "type": "allTables",
                "allTables": ["patient_identifier", "program", "some_table"]
            });
        });
    });

    describe('#filteredTables', function () {
        it("should return empty tables ", () => {
            expect(MappingActions.filteredTables()).toEqual({
                "type": "filteredTables",
                "filteredTables": []
            });
        });

        it("should return table name in an array", () => {
            expect(MappingActions.filteredTables(["patient_identifier", "program", "some_table"])).toEqual({
                "type": "filteredTables",
                "filteredTables": ["patient_identifier", "program", "some_table"]
            });
        });
    });

    describe('selectedTable', function () {
        it("should return a table name", () => {
            expect(MappingActions.selectedTable()).toEqual({
                "type": "selectedTable",
                "selectedTable": ""
            });
        });

        it('should return tableName as value for the selectedTable field in the return object', function () {
            expect(MappingActions.selectedTable("tb_service")).toEqual({
                "type": "selectedTable",
                "selectedTable": "tb_service"
            });
        });
    });

    describe('tableColumns', function () {
        it("should return an empty array", () => {
            expect(MappingActions.tableColumns()).toEqual({
                "type": "selectedTableColumns",
                "selectedTableColumns": []
            });
        });

        it('should return selected table columns in an array', function () {
            expect(MappingActions.tableColumns(["pat_id", "pat_name", "age"])).toEqual({
                "type": "selectedTableColumns",
                "selectedTableColumns": ["pat_id", "pat_name", "age"]
            });
        });
    });
});