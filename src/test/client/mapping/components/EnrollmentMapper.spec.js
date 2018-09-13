import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import EnrollmentMapper from "../../../../main/client/mapping/components/EnrollmentMapper";

configure({adapter: new Adapter()});

describe('EnrollmentMapper', function () {
    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            selectedEnrollmentsTable: "patient_details",
            allTables:[],
            selectedEnrollmentTableColumns: [],
            mappingJson: {
                instance:{},
                enrollments:{}
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <EnrollmentMapper />
          </Provider>
        );
    });


    it('should render ColumnMapping component when selectedEnrollmentTable have value', () => {
        expect(rendered.find('.mapping-table-div')).toHaveLength(1);
    });

    it('should render DisplayColumns', () => {
        expect(rendered.find('.tables-list')).toHaveLength(1);
    });

    it('should have an input box with class name table-input', ()=> {
        expect(rendered.find('.table-input')).toHaveLength(1);
    });

    it('should have a span with class name Enrollment-table-span', ()=> {
        expect(rendered.find('.enrollment-table-span')).toHaveLength(1);
    });
});