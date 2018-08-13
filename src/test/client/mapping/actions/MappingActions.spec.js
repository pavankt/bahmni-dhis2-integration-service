import 'jsdom-global/register';
import 'jsdom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as MappingActions from '../../../../main/client/mapping/actions/MappingActions';
import Ajax from "../../../../main/client/common/Ajax";

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
describe('#mappingActions', () => {
    describe('#allTables', () => {
        it('should return empty tables ', () => {
            expect(MappingActions.allTables()).toEqual({
                type: 'allTables',
                allTables: []
            });
        });

        it('should return table name in an array', () => {
            expect(MappingActions.allTables(['patient_identifier', 'program', 'some_table'])).toEqual({
                type: 'allTables',
                allTables: ['patient_identifier', 'program', 'some_table']
            });
        });
    });

    describe('#filteredTables', () => {
        it('should return empty tables ', () => {
            expect(MappingActions.filteredTables()).toEqual({
                type: 'filteredTables',
                filteredTables: []
            });
        });

        it('should return table name in an array', () => {
            expect(MappingActions.filteredTables(['patient_identifier', 'program', 'some_table'])).toEqual({
                type: 'filteredTables',
                filteredTables: ['patient_identifier', 'program', 'some_table']
            });
        });
    });

    describe('selectedTable', () => {
        it('should return a table name', () => {
            expect(MappingActions.selectedTable()).toEqual({
                type: 'selectedTable',
                selectedTable: ''
            });
        });

        it('should return tableName as value for the selectedTable field in the return object', () => {
            expect(MappingActions.selectedTable('tb_service')).toEqual({
                type: 'selectedTable',
                selectedTable: 'tb_service'
            });
        });
    });

    describe('tableColumns', () => {
        it('should return an empty array', () => {
            expect(MappingActions.tableColumns()).toEqual({
                type: 'selectedTableColumns',
                selectedTableColumns: []
            });
        });

        it('should return selected table columns in an array', () => {
            expect(MappingActions.tableColumns(['pat_id', 'pat_name', 'age'])).toEqual({
                type: 'selectedTableColumns',
                selectedTableColumns: ['pat_id', 'pat_name', 'age']
            });
        });
    });

    describe('allMappingNames', () => {
        it('should return an empty array', () => {
            expect(MappingActions.allMappingNames()).toEqual({
                type: 'renderedMappingNames',
                renderedMappingNames: []
            });
        });

        it('should return selected table columns in an array', () => {
            expect(MappingActions.allMappingNames(['pat_id', 'pat_name', 'age'])).toEqual({
                type: 'renderedMappingNames',
                renderedMappingNames: ['pat_id', 'pat_name', 'age']
            });
        });
    });

    describe('addNewMapping', () => {
        it('should return object with type and mapping', () => {
            expect(MappingActions.addNewMapping("new mapping"))
                .toEqual({ type: 'addNewMapping', mappingName: 'new mapping' })
        })
    });

    describe('saveMapping', () => {
       it('should dispatch showMessage with ShouldAddMappingName when mapping name is empty', async () => {
           let expectedActions = [{
               type : "showMessage",
               responseMessage: "Should have Mapping Name",
               responseType: "error"
           }];

           let store = mockStore({ showMessage : {
                 responseMessage: "",
                 responseType: ""
               }});

           await store.dispatch(MappingActions.saveMappings("", [], ""));
           expect(store.getActions()).toEqual(expectedActions);
       });

       it('should dispatch showMessage with AtLeaseOneColumnShouldHaveMapping when mapping name is empty', async () => {
           let expectedActions = [{
               type : "showMessage",
               responseMessage: "At least one Bahmni Data Point should have DHIS2 Data Element ID mapped",
               responseType: "error"
           }];

           let store = mockStore({ showMessage : {
                 responseMessage: "",
                 responseType: ""
               }});

           await store.dispatch(MappingActions.saveMappings("Mapping Name", [], ""));
           expect(store.getActions()).toEqual(expectedActions);
       });

       it('should dispatch showMessage with MappingNameShouldBeUnique when mapping name is already registered', async () => {
           let expectedActions = [{
               type : "showMessage",
               responseMessage: "Mapping Name should be unique",
               responseType: "error"
           }];

           let store = mockStore({
               showMessage : {
                 responseMessage: "",
                 responseType: ""
               },
               allMappingNames: ["Mapping Name"]
            });

           document.body.innerHTML =
           '<div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_id</div>'+
                   '<div class="mapping-data-element">' +
                       '<input type="input" class="mapping-input"/>' +
                   '</div>'+
               '</div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_name</div>'+
                   '<div class="mapping-data-element">'+
                       '<input type="input" class="mapping-input"/>'+
                   '</div>'+
               '</div>'+
           '</div>';

           document.getElementsByClassName("mapping-input")[0].value = "XdJH67";
           document.getElementsByClassName("mapping-input")[1].value = "LKtyR55";

           await store.dispatch(MappingActions.saveMappings("Mapping Name", document.getElementsByClassName("mapping-row"), ""));
           expect(store.getActions()).toEqual(expectedActions);
       });

       it('should dispatch necessary actions on ajax success', async () => {
           let mappingName = "Mapping Name 2";
           let lookupTable = "patient_details";
           let ajax = new Ajax();
           let expectedActions = [
               {
                 type: "selectedTable",
                 selectedTable : ""
               },
               {
                 type: "filteredTables",
                 filteredTables : []
               },
               {
                 type: "hideSpinner",
                 hideSpinner: false
               },
               {
                   type: "showMessage",
                   responseMessage: "Successfully Added new mapping",
                   responseType: "success"
               },
               {
                   type: "addNewMapping",
                   mappingName: mappingName
               },
               {
                   type: "hideSpinner",
                   hideSpinner: true
               }
           ];

           let store = mockStore({
               showMessage : {
                 responseMessage: "",
                 responseType: ""
               },
               allMappingNames: ["Mapping Name"]
            });

           document.body.innerHTML =
           '<div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_id</div>'+
                   '<div class="mapping-data-element">' +
                       '<input type="input" class="mapping-input"/>' +
                   '</div>'+
               '</div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_name</div>'+
                   '<div class="mapping-data-element">'+
                       '<input type="input" class="mapping-input"/>'+
                   '</div>'+
               '</div>'+
           '</div>';

           document.getElementsByClassName("mapping-input")[0].value = "XdJH67";
           document.getElementsByClassName("mapping-input")[1].value = "LKtyR55";

           let history = {
                push : () => {}
            };

            let sandbox = sinon.createSandbox();
            let pushMock = sandbox.mock(history).expects("push");
            sandbox.stub(Ajax, "instance").returns(ajax);
            let putMock = sandbox.mock(ajax).expects("put")
                .returns(Promise.resolve({ data : "Successfully Added new mapping" }));

            history.push = pushMock;

           await store.dispatch(MappingActions
               .saveMappings(mappingName,
               document.getElementsByClassName("mapping-row"),
               lookupTable,
               history));

           expect(store.getActions()).toEqual(expectedActions);

           pushMock.verify();
           putMock.verify();
           sandbox.restore();
       });

       it('should dispatch showMessage on ajax call fails', async () => {
           let mappingName = "Mapping Name 2";
           let lookupTable = "patient_details";
           let ajax = new Ajax();
           let expectedActions = [
               {
                   type: "showMessage",
                   responseMessage: "Could not able to add mapping",
                   responseType: "error"
               }
           ];

           let store = mockStore({
               showMessage : {
                 responseMessage: "",
                 responseType: ""
               },
               allMappingNames: ["Mapping Name"]
            });

           document.body.innerHTML =
           '<div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_id</div>'+
                   '<div class="mapping-data-element">' +
                       '<input type="input" class="mapping-input"/>' +
                   '</div>'+
               '</div>' +
               '<div class="mapping-row">'+
                   '<div class="mapping-column-name">pat_name</div>'+
                   '<div class="mapping-data-element">'+
                       '<input type="input" class="mapping-input"/>'+
                   '</div>'+
               '</div>'+
           '</div>';

           document.getElementsByClassName("mapping-input")[0].value = "XdJH67";
           document.getElementsByClassName("mapping-input")[1].value = "LKtyR55";

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let putMock = sandbox.mock(ajax).expects("put")
                .returns(Promise.reject({ "message": "Could not able to add mapping" }));


            try {
                await store.dispatch(MappingActions
                    .saveMappings(mappingName,
                        document.getElementsByClassName("mapping-row"),
                        lookupTable));
            } catch (e) {
                expect(store.getActions()).toEqual(expectedActions);
                putMock.verify();
                sandbox.restore();
            }
       });
    });
});
