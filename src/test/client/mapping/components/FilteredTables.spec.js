import React from 'react';
import FilteredTables from '../../../../../src/main/client/mapping/components/FilteredTables';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount, render, configure } from 'enzyme';
import { applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe.only('FilteredTables', () => {

    let rendered;

    beforeEach(()=>{
        const store = createStore(() => ({
            "filteredTables": ["pat_identifier", "program"]
        }), applyMiddleware(thunkMiddleware));

        rendered = render(
            <Provider store={store}>
                <FilteredTables dispatch={() => {
                }}/>
            </Provider>
        );
    });

    it('should have ul element with type non', () => {
        expect(rendered.find('ul')).toHaveLength(1);
        expect(rendered.find('ul')[0].attribs.type).toEqual('none');
    });

    it('should have two children elements for ul', () => {
        let ulElement = rendered.find('ul')[0];
        let ulChildren = ulElement.children;
        expect(ulElement.children).toHaveLength(2);
        expect(ulChildren[0].children[0].data).toEqual('pat_identifier');
        expect(ulChildren[1].children[0].data).toEqual('program');
    });

});