import 'jsdom-global/register';
import React from 'react';
import {
    render, configure, mount
} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import sinon from 'sinon';
import App from "../../main/client/App";
import * as Actions from '../../main/client/common/Actions';

configure({ adapter: new Adapter() });


describe('App', () => {
    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            hideSpinner : false,
            privileges: ["app:dhis2sync:mapping", "app:dhis2sync:log", "app:dhis2sync:upload"]
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Router>
            <Provider store={store}>
              <App dispatch={() => {}} />
            </Provider>
          </Router>
        );
    });

    it('should have app-link className', function () {
        expect(rendered.find('.app-link')).toHaveLength(1);
    });

    it('should have mapping-link className', function () {
        expect(rendered.find('.mapping-link')).toHaveLength(1);
    });

    it('should have fa-map-signs className', function () {
        expect(rendered.find('.fa-map-signs')).toHaveLength(1);
    });

    it('should have sync-link className', function () {
        expect(rendered.find('.sync-link')).toHaveLength(1);
    });

    it('should have fa-upload className', function () {
        expect(rendered.find('.fa-upload')).toHaveLength(1);
    });

    it('should have log-link className', function () {
        expect(rendered.find('.log-link')).toHaveLength(1);
    });

    it('should have fa-book className', function () {
        expect(rendered.find('.fa-book')).toHaveLength(1);
    });

    it('should have overlay className when hideSpinner is false', () => {
        expect(rendered.find('.overlay')).toHaveLength(1);
    });

    it('should not have overlay className when hideSpinner is true', () => {
        const store = createStore(() => ({
            hideSpinner : true,
            privileges: ["app:dhis2sync:mapping", "app:dhis2sync:log", "app:dhis2sync:upload"]
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Router>
            <Provider store={store}>
              <App dispatch={() => {}} />
            </Provider>
          </Router>
        );

        expect(rendered.find('.overlay')).toHaveLength(0);
    });

    it('should dispatch hideSpinner', () => {
        const store = createStore(() => ({
            hideSpinner : true,
            privileges: ["app:dhis2sync:mapping", "app:dhis2sync:log", "app:dhis2sync:upload"]
        }), applyMiddleware(thunkMiddleware));

        let sandbox = sinon.createSandbox();

        const spinner = sandbox.mock(Actions);

        let spinnerFalse = spinner.expects('hideSpinner')
            .withArgs(false)
            .returns({ type: '' });

        let spinnerTrue = spinner.expects('hideSpinner')
            .returns({ type: '' });

        mount(
          <Router>
            <Provider store={store}>
              <App dispatch={() => {}} />
            </Provider>
          </Router>
        );

        spinnerFalse.verify();
        spinnerTrue.verify();
        sandbox.restore();
    });
});
