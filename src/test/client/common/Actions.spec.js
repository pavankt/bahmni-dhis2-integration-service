import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import {hideSpinner,
    showHome,
    showMessage,
    privileges,
    getPrivileges
} from '../../../main/client/common/Actions';
import Ajax from '../../../main/client/common/Ajax';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
describe('Actions', () => {
    describe('HideSpinnerAction', () => {
        it('should return hideSpinner value as true as default', () => {
            const expected = {
                type: "hideSpinner",
                hideSpinner: true
            };
            let result = hideSpinner();
            expect(expected).toEqual(result);
        });

        it('should return given value as hideSpinner value', () => {
            const expected = {
                type: "hideSpinner",
                hideSpinner: false
            };
            let result = hideSpinner(false);
            expect(expected).toEqual(result);
        })
    });

    describe('showMessage', () => {
        it('should return empty message and type on default', () => {
           const expected = {
               type: "showMessage",
               responseMessage: "",
               responseType: ""
           };

           expect(expected).toEqual(showMessage())
        });

        it('should return object with given message and type on default', () => {
           const expected = {
               type: "showMessage",
               responseMessage: "test message",
               responseType: "error"
           };

           expect(expected).toEqual(showMessage("test message", "error"));
        });
    });

    describe('showHomeAction', () => {
        it('should return showHome value as true as default', () => {
            const expected = {
                type: "showHome",
                show: true
            };
            let result = showHome();
            expect(expected).toEqual(result);
        });

        it('should return given value as showHome value', () => {
            const expected = {
                type: "showHome",
                show: false
            };
            let result = showHome(false);
            expect(expected).toEqual(result);
        })
    });

    describe('privileges', () => {
        it('should return empty privileges as default', () => {
            const expected = {
                type: "privileges",
                privileges: []
            };
            let result = privileges();
            expect(expected).toEqual(result);
        });

        it('should return given value as showHome value', () => {
            const expected = {
                type: "privileges",
                privileges : ["dhis2:mapping"]
            };
            let result = privileges(["dhis2:mapping"]);
            expect(expected).toEqual(result);
        })
    });

    describe('getPrivileges', () => {
        it('should dispatch privileges when response has privileges', async () => {
            let sandbox = sinon.createSandbox();
            let ajax = new Ajax();
            let store = mockStore({
                hideSpinner: true,
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                }
            });
            let privileges = ["dhis2:mapping", "dhis2:log"];
            sandbox.stub(Ajax, "instance").returns(ajax);
            let privilegesMock = sandbox.mock(ajax).expects("get")
                .withArgs('/dhis-integration/api/session')
                .returns(Promise.resolve(privileges));

            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "privileges",
                    privileges
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            await store.dispatch(getPrivileges());

            expect(store.getActions()).toEqual(expectedActions);

            privilegesMock.verify();

            sandbox.restore();
        });

        it('should dispatch show message with no permissions when response has no privileges', async () => {
            let sandbox = sinon.createSandbox();
            let ajax = new Ajax();
            let store = mockStore({
                hideSpinner: true,
                showMessage: {
                    responseMessage: "",
                    responseType: ""
                }
            });
            let privileges = ["app:dhis2sync"];
            sandbox.stub(Ajax, "instance").returns(ajax);
            let privilegesMock = sandbox.mock(ajax).expects("get")
                .withArgs('/dhis-integration/api/session')
                .returns(Promise.resolve(privileges));

            let expectedActions = [
                {
                    type: "hideSpinner",
                    hideSpinner: false
                },
                {
                    type: "showMessage",
                    responseMessage: "You do not have permissions assigned. Contact admin to assign privileges for your user",
                    responseType: "error"
                },
                {
                    type: "hideSpinner",
                    hideSpinner: true
                }
            ];

            await store.dispatch(getPrivileges());

            expect(store.getActions()).toEqual(expectedActions);

            privilegesMock.verify();

            sandbox.restore();
        });
    });
});
