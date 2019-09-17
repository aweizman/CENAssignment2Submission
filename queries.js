/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'),
    config = require('./config'); 

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri);
/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */

  var doc = Listing.findOne({"code": "LBW"}, function(err, data) {});
  console.log(doc);

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
  */
  var doc = Listing.findOneAndDelete({"code": "CABL"}, function(err, data) {});
  console.log(doc);
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
  var doc = Listing.findOneAndUpdate({"name": "Phelps Lab"},{"address":"1954 Museum Rd, Gainesville, FL 32503"}, {new : true}, function(err, data) {});
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  var doc;
  var obj;
  fs.readFile('listings.json', 'utf8', function(err, data) {
    obj = JSON.parse(data);
    obj.entries.forEach(element => {
      doc = Listing.findOne({"name": element.name});
      console.log(doc);
    });
  });

};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
