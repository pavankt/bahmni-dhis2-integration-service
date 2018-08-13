import 'jsdom-global/register';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {configure, render} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import DescribeFilteredTable from '../../../../main/client/mapping/components/DescribeFilteredTable';

configure({adapter: new Adapter()});

describe('DescribeFilteredTable', () => {

    it('should render only ColumnMapping component when selectedTable have value', () => {
        const store = createStore(() => ({
            selectedTable: 'patient_identifier',
            allTables: [
                'patient_identifier',
                'hiv_self_testing',
                'bed_patient_assignment_default',
                'patient_encounter_details_default',
                'patient_allergy_status_default'
            ],
            selectedTableColumns: [
                'id',
                'name'
            ],
            showMessage: {
                responseMessage: "",
                responseType: ""
            },
            currentMapping: ""
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
          <Provider store={store}>
            <DescribeFilteredTable
              dispatch={() => {
                }}
              history={{}}
            />
          </Provider>
        );

        let rendered = getDescribeRenderer("pat_identifier");
        expect(rendered.find('.mapping-table-div')).toHaveLength(1);
        expect(rendered.find('.tables-list')).toHaveLength(0);
    });

    it('should render only Filtered component when selectedTable is empty', () => {
        let describeRenderer = getDescribeRenderer();

        expect(describeRenderer.find('.mapping-table-div')).toHaveLength(0);
        expect(describeRenderer.find('.tables-list')).toHaveLength(1);
    });

    it('should have an 2 input element', () => {
        let describeRenderer = getDescribeRenderer();
        expect(describeRenderer.find('input')).toHaveLength(2);
    });

    it('should have a footer and cancel className', () => {
        let describeRenderer = getDescribeRenderer();
        expect(describeRenderer.find('.footer')).toHaveLength(1);
        expect(describeRenderer.find('.cancel')).toHaveLength(1);
        expect(describeRenderer.find('.save')).toHaveLength(0);
    });

    it('should have a save className when there is selected table', () => {
        let describeRenderer = getDescribeRenderer("program");
        expect(describeRenderer.find('.footer')).toHaveLength(1);
        expect(describeRenderer.find('.cancel')).toHaveLength(1);
        expect(describeRenderer.find('.save')).toHaveLength(1);
    });

    it('should not have overlay className when hideSpinner is true', () => {
        let describeRenderer = getDescribeRenderer();
        expect(describeRenderer.find('.overlay')).toHaveLength(0);
    });

    it('should have overlay className when hideSpinner is false', () => {
        let describeRenderer = getDescribeRenderer("", false);
        expect(describeRenderer.find('.overlay')).toHaveLength(1);
    });

    //TODO : Intentionally commented - No problem with test cases has to fix fetch in componentDidMount

    // it('should call push on history on cancel click', () => {
    //     let sandbox = sinon.createSandbox();
    //     let history = {
    //         push: () => {}
    //     };
    //     let pushMock = sandbox.mock(history).expects("push")
    //         .withArgs('/mapping');
    //     let mappingActions = sandbox.mock(MappingActions);
    //     let selectedTable = mappingActions.expects("selectedTable")
    //         .returns({ type: "" });
    //     let filteredTables = mappingActions.expects("filteredTables")
    //         .returns({ type: "" });
    //
    //     history.push = pushMock;
    //
    //     let describeRenderer = getDescribeMount(history);
    //     describeRenderer.find('.cancel').first().simulate('click');
    //
    //     pushMock.verify();
    //     selectedTable.verify();
    //     filteredTables.verify();
    //     sandbox.restore();
    // });

    //TODO : Intentionally commented - No problem with test cases has to fix fetch in componentDidMount

    // it('should call dispatch saveMapping on save click', () => {
    //     let sandbox = sinon.createSandbox();
    //     let mappingActions = sandbox.mock(MappingActions);
    //     let docMock = sandbox.mock(document).expects("getElementsByClassName")
    //         .withArgs("mapping-row");
    //
    //     let saveMappingMock = mappingActions.expects("saveMappings").returns({ type: "" });
    //
    //     let describeRenderer = getDescribeMount();
    //     describeRenderer.find('.save').first().simulate('click');
    //
    //     docMock.verify();
    //     saveMappingMock.verify();
    //     sandbox.restore();
    // });

    function getDescribeRenderer(selectTable = "", hideSpinner = true) {
        const store = createStore(() => ({
            selectedTable: selectTable,
            allTables: [
                'patient_identifier',
                'hiv_self_testing',
                'bed_patient_assignment_default',
                'patient_encounter_details_default',
                'patient_allergy_status_default'
            ],
            selectedTableColumns: [
                'id',
                'name'
            ],
            filteredTables: [],
            showMessage: {
                responseMessage: "",
                responseType: ""
            },
            hideSpinner,
            currentMapping: ''
        }), applyMiddleware(thunkMiddleware));

        return (render(
          <Provider store={store}>
            <DescribeFilteredTable
              dispatch={() => {
                }}
              history={{}}
            />
          </Provider>
        ));
    }

    // function getDescribeMount(history = {}) {
    //     const store = createStore(() => ({
    //         selectedTable: '',
    //         allTables: [
    //             'patient_identifier',
    //             'hiv_self_testing',
    //             'bed_patient_assignment_default',
    //             'patient_encounter_details_default',
    //             'patient_allergy_status_default'
    //         ],
    //         selectedTableColumns: [
    //             'id',
    //             'name'
    //         ],
    //         filteredTables: [],
    //         showMessage: {
    //             responseMessage: "",
    //             responseType: ""
    //         }
    //     }), applyMiddleware(thunkMiddleware));
    //
    //     return (mount(
    //       <Provider store={store}>
    //         <DescribeFilteredTable
    //           dispatch={() => {
    //             }}
    //           history={history}
    //         />
    //       </Provider>
    //     ));
    // }
});
