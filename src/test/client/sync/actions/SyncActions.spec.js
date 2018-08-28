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

        it('should dispatch success message after an ajax call', async () => {
            let ajax = new Ajax();
            let mappingName = "HTS Service";
            let expectedActions = [
                {"hideSpinner": false, "type": "hideSpinner"},
                {"responseMessage": "Sync started for HTS Service", "responseType": "success", "type": "showMessage"},
                {"hideSpinner": true, "type": "hideSpinner"}
            ];

            let store = mockStore({});

            let sandbox = sinon.createSandbox();
            sandbox.stub(Ajax, "instance").returns(ajax);
            let ajaxMock = sandbox.mock(ajax);
            let ajaxGetMock = ajaxMock
                .expects("put")
                .withArgs(sync.URI + mappingName);

            await store.dispatch(SyncActions.syncData(mappingName));

            expect(store.getActions()).toEqual(expectedActions);

            ajaxGetMock.verify();
            sandbox.restore();
        });
    });
});
