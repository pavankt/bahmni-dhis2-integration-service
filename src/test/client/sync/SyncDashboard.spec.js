import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, mount, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import SyncDashboard from '../../../main/client/sync/SyncDashboard';
import * as SyncActions from '../../../main/client/sync/actions/SyncActions';

configure({adapter: new Adapter()});

describe('Sync dashboard', function () {

    let rendered, store;

    beforeEach(() => {
        store = createStore(() => ({
            allMappingNames: ['HTS Service', 'TB Service'],
            hideSpinner: false,
            showMessage : {
                responseMessage : "",
                responseType: ""
            },
            session: `{user: 'admin', privileges: []}`
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <SyncDashboard
              dispatch={() => {
                    }}
              history={{}}
            />
          </Provider>
        );
    });

    it('should have a "service-names-table" table', function () {
        expect(rendered.find('.service-names-table')).toHaveLength(1);
    });

    it('should have two elements with class name "mapping-name"', function () {
        expect(rendered.find('.mapping-name')).toHaveLength(2);
    });

    it('should have two elements with class name "sync-comment"', function () {
        expect(rendered.find('.sync-comment')).toHaveLength(2);
    });

    it('should have two elements with class name "edit-mapping-button"', function () {
        expect(rendered.find('.edit-mapping-button')).toHaveLength(2);
    });

    it('should have a section header with class name "section-title" button', function () {
        expect(rendered.find('.section-title')).toHaveLength(1);
    });

    it('should have a section header with class name "title-name" button', function () {
        expect(rendered.find('.title-name')).toHaveLength(1);
    });

    it('should have a section header with class name "title-comments" button', function () {
        expect(rendered.find('.title-comments')).toHaveLength(1);
    });

    it('should dispatch sendData on send-button click', () => {
        let history = {};
        let sandbox = sinon.createSandbox();
        let syncMock = sandbox.mock(SyncActions)
            .expects("syncData")
            .withArgs("HTS Service")
            .returns({ type: '' });

        rendered = mount(
          <Provider store={store}>
            <SyncDashboard
              dispatch={() => {}}
              history={history}
            />
          </Provider>
        );

        rendered.find('.send-button').first().simulate('click');

        syncMock.verify();
        sandbox.restore();
    });
});