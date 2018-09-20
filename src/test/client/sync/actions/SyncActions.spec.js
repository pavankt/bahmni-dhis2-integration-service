import 'jsdom-global/register';
import 'jsdom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as SyncActions from '../../../../main/client/sync/actions/SyncActions';
import Ajax from "../../../../main/client/common/Ajax";
import {sync} from "../../../../main/client/common/constants";

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('#syncActions', () => {

    describe('#syncData', () => {

        it.only('should dispatch success message after an ajax call', async () => {
            let ajax = new Ajax();
            let mappingName = "HTS Service";
            let user = "admin";
            let expectedActions = [
                {"responseMessage": "Sync started for HTS Service", "responseType": "success", "type": "showMessage"}
            ];

            let store = mockStore({});

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxMock = sandbox.mock(ajax);
            let ajaxPutMock = ajaxMock
                .expects("put")
                .withArgs(sync.URI + '?service=' + mappingName + '&user=' + user);

            await store.dispatch(SyncActions.syncData(mappingName, user));

            expect(store.getActions()).toEqual(expectedActions);

            ajaxPutMock.verify();
            sandbox.restore();
        });
    });
});
