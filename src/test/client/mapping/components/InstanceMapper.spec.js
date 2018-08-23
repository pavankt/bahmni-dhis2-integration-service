import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import InstanceMapper from "../../../../main/client/mapping/components/InstanceMapper";

configure({adapter: new Adapter()});

describe('InstanceMapper', function () {
    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            selectedInstanceTable: "patient_details",
            allTables:[],
            selectedInstanceTableColumns: [],
            mappingJson: {
                instance:{},
                enrollments:{}
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <InstanceMapper
              dispatch={()=>{}}
            />
          </Provider>
        );
    });


    it('should render ColumnMapping component when selectedInstanceTable have value', () => {
        expect(rendered.find('.mapping-table-div')).toHaveLength(1);
    });

    it('should render DisplayColumns', () => {

        expect(rendered.find('.tables-list')).toHaveLength(1);
    });

});