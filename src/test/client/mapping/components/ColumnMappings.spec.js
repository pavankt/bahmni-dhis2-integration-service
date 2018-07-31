import React from 'react';
import ColumnMappings from '../../../../../src/main/client/mapping/components/ColumnMappings';
import thunkMiddleware from 'redux-thunk';
import {shallow, mount, render, configure} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


describe('ColumnMappings', function () {

    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            "selectedTable": "patient_identifier",
            "selectedTableColumns": ["pat_id", "pat_name"]
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <ColumnMappings dispatch={() => {
                }}/>
            </Provider>
        );
    });

    it('should have table element with two children', function () {
        expect(rendered.find('.column-mapping')).toHaveLength(1);
        expect(rendered.find('.DHIS2Element')).toHaveLength(2);
    });

    it('should have table headers ', () => {
        let tableHeader = rendered.find('tr')[0];
        let tableHeaderFirstElement = tableHeader.children[0];
        let tableHeaderSecondElement = tableHeader.children[1];
        expect(tableHeaderFirstElement.children[0].data).toEqual('Bahmni Data Column');
        expect(tableHeaderSecondElement.children[0].data).toEqual('DHIS2 Data Element ID');
    });

    it('should have column name as table data', function () {
        let firstRow = rendered.find('tr')[1];
        let secondRow = rendered.find('tr')[2];
        let firstRowFirstElement = firstRow.children[0];
        let secondRowFirstElement = secondRow.children[0];

        expect(firstRowFirstElement.children[0].data).toEqual('pat_id');
        expect(secondRowFirstElement.children[0].data).toEqual('pat_name');
    });
});
