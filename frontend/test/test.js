/* eslint-env node, mocha */
import dotenv from 'dotenv';
import React from 'react';
import { expect } from 'chai';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { JSDOM } from 'jsdom';

import fetchMock from 'fetch-mock';
import Weather from '../src/components/Weather';

dotenv.config({ path: '../.env' });

// Set up JSDOM to handle testing DOM-related things, like React Components
const { window } = new JSDOM('<!doctype html><html><body></body></html>');

// Configure an Enzyme Adapter for React Components
configure({ adapter: new Adapter() });

// Make Enzyme aware of document and window objects
global.document = window.document;
global.window = window;

describe('Weather Component', () => {
  const result = {
    icon: '01n',
  };
  const promise = Promise.resolve(result);
  before(() => {
    fetchMock.get('http://localhost:9000/api/weather', promise);
  });

  after(() => {
    fetchMock.restore();
  });
  it('calls componentDidMount', () => {
    sinon.spy(Weather.prototype, 'componentDidMount');

    // ESLint doesn't seem to recognize .jsx extension in here
    // for some reason..
    mount(<Weather />);
    expect(Weather.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('fetches weather data', () => {
    const wrapper = shallow(<Weather />);

    promise.then(() => {
      expect(wrapper.state().icon).to.equal('01');
    });
  });

  // it('Renders the weather logo', () => {
  //     const wrapper = shallow(<Weather />);
  //     expect(wrapper.find('.icon')).to.have.length(1);
  // });
});
