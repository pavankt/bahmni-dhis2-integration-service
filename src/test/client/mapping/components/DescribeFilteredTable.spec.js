import 'jsdom-global/register';
import React from 'react';
import DescribeFilteredTable from '../../../../main/client/mapping/components/DescribeFilteredTable';
import thunkMiddleware from 'redux-thunk';
import {render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from "enzyme/build/index";

configure({adapter: new Adapter()});

describe('DescribeFilteredTable', function () {

    let rendered;

    it('should render only ColumnMapping component when selectedTable have value', () => {
        const store = createStore(() => ({
            "selectedTable": "patient_identifier",
            "allTables": [
                "patient_identifier",
                "hiv_self_testing",
                "bed_patient_assignment_default",
                "patient_encounter_details_default",
                "patient_allergy_status_default"
            ],
            "selectedTableColumns": [
                "id",
                "name"
            ]
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <DescribeFilteredTable dispatch={() => {
                }}/>
            </Provider>
        );

        expect(rendered.find('.column-mapping')).toHaveLength(1);
        expect(rendered.find('.tables-list')).toHaveLength(0);
    });

    it('should render only Filtered component when selectedTable is empty', () => {
        const store = createStore(() => ({
            "selectedTable": "",
            "allTables": [
                "patient_identifier",
                "hiv_self_testing",
                "bed_patient_assignment_default",
                "patient_encounter_details_default",
                "patient_allergy_status_default"
            ],
            "selectedTableColumns": [
                "id",
                "name"
            ],
            "filteredTables": []
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <DescribeFilteredTable dispatch={() => {
                }}/>
            </Provider>
        );

        expect(rendered.find('.column-mapping')).toHaveLength(0);
        expect(rendered.find('.tables-list')).toHaveLength(1);
    });

    it('should have an input element', () => {
        const store = createStore(() => ({
            "selectedTable": "",
            "allTables": [
                "patient_identifier",
                "hiv_self_testing",
                "bed_patient_assignment_default",
                "patient_encounter_details_default",
                "patient_allergy_status_default"
            ],
            "selectedTableColumns": [
                "id",
                "name"
            ],
            "filteredTables": []
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <DescribeFilteredTable dispatch={() => {
                }}/>
            </Provider>
        );
        expect(rendered.find('input')).toHaveLength(1);
    });
});