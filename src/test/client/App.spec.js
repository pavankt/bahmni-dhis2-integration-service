import 'jsdom-global/register';
import React from 'react';
import {
    render, configure
} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import App from "../../main/client/App";

configure({ adapter: new Adapter() });


describe('App', () => {
    let rendered;

    beforeEach(() => {
        rendered = render(
          <Router>
            <App dispatch={() => {
                    }}
            />
          </Router>
        );
    });

    it('should have app-link className', function () {
        expect(rendered.find('.app-link')).toHaveLength(1);
    });

    it('should have mapping-link className', function () {
        expect(rendered.find('.mapping-link')).toHaveLength(1);
    });

    it('should have sync-link className', function () {
        expect(rendered.find('.sync-link')).toHaveLength(1);
    });

    it('should have log-link className', function () {
        expect(rendered.find('.log-link')).toHaveLength(1);
    });
});
