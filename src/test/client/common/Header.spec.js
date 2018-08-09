import 'jsdom-global/register';
import React from 'react';
import {
    configure, shallow
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import Header from "../../../main/client/common/Header";

configure({ adapter: new Adapter() });


describe('Header', () => {
    let rendered;

    beforeEach(() => {
        rendered = shallow(<Header />);
    });

    it('should have app-link className', function () {
        expect(rendered.find('.header-wrap-dhis')).toHaveLength(1);
    });

    it('should have back-btn className', function () {
        expect(rendered.find('.back-btn')).toHaveLength(1);
    });

    it('should have back-btn className', function () {
        expect(rendered.find('.fa-home')).toHaveLength(1);
    });

    it('should change path to Bahmni home when home button clicked from DHIS2 dashboard', function () {
        const history = { location: { pathname: '/' }, push: () => {}};

        const sandBox = sinon.createSandbox();

        const pushMock = sandBox.mock(history).expects('push')
            .withArgs('/bahmni/home');

        history.push = pushMock;

        rendered = shallow(
          <Header history={history} />
        );

        rendered.find('.back-btn').first().simulate('click');

        pushMock.verify();
        sandBox.restore();
    });

    it('should change path to DHIS2 dashboard when home button clicked from any other page', function () {
        const history = { location: { pathname: '/mapping' }, push: () => {}};

        const sandBox = sinon.createSandbox();

        const pushMock = sandBox.mock(history).expects('push')
            .withArgs('/');

        history.push = pushMock;

        rendered = shallow(
          <Header history={history} />
        );

        rendered.find('.back-btn').first().simulate('click');

        pushMock.verify();
        sandBox.restore();
    });
});