const express = require('express');
const router = express.Router();

const jsf = require('json-schema-faker');
const util = require('util')
const chance = require('chance')
const faker = require('faker')
jsf.extend('chance', () => new chance.Chance());
jsf.extend('faker', () => faker);

var recentDays = 5;

var schema = {
  "type": "array",
  "minItems": 5,
  "maxItems": 5,
  "items": {
	  "type": "object",
	  "properties": {
	  	"image":{
	  	  "type":"string",
	  	  "faker":"random.image"
	    },
	    "title":{
	      "type":"string",
	      "faker":"lorem.word"
	    },
	    "artist": {
	      "type": "string",
	      "faker": "name.findName"
	    },
	    "views":{
	    	"type":"string",
	    	"faker":"random.number"
	    },
	    "price":{
	    	"type":"integer",
	    	"faker":"random.number"
	    }
	  },
	  "required": [
	    "image",
	    "title",
	    "artist",
	    "views",
	    "price"
	   ]
	  }
};

/* GET home page. */
router.get('/', (req, res) => {

  jsf.resolve(schema).then(sample => {
  	   console.log(util.inspect(sample, 
  	   	{showHidden: false, depth: null}));
	   
	   res.render('popular', 
	  	{  sneakers:  sample });
  });

  
});

module.exports = router;
