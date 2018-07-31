import 'jsdom-global/register';
import React from 'react';
import FilteredTables from '../../../../../src/main/client/mapping/components/FilteredTables';
import * as MappingActions from '../../../../../src/main/client/mapping/actions/MappingActions';
import thunkMiddleware from 'redux-thunk';
import {configure, render, shallow, mount} from 'enzyme';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({adapter: new Adapter()});


describe('FilteredTables', () => {

    let rendered;

    beforeEach(() => {
        const store = createStore(() => ({
            "filteredTables": ["pat_identifier", "program"]
        }), applyMiddleware(thunkMiddleware));

        rendered = mount(
            <Provider store={store}>
                <FilteredTables dispatch={() => {
                }}/>
            </Provider>
        );
    });

    it('should have ul element with type none', () => {
        expect(rendered.find('ul')).toHaveLength(1);
        expect(rendered.find('ul').props().type).toEqual('none');
    });

    describe("#li elements", () => {
        it('should have two li elements', () => {
            let liElements = rendered.find('li');
            expect(liElements).toHaveLength(2);
        });

        it('should have filteredTables as li elements', () => {
            let liElements = rendered.find('li');
            expect(liElements.first().text()).toEqual('pat_identifier');
            expect(liElements.at(1).text()).toEqual('program');
        });

        it('should dispatch selectedTable on click on li element', () => {
            let sandBox = sinon.createSandbox();

            let selectedTableMock = sandBox.mock(MappingActions).expects("selectedTable")
                .withArgs("pat_identifier")
                .returns({
                        "type": "selectedTable",
                        "selectedTable": "pat_identifier"
                    }
                );

            rendered.find("li").first().simulate('click', {'target': {'dataset': {'tableName': 'pat_identifier'}}});

            selectedTableMock.verify();

            sandBox.restore();
        });
    });

});