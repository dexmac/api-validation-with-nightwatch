/* eslint-disable */
var urlParser = require('url');

/**
 * Custom assertion for NightwatchJS, used to test if a browser request has been made
 * and if it conforms to a specific URL and parameters protocol.
 * Returns true if the URL exists as a request / resource, and its query string passes the fuzzy comparison
 *
 * This is an addition to: https://github.com/aedile/nightwatch-analytics
 * enabling custom URL parameters and performing a "Fuzzy" comparison that
 * can include setting parameters as regular expressions.
 *
 * @param filter {string} - The page URL (sans query string)
 * @param params {object} - An JSON object of parameters to match against the request. Key values can be regular expressions.
 * if params are empty - validating only URL, without the query string.
 */
exports.assertion = function(filter, params) {
  /**
   * The message which will be used in the test output and
   * in XML reports
   * @type {string}
   */
  this.message = "Searching for request / resource";

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   * @param callback {function} - The callback is called with window.performance.getEntries result and passed to the value method
   */
  this.command = function(callback) {
    this.api.getRequests(callback);
    return this;
  };

  /**
   * Performs a regexp comparison on the values of the JSON request query string params
   * @param queryStringVal - the query string specific parameter's value
   * @param regexpValAsString - the regular expression to compare against (allows for wildcards)
   */
  var fuzzyCompare = function(queryStringVal, regexpValAsString) {
    var isFuzzyEqual = false;
    var queryStringValAsString = '' + queryStringVal;

    try {
      var regExp = new RegExp('^' + regexpValAsString); // Checking if value starts with passed regExp
      isFuzzyEqual = queryStringValAsString.match(regExp);
    } catch(e) {
      console.error("ERROR: Invalid RegExp: " + regexpValAsString + " for query string value: " + queryStringVal)
    }

    return (isFuzzyEqual);
  };

  /**
   * Checks if obj1 and obj2 keys are similar
   * @param obj1 - JSON object
   * @param obj2 - JSON object
   * @returns {boolean} whether or not all keys are similar
   */
  var hasSameProperties = function(obj1, obj2) {
    var areSameProperties = false;

    if (typeof obj1 === 'object') {
      for (key in obj1) {
        if (!obj2 || !obj2.hasOwnProperty(key)) {
          console.error("Missing key: " + key + ".");
          return false;
        }
      }
      areSameProperties = true;
    }

    return areSameProperties;
  };

  /**
   * Fuzzy comparing two JSON object keys, including / excluding values
   * @param firstObject - JSON object
   * @param secondObject - JSON object
   * @returns {boolean} whether or not the fuzzy comparison passed (i.e., keys / keys AND values are similar)
   */
  var fuzzyCompareAllParams = function(firstObject, secondObject) {
    var areFuzzyEqual = true;

    if (typeof firstObject !== 'object' || typeof secondObject !== 'object' || !hasSameProperties(firstObject, secondObject)) {
      console.error("fuzzyCompareAllParams - objects " + JSON.stringify(firstObject) + " and " + JSON.stringify(secondObject) + " are not equal");
      return false;
    }

    // Check that all params exist and match each parameter
    for (key in firstObject) {
      if (secondObject.hasOwnProperty(key)) {
        if (firstObject[key] !== secondObject[key] && !fuzzyCompare(firstObject[key], secondObject[key])) {
          console.error("Key [" + key + "]: \"" + firstObject[key] + "\" is not equals (or fuzzyequal) to: \""
            + secondObject[key] + "\"");
          return false;
        } else {
          console.log("[" + key + "]: " + firstObject[key] + " == " + secondObject[key]);
        }
      }
      else { // Param doesn't exist, this is not our record.
        console.error("Param: " + key + " does not appear. Exiting check...");
        return false;
      }
    }

    return areFuzzyEqual;
  };

  /**
   * The main processing result of the assertion command.
   * Returns a value to the pass function.
   * @param result The value returned from the command function.
   * @returns {string} the first matching record or 'no matching records'
   */
  this.value = function (result) {
    var records = result.value;
    var recordFound;

    for (var i=0; i < records.length; i++) {
      var urlObject = urlParser.parse(records[i].name, true);

      if (urlObject.href.indexOf(filter) >= 0) {
        console.log("Found a possible match of base URL: " + urlObject.host + urlObject.pathname + ". The complete URL to be checked is: " + urlObject.href + "- Checking...");

        // Fuzzy comparing objects
        // (i.e., iterating over both and checking that they are completely identical, while enabling wildcards).
        if (!params || fuzzyCompareAllParams(urlObject.query, params)) {
          console.log("Found a perfect (fuzzy) match!");
          recordFound = records[i].name;
        }
      }
    }

    return (recordFound ? filter : ' a URL / resource matching the query string parameters was not found');
  };

  /**
   * Outputted to the report as 'expected'.
   * should be the return value of the 'value' function if assertion passed.
   * @type {function|*}
   */
  this.expected = function() {
    return filter;
  };

  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   * @type {function}
   * @param result {string} - result of 'value' method
   */
  this.pass = function(result) {
    return result === filter;
  };
};
