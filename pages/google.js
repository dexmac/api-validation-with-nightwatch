'use strict';

module.exports = {
  url: 'http://www.google.com/ncr', // Going to main google page ('ncr' == no country-redirect)
  elements: {
    searchBar: {
      selector: 'input[type=text]'
    },
    submit: {
      selector: '//button[@name="btnG"]',
      locateStrategy: 'xpath'
    }
  }
};
