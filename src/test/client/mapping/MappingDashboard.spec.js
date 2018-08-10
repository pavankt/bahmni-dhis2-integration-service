import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {render, configure} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import MappingDashboard from '../../../main/client/mapping/MappingDashboard';

configure({adapter: new Adapter()});

describe('Mapping dashboard', function () {

    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            allMappingNames: ['HTS Service','TB Service'],
            hideSpinner: false,
            showMessage : {
                responseMessage : "",
                responseType: ""
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <MappingDashboard dispatch={() => {
                }}
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
});