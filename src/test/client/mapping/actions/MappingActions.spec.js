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
                type: 'allMappings',
                allMappings: []
            });
        });

        it('should return selected table columns in an array', () => {
            expect(MappingActions.allMappingNames(['pat_id', 'pat_name', 'age'])).toEqual({
                type: 'allMappings',
                allMappings: ['pat_id', 'pat_name', 'age']
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
                 type: "hideSpinner",
                 hideSpinner: false
               },
               {
                   type: "showMessage",
                   responseMessage: "Successfully Added new mapping",
                   responseType: "success"
               },
               {
                   type: "currentMapping",
                   mappingName: ""
               },
               {
                   type: "mappingJson",
                   mappingJson: {}
               },
               {
                   type: "hideSpinner",
                   hideSpinner: true
               },
               {
                   type: "selectedTable",
                   selectedTable: ""
               },
               {
                   type: "filteredTables",
                   filteredTables : []
               }
           ];

           let store = mockStore({
               showMessage : {
                 responseMessage: "",
                 responseType: ""
               },
               allMappingNames: ["Mapping Name"],
               currentMapping : ""
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
            }
           sandbox.restore();
       });
    });

    describe('currentMapping', () => {
        it('should return object with type and mappingName', () => {
            expect(MappingActions.currentMapping("new mapping"))
                .toEqual({ type: "currentMapping", mappingName: "new mapping" })
        })
    });

    describe('mappingJson', () => {
        it('should return object with type and mappingJson', () => {
            let mappingJson = {
              "patient_id" : "FH7RTu",
              "patient_name" : "ZS8Srt7"
            };
            expect(MappingActions.mappingJson(mappingJson))
                .toEqual({ type: "mappingJson", mappingJson })
        })
    });

    describe('getMapping', () => {
        it('should dispatch mapping details', async () => {
            let ajax = new Ajax();
            let mappingNameToEdit = "HTS Service";
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "selectedTable",
                    selectedTable: "patient_details"
                },
                {
                    type: "currentMapping",
                    mappingName: mappingNameToEdit
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        patient_identifier: "fYj7U",
                        patient_name: "ert76HK"
                    }
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let history = {
                push: () => {
                }
            };
            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getMapping", {"mappingName": mappingNameToEdit})
                .returns(Promise.resolve({
                    "mapping_name": "HTS Service",
                    "lookup_table": {
                        "value" : '{' +
                            '"instance": "patient_details"' +
                        '}',
                        "type": "json"
                    },
                    "mapping_json": {
                        "value": '{' +
                            '"instance": {' +
                                '"patient_identifier": "fYj7U",' +
                                '"patient_name": "ert76HK"' +
                            '}' +
                        '}',
                        "type": "json"
                    }
                }));
            let pushMock = sandbox.mock(history).expects("push")
                .withArgs("/dhis-integration/mapping/addEditMappings");
            history.push = pushMock;

            await store.dispatch(MappingActions.getMapping(mappingNameToEdit, history));

            expect(store.getActions()).toEqual(expectedActions);

            ajaxGetMock.verify();
            pushMock.verify();
            sandbox.restore();
        });

        it('should dispatch show message on fail', async () => {
            let ajax = new Ajax();
            let message = "Could not get mappings";
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: message,
                    responseType: "error"
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getMapping", {"mappingName": "some name"})
                .returns(Promise.reject({
                    message
                }));

            try {
                await store.dispatch(MappingActions.getMapping("some name", {}));
            } catch (e) {
                expect(store.getActions()).toEqual(expectedActions);

                ajaxGetMock.verify();
            } finally {
                sandbox.restore();
            }
        });
    });

    describe('getAllMappings', () => {
        it('should get all mapping names', async () => {
            let ajax = new Ajax();
            let mappings = [
                "HTS Service",
                "TB Service"
            ];
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner : false
                },
                {
                    type: "allMappings",
                    allMappings: mappings
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getMappingNames")
                .returns(Promise.resolve(mappings));

            await store.dispatch(MappingActions.getAllMappings());

            expect(store.getActions()).toEqual(expectedActions);
            ajaxGetMock.verify();
            sandbox.restore();
        });

        it('should dispatch show message when getAllMappings fail', async () => {
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: "Could not get mappings",
                    responseType: "error"
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getMappingNames")
                .returns(Promise.reject({
                    message : "Could not get mappings"
                }));

            try {
                await store.dispatch(MappingActions.getAllMappings());
            } catch (e) {
                expect(store.getActions()).toEqual(expectedActions);
                ajaxGetMock.verify();
            } finally {
                sandbox.restore();
            }
        });
    });

    describe('getTableColumns', () => {
        it('should get all columns of the table', async () => {
            let ajax = new Ajax();
            let columns = [
                "pat_identifier",
                "pat_name"
            ];
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner : false
                },
                {
                    type: "selectedTableColumns",
                    selectedTableColumns: columns
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTableColumns: []
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getColumns")
                .returns(Promise.resolve(columns));

            await store.dispatch(MappingActions.getTableColumns("pat_details"));

            expect(store.getActions()).toEqual(expectedActions);
            ajaxGetMock.verify();
            sandbox.restore();
        });

        it('should dispatch show message when getAllMappings fail', async () => {
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: "Could not get table columns",
                    responseType: "error"
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedTable: ""
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/getColumns")
                .returns(Promise.reject({
                    message : "Could not get table columns"
                }));

            try {
                await store.dispatch(MappingActions.getTableColumns("pat_details"));
            } catch (e) {
                expect(store.getActions()).toEqual(expectedActions);
                ajaxGetMock.verify();
            } finally {
                sandbox.restore();
            }
        });
    });
});
