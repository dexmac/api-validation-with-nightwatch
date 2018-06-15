'use strict';

module.exports = {
  // Closing browser after test suite has finished.
  'after': function(client){
    client.end();
  },

  'Perform a Google search and validate search URL': function (client) {
    var google = client.page.google();
    var searchString = 'nightwatchJS';

    google.navigate()
      .assert.title('Google')
      .assert.visible('@searchBar')
      .setValue('@searchBar', searchString)
      .click('@submit');
    
    client.pause(2500); // A much nicer way might be to wait for something on the page, but this is just for demo purposes.

    var googleSearchQueryParams = {
      client: ".*",
      hl: ".*",
      gs_rn: ".*",
      gs_ri: ".*",
      cp: ".*",
      gs_id: ".*",
      q: searchString,
      xhr: ".*",
      ei: ".*"
    };
    client.assert.hasRequest('https://www.google.com/complete/search', googleSearchQueryParams);
  }
};
