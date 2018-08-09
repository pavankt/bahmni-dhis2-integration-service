import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../../main/client/common/Message';

configure({adapter: new Adapter()});

describe('Message', () => {
    it('should have error-msg class name when responseType is error', () => {
        let store = createStore(() => ({
            showMessage : {
                responseMessage : "message",
                responseType : "error"
            }
        }), applyMiddleware(thunkMiddleware));

        let renderer = render(
          <Provider store={store}>
            <Message dispatch={() => {}} />
          </Provider>
        );

        expect(renderer.find('.error-msg')).toHaveLength(1);
        expect(renderer.find('.success-msg')).toHaveLength(0);
    });

    it('should have success-msg class name when responseType is success', () => {
        let store = createStore(() => ({
            showMessage : {
                responseMessage : "message",
                responseType : "success"
            }
        }), applyMiddleware(thunkMiddleware));

        let renderer = render(
          <Provider store={store}>
            <Message dispatch={() => {}} />
          </Provider>
        );

        expect(renderer.find('.error-msg')).toHaveLength(0);
        expect(renderer.find('.success-msg')).toHaveLength(1);
    })
});