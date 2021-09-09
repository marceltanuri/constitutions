const request = require('request');

const _ = require('lodash');

const desiredCountry = "Brazil"

request({
    'method': 'GET',
    'url': 'https://www.constituteproject.org/service/constitutions'
  }, function (error, response) {
    if (error) throw new Error(error);
    var list = JSON.parse(response.body);
    var listNotNullWordLength = _.filter(list, function(n) {
        return (n.word_length != null && n.word_length != "");
      });
      
      listNotNullWordLength.sort((a, b) => ((a.word_length*1) > (b.word_length*1)) ? 1 : -1)

      listNotNullWordLength.forEach((element, index) => {
        console.log((index+1) + " | " + element.country + " | " + element.word_length)
    });

    let selectedCountryPosition = _.findIndex(listNotNullWordLength, function(n){
        return n.country == desiredCountry
    } , 0)

    console.log("##############################################")
    console.log((selectedCountryPosition+1) + " | " + listNotNullWordLength[selectedCountryPosition].country + " | " + listNotNullWordLength[selectedCountryPosition].word_length)

  });