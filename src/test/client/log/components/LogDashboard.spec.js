import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import LogDashboard from "../../../../main/client/log/components/LogDashboard";

configure({adapter: new Adapter()});

describe('LogDashboard', function () {
    let rendered;
    let store;

    beforeEach(() => {
        store = createStore(() => ({
            noEventsToDisplay: true,
            logs: [],
            filters: {
                date: '',
                service: '',
                user: ''
            },
            showMessage: {
                responseMessage: '',
                responseType: ''
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <LogDashboard />
            </Provider>
        );
    });

    it('should have filters class name for log filters', function () {
        expect(rendered.find('.filters')).toHaveLength(1)
    });

    it('should have log-table-page class name for log table', function () {
        expect(rendered.find('.log-table-page')).toHaveLength(1)
    });

    it('should have log-navigation class name for log navigation', function () {
        expect(rendered.find('.log-navigation')).toHaveLength(1)
    });

    it('should have no-events class name when noEvents from store is true', function () {
        expect(rendered.find('.no-events')).toHaveLength(1)
    });

    it('should not have no-events class name when noEvents from store is false', function () {
        store = createStore(() => ({
            noEventsToDisplay: false,
            logs: [],
            filters: {
                date: '',
                service: '',
                user: ''
            },
            showMessage: {
                responseMessage: '',
                responseType: ''
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <LogDashboard />
            </Provider>
        );
        expect(rendered.find('.no-events')).toHaveLength(0)
    });
});