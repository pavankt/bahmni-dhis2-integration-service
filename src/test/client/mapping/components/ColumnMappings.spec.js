import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {
    render, configure, mount
} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import ColumnMappings from '../../../../main/client/mapping/components/ColumnMappings';
import sinon from 'sinon';
import * as MappingActions from '../../../../main/client/mapping/actions/MappingActions';

configure({adapter: new Adapter()});


describe('ColumnMappings', () => {
    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            selectedTable: 'patient_identifier',
            selectedTableColumns: ['pat_id', 'pat_name'],
            mappingJson: {}
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <ColumnMappings dispatch={() => {
                }}
            />
          </Provider>
        );
    });

    it('should have table element with two children', function () {
        expect(rendered.find('.mapping-table')).toHaveLength(1);
        expect(rendered.find('.mapping-column-name')).toHaveLength(2);
    });

    it('should have table headers ', () => {
        let tableHeader = rendered.find('tr')[0];
        let tableHeaderFirstElement = tableHeader.children[0];
        let tableHeaderSecondElement = tableHeader.children[1];
        expect(tableHeaderFirstElement.children[0].data).toEqual('Bahmni Data Point');
        expect(tableHeaderSecondElement.children[0].data).toEqual('DHIS2 Data Element ID');
    });

    it('should have column name as table data', () => {
        const firstRow = rendered.find('tr')[1];
        const secondRow = rendered.find('tr')[2];
        const firstRowFirstElement = firstRow.children[0];
        const secondRowFirstElement = secondRow.children[0];

        expect(firstRowFirstElement.children[0].data).toEqual('pat_id');
        expect(secondRowFirstElement.children[0].data).toEqual('pat_name');
    });

    it('should have section tag and column-mapping-section className', () => {
        expect(rendered.find('section')).toHaveLength(1);
        expect(rendered.find('.column-mapping-section')).toHaveLength(1);
    });

    it('should call getTableColumns on did mount', () => {
        let sandbox = sinon.createSandbox();

        let tableColumns = sandbox.mock(MappingActions).expects("getTableColumns")
            .returns({ type: '' });

        const store = createStore(() => ({
            selectedTable: 'patient_identifier',
            selectedTableColumns: ['pat_id', 'pat_name'],
            mappingJson: {
                pat_id: "dhI8Ye",
                pat_name: "t6RT6Q"
            }
        }), applyMiddleware(thunkMiddleware));

        rendered = mount(
            <Provider store={store}>
                <ColumnMappings dispatch={() => {
                }}
                />
            </Provider>
        );

        tableColumns.verify();
        sandbox.restore();
    })
});
