import 'jsdom-global/register';
import 'jsdom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as MappingActions from '../../../../main/client/mapping/actions/MappingActions';
import * as Actions from '../../../../main/client/common/Actions';
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

    describe('selectedInstanceTable', () => {
        it('should return a table name', () => {
            expect(MappingActions.selectedInstanceTable()).toEqual({
                type: 'selectedInstanceTable',
                selectedInstanceTable: ''
            });
        });

        it('should return tableName as value for the selectedInstanceTable field in the return object', () => {
            expect(MappingActions.selectedInstanceTable('tb_service')).toEqual({
                type: 'selectedInstanceTable',
                selectedInstanceTable: 'tb_service'
            });
        });
    });

    describe('selectedEnrollmentsTable', () => {
        it('should return selectedEnrollmentsTable as empty on default', () => {
            expect(MappingActions.selectedEnrollmentsTable()).toEqual({
                type: 'selectedEnrollmentsTable',
                selectedEnrollmentsTable: ''
            });
        });

        it('should return tableName as value for the selectedEnrollmentsTable field in the return object', () => {
            expect(MappingActions.selectedEnrollmentsTable('tb_service')).toEqual({
                type: 'selectedEnrollmentsTable',
                selectedEnrollmentsTable: 'tb_service'
            });
        });
    });

    describe('selectedEventTable', () => {
        it('should return selectedEventTable as empty on default', () => {
            expect(MappingActions.selectedEventTable()).toEqual({
                type: 'selectedEventTable',
                selectedEventTable: ''
            });
        });

        it('should return tableName as value for the selectedEventTable field in the return object', () => {
            expect(MappingActions.selectedEventTable('tb_service')).toEqual({
                type: 'selectedEventTable',
                selectedEventTable: 'tb_service'
            });
        });
    });

    describe('instanceTableColumns', () => {
        it('should return an empty array', () => {
            expect(MappingActions.instanceTableColumns()).toEqual({
                type: 'selectedInstanceTableColumns',
                selectedInstanceTableColumns: []
            });
        });

        it('should return selected table columns in an array', () => {
            expect(MappingActions.instanceTableColumns(['pat_id', 'pat_name', 'age'])).toEqual({
                type: 'selectedInstanceTableColumns',
                selectedInstanceTableColumns: ['pat_id', 'pat_name', 'age']
            });
        });
    });

    describe('eventTableColumns', () => {
        it('should return an empty array on default', () => {
            expect(MappingActions.eventTableColumns()).toEqual({
                type: 'selectedEventTableColumns',
                selectedEventTableColumns: []
            });
        });

        it('should return selected table columns in an array', () => {
            expect(MappingActions.eventTableColumns(['pat_id', 'pat_name', 'age'])).toEqual({
                type: 'selectedEventTableColumns',
                selectedEventTableColumns: ['pat_id', 'pat_name', 'age']
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

    describe('saveMapping', () => {
        it('should dispatch showMessage with ShouldAddMappingName when mapping name is empty', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Should have Mapping Name",
                responseType: "error"
            }];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                }
            });

            await store.dispatch(MappingActions.saveMappings("", {instance: {}, enrollments: {}}, ""));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch showMessage with ShouldAddMappingName when mapping name has invalid characters', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Should have only letters, numbers and spaces in Mapping Name",
                responseType: "error"
            }];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                }
            });

            await store.dispatch(MappingActions.saveMappings("$%#^", {instance: {}, enrollments: {}}, ""));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch showMessage with AtLeaseOnePatientInstanceColumnShouldHaveMapping when no instance mapping is entered', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Please provide at least one mapping for patient instance",
                responseType: "error"
            }];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: []
            });

            await store.dispatch(MappingActions.saveMappings("Mapping Name", {instance: {}, enrollments: {}}, ""));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch showMessage with AtLeaseOneProgramEnrollmentColumnShouldHaveMapping when no enrollment mapping is entered', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Please select a table for program enrollment",
                responseType: "error"
            }];

            document.body.innerHTML =
                '<div>' +
                '<div class="enrollments">' +
                '<div class="mapping-column-name">pat_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input"/>' +
                '</div>' +
                '</div>' +
                '<div class="instance">' +
                '<div class="mapping-column-name">pat_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="asdfasf"/>' +
                '</div>' +
                '</div>' +
                '</div>';

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: []
            });

            let instanceMappingColumns = document.getElementsByClassName('instance');

            let allMappings = {
                instance: instanceMappingColumns,
            };
            let lookupTable = {
                instance: "instance_lookup_table",
                enrollments: ""
            };
            await store.dispatch(MappingActions.saveMappings("Mapping Name", allMappings, lookupTable));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch showMessage with PleaseProvideAtLeastOneMappingForProgramEvent when no event mapping is entered', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Please provide at least one mapping for program event",
                responseType: "error"
            }];
            document.body.innerHTML =
                '<div>' +
                '<div class="instance">' +
                '<div class="mapping-column-name">pat_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="patIdElementId"/>' +
                '</div>' +
                '</div>' +
                '<div class="enrollments">' +
                '<div class="mapping-column-name">pat_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="patNameElementId"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="events">' +
                '<div class="mapping-column-name">event_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input"/>' +
                '</div>' +
                '</div>' +
                '</div>';
            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: []
            });
            let instanceMappingColumns = document.getElementsByClassName('instance');
            let eventMappingColumns = document.getElementsByClassName('events');
            let allMappings = {
                instance: instanceMappingColumns,
                event: eventMappingColumns
            };
            let lookupTable = {
                instance: "instance_lookup_table",
                enrollments: "enrolment_lookup_table",
                event: ""
            };
            await store.dispatch(MappingActions.saveMappings("Mapping Name", allMappings, lookupTable));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch showMessage with MappingNameShouldBeUnique' +
            ' when mapping name is already registered', async () => {
            let expectedActions = [{
                type: "showMessage",
                responseMessage: "Mapping Name should be unique",
                responseType: "error"
            }];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: ["Mapping Name"]
            });

            document.body.innerHTML =
                '<div>' +
                '<div class="instance">' +
                '<div class="mapping-column-name">pat_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input"/>' +
                '</div>' +
                '</div>' +
                '<div class="enrollments">' +
                '<div class="mapping-column-name">pat_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input"/>' +
                '</div>' +
                '</div>' +
                '</div>';

            document.getElementsByClassName("mapping-input")[0].value = "XdJH67";
            document.getElementsByClassName("mapping-input")[1].value = "LKtyR55";


            let mappings = {
                instance: document.getElementsByClassName("instance"),
                enrollments: document.getElementsByClassName("enrollments")
            };

            await store.dispatch(MappingActions.saveMappings("Mapping Name", mappings, ""));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should dispatch necessary actions on ajax success', async () => {
            let mappingName = "Mapping Name 2";
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: "Successfully Saved Mapping",
                    responseType: "success"
                },
                {
                    type: "currentMapping",
                    mappingName: ""
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        instance: {},
                        enrollments: {},
                        event: {}
                    }
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                },
                {
                    type: "selectedInstanceTable",
                    selectedInstanceTable: ""
                },
                {
                    selectedEnrollmentsTable: "",
                    type: "selectedEnrollmentsTable"
                },
                {
                    selectedEventTable: "",
                    type: "selectedEventTable"
                }
            ];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: ["Mapping Name"],
                currentMapping: "",
                session: {
                    user: "superman"
                }
            });

            document.body.innerHTML =
                '<div>' +
                '<div class="instance">' +
                '<div class="mapping-column-name">pat_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="XdJH67"/>' +
                '</div>' +
                '</div>' +
                '<div class="enrollments">' +
                '<div class="mapping-column-name">pat_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="LKtyR55"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="events">' +
                '<div class="mapping-column-name">event_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="DLR5U8"/>' +
                '</div>' +
                '</div>' +
                '</div>';

            let history = {
                push: () => {
                }
            };

            let sandbox = sinon.createSandbox();
            let pushMock = sandbox.mock(history).expects("push");
            sandbox.stub(Ajax, "instance").returns(ajax);
            let putMock = sandbox.mock(ajax).expects("put")
                .returns(Promise.resolve({data: "Successfully Saved Mapping"}));

            history.push = pushMock;

            let allMappings = {
                instance: document.getElementsByClassName("instance"),
                event: document.getElementsByClassName("events")
            };
            let lookupTable = {
                instance: "selectedInstanceTable",
                enrollments: "selectedEnrollmentsTable",
                event: "selectedEventTable"
            };
            await store.dispatch(MappingActions.saveMappings(mappingName, allMappings, lookupTable, history));

            expect(store.getActions()).toEqual(expectedActions);

            pushMock.verify();
            putMock.verify();
            sandbox.restore();
        });

        it('should dispatch showMessage on ajax call fails', async () => {
            let mappingName = "Mapping Name 2";
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "showMessage",
                    responseMessage: "Could not able to add mapping",
                    responseType: "error"
                }
            ];

            let store = mockStore({
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                },
                allMappingNames: ["Mapping Name"]
            });

            document.body.innerHTML =
                '<div>' +
                '<div class="instance">' +
                '<div class="mapping-column-name">pat_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="XdJH67"/>' +
                '</div>' +
                '</div>' +
                '<div class="enrollments">' +
                '<div class="mapping-column-name">pat_name</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="LKtyR55"/>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="events">' +
                '<div class="mapping-column-name">event_id</div>' +
                '<div class="mapping-data-element">' +
                '<input type="input" class="mapping-input" value="LDW9TY"/>' +
                '</div>' +
                '</div>' +
                '</div>';


            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let putMock = sandbox.mock(ajax).expects("put")
                .returns(Promise.reject({"message": "Could not able to add mapping"}));


            try {
                let allMappings = {
                    instance: document.getElementsByClassName("instance"),
                    event: document.getElementsByClassName("event")
                };
                let lookupTable = {
                    instance: "selectedInstanceTable",
                    enrollments: "selectedEnrollmentsTable",
                    event: "selectedEventTable"
                };
                await store.dispatch(MappingActions.saveMappings(mappingName, allMappings, lookupTable));
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
                .toEqual({type: "currentMapping", mappingName: "new mapping"})
        })
    });

    describe('mappingJson', () => {
        it('should return object with type and mappingJson', () => {
            let mappingJson = {
                instance: {"patient_id": "FH7RTu", "patient_name": "ZS8Srt7"},
                enrollments: { "pat_id": "4RT43" },
                event: {"event_id": "fdkf23"}
            };
            expect(MappingActions.mappingJson(mappingJson))
                .toEqual({type: "mappingJson", mappingJson})
        });

        it('should return object with empty instance, enrollments and events on default', () => {
            let mappingJson = {
                instance: {},
                enrollments: {},
                event: {}
            };

            expect(MappingActions.mappingJson())
                .toEqual({ type: "mappingJson", mappingJson })
        });
    });

    describe('getMapping', () => {
        it('should dispatch mapping details', async () => {
            let ajax = new Ajax();
            let mappingNameToEdit = "HTS Service";
            let tableColumns = ["pat_id", "program_id", "program_status"];
            let eventTableColumns = ["event_id", "patient_name"];
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        instance: {
                            patient_identifier: "fYj7U",
                            patient_name: "ert76HK"
                        },
                        enrollments: {
                            enrollment_id: "fYj7U",
                            patient_name: "ert76HK"
                        },
                        event: {
                            event_id: "fYj7U",
                            patient_name: "ert76HK"
                        }
                    }
                },
                {
                    type: "selectedInstanceTable",
                    selectedInstanceTable: "patient_details"
                },
                {
                    type: "selectedInstanceTableColumns",
                    selectedInstanceTableColumns: tableColumns
                },
                {
                    type: "selectedEnrollmentsTable",
                    selectedEnrollmentsTable: "enroll"
                },
                {
                    type: "selectedEventTable",
                    selectedEventTable: "event_table"
                },
                {
                    type: "selectedEventTableColumns",
                    selectedEventTableColumns: eventTableColumns
                },
                {
                    type: "currentMapping",
                    mappingName: mappingNameToEdit
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let store = mockStore({
                selectedInstanceTable: "",
                selectedEnrollmentsTable: "",
                selectedEventTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let history = {
                push: () => {
                }
            };
            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxMock = sandbox.mock(ajax);
            let ajaxGetMock = ajaxMock
                .expects("get")
                .withArgs("/dhis-integration/api/getMapping", {"mappingName": mappingNameToEdit})
                .returns(Promise.resolve({
                    "mapping_name": "HTS Service",
                    "lookup_table": {
                        "value": '{' +
                            '"instance": "patient_details",' +
                            '"enrollments": "enroll",' +
                            '"event": "event_table"' +
                            '}',
                        "type": "json"
                    },
                    "mapping_json": {
                        "value": '{' +
                            '"instance": {' +
                                '"patient_identifier": "fYj7U",' +
                                '"patient_name": "ert76HK"' +
                            '},' +
                            '"enrollments": {' +
                                '"enrollment_id": "fYj7U",' +
                                '"patient_name": "ert76HK"' +
                            '},' +
                            '"event": {' +
                                '"event_id": "fYj7U",' +
                                '"patient_name": "ert76HK"' +
                            '}' +
                        '}',
                        "type": "json"
                    }
                }));
            let getInstanceColumnsMock = ajaxMock
                .expects("get")
                .withArgs("/dhis-integration/api/getColumns", {tableName: "patient_details"})
                .returns(Promise.resolve(tableColumns));

            let eventColumnsMock = ajaxMock
                .expects("get")
                .withArgs("/dhis-integration/api/getColumns", {tableName: "event_table"})
                .returns(Promise.resolve(eventTableColumns));

            let pushMock = sandbox.mock(history).expects("push")
                .withArgs("/dhis-integration/mapping/edit/"+mappingNameToEdit);
            history.push = pushMock;

            await store.dispatch(MappingActions.getMapping(mappingNameToEdit, history));

            expect(store.getActions()).toEqual(expectedActions);

            ajaxGetMock.verify();
            getInstanceColumnsMock.verify();
            eventColumnsMock.verify();
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
                selectedInstanceTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/api/getMapping", {"mappingName": "some name"})
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
                    hideSpinner: false
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
                selectedInstanceTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/api/getMappingNames")
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
                selectedInstanceTable: "",
                currentMapping: "",
                mappingJson: {}
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/api/getMappingNames")
                .returns(Promise.reject({
                    message: "Could not get mappings"
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
        it('should get all columns of the given table and dispatch instance actions when category is instance', async () => {
            let tableName = "pat_details";
            let tableColumns = ["pat_id", "pat_name"];
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        instance: {},
                        enrollments: {},
                        event: {}
                    }
                },
                {
                    type: "selectedInstanceTable",
                    selectedInstanceTable: tableName
                },
                {
                    type: "selectedInstanceTableColumns",
                    selectedInstanceTableColumns: tableColumns
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
            sandbox.mock(ajax)
                .expects("get")
                .withExactArgs("/dhis-integration/api/getColumns", { tableName })
                .returns(Promise.resolve(tableColumns));

            await store.dispatch(MappingActions.getTableColumns(tableName, "instance"));

            expect(store.getActions()).toEqual(expectedActions);
            sandbox.restore();
        });

        it('should get all columns of the given table and dispatch enrollments actions when category is enrollments', async () => {
            let tableName = "pat_details";
            let tableColumns = ["pat_id", "pat_name"];
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        instance: {},
                        enrollments: {},
                        event: {}
                    }
                },
                {
                    type: "selectedEnrollmentsTable",
                    selectedEnrollmentsTable: tableName
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
            sandbox.mock(ajax)
                .expects("get")
                .withExactArgs("/dhis-integration/api/getColumns", { tableName })
                .returns(Promise.resolve(tableColumns));

            await store.dispatch(MappingActions.getTableColumns(tableName, "enrollments"));

            expect(store.getActions()).toEqual(expectedActions);
            sandbox.restore();
        });

        it('should get all columns of the given table and dispatch event actions when category is event', async () => {
            let tableName = "pat_details";
            let tableColumns = ["pat_id", "pat_name"];
            let ajax = new Ajax();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "mappingJson",
                    mappingJson: {
                        instance: {},
                        enrollments: {},
                        event: {}
                    }
                },
                {
                    type: "selectedEventTable",
                    selectedEventTable: tableName
                },
                {
                    type: "selectedEventTableColumns",
                    selectedEventTableColumns: tableColumns
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
            sandbox.mock(ajax)
                .expects("get")
                .withExactArgs("/dhis-integration/api/getColumns", { tableName })
                .returns(Promise.resolve(tableColumns));

            await store.dispatch(MappingActions.getTableColumns(tableName, "events"));

            expect(store.getActions()).toEqual(expectedActions);
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
                selectedInstanceTable: ""
            });

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/api/getColumns")
                .returns(Promise.reject({
                    message: "Could not get table columns"
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

    describe("getTables", () => {
       it("should dispatch tables on ajax success", async() => {
           let tables = ["patient_identifier", "patient_allergy_view"];
           let ajax = Ajax.instance();
           let expectedActions = [
               {
                   type: "hideSpinner",
                   hideSpinner: false
               },
               {
                   type: "allTables",
                   allTables: tables
               },
               {
                   type: "hideSpinner",
                   hideSpinner: true
               }
           ];

           let sandbox = sinon.createSandbox();
           sandbox.stub(Ajax, "instance").returns(ajax);
           let ajaxGetMock = sandbox.mock(ajax)
               .expects("get")
               .withArgs("/dhis-integration/api/getTables")
               .returns(Promise.resolve(tables));

           let store = mockStore({
               allTables: [],
               hideSpinner: false
           });

           await store.dispatch(MappingActions.getTables());
           expect(store.getActions()).toEqual(expectedActions);
           ajaxGetMock.verify();
           sandbox.restore();
       });

        it("should dispatch tables on ajax success", async() => {
            let ajax = Ajax.instance();
            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: "Could not get tables to select",
                    responseType: "error"
                },
                {
                    type: "allTables",
                    allTables: []
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxGetMock = sandbox.mock(ajax)
                .expects("get")
                .withArgs("/dhis-integration/api/getTables")
                .returns(Promise.reject({}));

            let store = mockStore({
                allTables: [],
                hideSpinner: false
            });

            try {
                await store.dispatch(MappingActions.getTables());
            } catch(e) {
                expect(store.getActions()).toEqual(expectedActions);
                ajaxGetMock.verify();
            } finally {
                sandbox.restore();
            }
        });
    });

    describe('exportMapping', function () {
        it('should return array of mapping object on ajax success', () => {
            let mappingName = "HTS Service";
            let responseJson = {
                "mapping_name": mappingName,
                "lookup_table": {
                    "value": '{' +
                        '"instance": "patient_details",' +
                        '"enrollments": "enroll",' +
                        '"event": "event_table"' +
                        '}',
                    "type": "json"
                },
                "mapping_json": {
                    "value": '{' +
                        '"instance": {' +
                        '"patient_identifier": "fYj7U",' +
                        '"patient_name": "ert76HK"' +
                        '},' +
                        '"enrollments": {' +
                        '"enrollment_id": "fYj7U",' +
                        '"patient_name": "ert76HK"' +
                        '},' +
                        '"event": {' +
                        '"event_id": "fYj7U",' +
                        '"patient_name": "ert76HK"' +
                        '}' +
                        '}',
                    "type": "json"
                }
            };
            let dispatchMock = jest.fn();
            let ajax = Ajax.instance();
            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxMock = sandbox.mock(ajax);
            let ajaxGetMock = ajaxMock
                .expects("get")
                .withArgs("/dhis-integration/api/getMapping", {"mappingName": mappingName})
                .returns(Promise.resolve(responseJson));

            MappingActions.exportMapping(mappingName, dispatchMock);

            ajaxGetMock.verify();
            sandbox.restore();
        });

        it('should call showMessage on ajax fail', () => {
            let mappingName = "HTS Service";
            let dispatchMock = jest.fn();
            let ajax = Ajax.instance();
            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxMock = sandbox.mock(ajax);
            let ajaxGetMock = ajaxMock
                .expects("get")
                .withArgs("/dhis-integration/api/getMapping", {"mappingName": mappingName})
                .returns(Promise.reject({ message: 'Could not get mapping info' }));
            let actionsMock = sandbox.mock(Actions);
            let showMsgMock = actionsMock.expects('showMessage')
                .withArgs("Could not get mapping info", "error");

            try {
                MappingActions.exportMapping(mappingName, dispatchMock);
            } catch (e) {
                ajaxGetMock.verify();
                showMsgMock.verify();
            }
            sandbox.restore();
        });
    });
});
