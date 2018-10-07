import 'jsdom-global/register';
import React from 'react';
import {
    configure, mount, render
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import LogNavigation from "../../../../main/client/log/components/LogNavigation";
import * as LogActions from "../../../../main/client/log/actions/LogActions";

configure({ adapter: new Adapter() });

describe("LogNavigation", () => {
    let rendered, store;

    beforeEach(() => {
        store = createStore(() => ({
            filters: {
                service: '',
                user: ''
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <LogNavigation dispatch={() => {}} />
            </Provider>
        );
    });

    it('should have log-table-buttons class name', () => {
        expect(rendered.find('.log-table-buttons')).toHaveLength(1);
    });

    it('should have prev-page class name', () => {
        expect(rendered.find('.prev-page')).toHaveLength(1);
    });

    it('should have fa-chevron-left class name', () => {
        expect(rendered.find('.fa-chevron-left')).toHaveLength(1);
    });

    it('should have next-page class name', () => {
        expect(rendered.find('.next-page')).toHaveLength(1);
    });

    it('should have fa-chevron-right class name', () => {
        expect(rendered.find('.fa-chevron-right')).toHaveLength(1);
    });

    it('should dispatch getPrevPageLogs on prev-page button click', function () {
        let sandbox = sinon.createSandbox();

        let prevPageMock = sandbox.mock(LogActions).expects('getPrevPageLogs')
            .withArgs('', '').returns({ type: '' });

        store = createStore(() => ({
            filters: {
                service: '',
                user: ''
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = mount(
            <Provider store={store}>
                <LogNavigation dispatch={() => {}} />
            </Provider>
        );

        rendered.find('.prev-page').first().simulate('click');

        prevPageMock.verify();
        sandbox.restore();
    });

    it('should dispatch getNextPageLogs on next-page button click', function () {
        let sandbox = sinon.createSandbox();

        let nextPageMock = sandbox.mock(LogActions).expects('getNextPageLogs')
            .withArgs('', '').returns({ type: '' });

        store = createStore(() => ({
            filters: {
                service: '',
                user: ''
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = mount(
            <Provider store={store}>
                <LogNavigation dispatch={() => {}} />
            </Provider>
        );

        rendered.find('.next-page').first().simulate('click');

        nextPageMock.verify();
        sandbox.restore();
    });
});