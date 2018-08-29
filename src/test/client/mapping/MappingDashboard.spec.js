import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {render, configure, mount} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import MappingDashboard from '../../../main/client/mapping/MappingDashboard';
import * as MappingActions from '../../../main/client/mapping/actions/MappingActions';

configure({adapter: new Adapter()});

describe('Mapping dashboard', function () {

    let rendered, store;

    beforeEach(() => {
        store = createStore(() => ({
            allMappingNames: ['HTS Service','TB Service'],
            hideSpinner: false,
            showMessage : {
                responseMessage : "",
                responseType: ""
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <MappingDashboard
              dispatch={() => {
                }}
              history={{}}
            />
          </Provider>
        );
    });

    it('should have a "mapping-names-table" table', function () {
        expect(rendered.find('.mapping-names-table')).toHaveLength(1);
    });

    it('should have a "add-mapping-button" button', function () {
        expect(rendered.find('.add-mapping-button')).toHaveLength(1);
    });

    it('should have two elements with class name "mapping-name"', function () {
        expect(rendered.find('.mapping-name')).toHaveLength(2);
    });

    it('should have two elements with class name "edit-mapping-button"', function () {
        expect(rendered.find('.edit-mapping-button')).toHaveLength(2);
    });

    it('should have a section header with class name "section-title" button', function () {
        expect(rendered.find('.edit-mapping-button')).toHaveLength(2);
    });

    it('should dispatch getMappings on edit click', () => {
        let history = {};
        let sandbox = sinon.createSandbox();
        let mappingMock = sandbox.mock(MappingActions)
            .expects("getMapping")
            .withArgs("HTS Service", history)
            .returns({ type: '' });

        rendered = mount(
          <Provider store={store}>
            <MappingDashboard
              dispatch={() => {}}
              history={history}
            />
          </Provider>
        );

        rendered.find('.edit-button').first().simulate('click');

        mappingMock.verify();
        sandbox.restore();
    });

    it('should call history push on redirect to addEditMapping', () => {
        let history = {
            push : () => {}
        };
        let sandbox = sinon.createSandbox();
        let pushMock = sandbox.mock(history)
            .expects("push")
            .withArgs("/dhis-integration/mapping/new");

        history.push = pushMock;

        rendered = mount(
          <Provider store={store}>
            <MappingDashboard
              dispatch={() => {}}
              history={history}
            />
          </Provider>
        );

        rendered.find('.add-mapping-button').first().simulate('click');

        pushMock.verify();
        sandbox.restore();
    });
});