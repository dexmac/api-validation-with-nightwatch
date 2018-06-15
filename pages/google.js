'use strict';
  
module.exports = {
  url: 'http://www.google.com/ncr', // Going to main google page ('ncr' == no country-redirect)
  elements: {
    searchBar: {
      selector: 'input[type=text]'
    },
    submit: {
      selector: '//*[@id="tsf"]/div[2]/div[3]/center/input[1]',
      locateStrategy: 'xpath'
    },
    autocompleteSuggestions: {
      selector: '//*[@id="sbtc"]/div[2]',
      locateStrategy: 'xpath'
    }
  }
};
