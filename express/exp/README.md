# Express/Node introduction

## Node HTTP

```js
// Load HTTP module
var http = require("http");

// Create HTTP server and listen on port 8000 for requests
http.createServer(function(request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body "Hello World"
   response.end('Hello World\n');
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/');
```

## Helloworld Express

```js
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
```

## Importing and creating modules

```js
var express = require('express');
var app = express();

exports.area = function(width) { return width * width; };
exports.perimeter = function(width) { return 4 * width; };

var square = require('./square'); // Here we require() the name of the file without the (optional) .js file extension
console.log('The area of a square with a width of 4 is ' + square.area(4));

module.exports = {
  area: function(width) {
    return width * width;
  },
       
  perimeter: function(width) {
    return 4 * width;
  }
};

```

## Using asynchronous APIs

```js
console.log('First');
console.log('Second');

setTimeout(function() {
   console.log('First');
   }, 3000);
console.log('Second');
```

## Creating route handlers

```js
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});


// wiki.js - Wiki route module

var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res) {
  res.send('Wiki home page');
});

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});

module.exports = router;

// app.js
var wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```

## Using middleware

$ npm i morgan --save-dev

```js
var express = require('express');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));
...

var express = require('express');
var app = express();

// An example middleware function
var a_middleware_function = function(req, res, next) {
  // ... perform some operations
  next(); // Call next() so Express will call the next middleware function in the chain.
}

// Function added with use() for all routes and verbs
app.use(a_middleware_function);

// Function added with use() for a specific route
app.use('/someroute', a_middleware_function);

// A middleware function added for a specific HTTP verb and route
app.get('/', a_middleware_function);

app.listen(3000);
```
## Serving static files

```js
app.use(express.static('public'));

app.use(express.static('public'));
app.use(express.static('media'));

app.use('/media', express.static('public'));
```

```
http://localhost:3000/images/dog.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/about.html
```

## Handling errors

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## Using databases Mongo Connect

$ npm i mongodb --save-dev

```js
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) throw err;

  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err;

    console.log(result);
  });
});
```

## Rendering data (views)

```js
var express = require('express');
var app = express();

// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));

// Set view engine to use, in this case 'some_template_engine_name'
app.set('view engine', 'some_template_engine_name');


app.get('/', function(req, res) {
  res.render('index', { title: 'About dogs', message: 'Dogs rock!' });
});
```

## File structure

## Development dependencies

```
npm install eslint --save-dev
```

## Running tasks

## Installing the Express Application Generator

```
npm install express-generator -g
```

```
express nodeex
```

# Run the helloworld on Windows
SET DEBUG=helloworld:* & npm start

# Run helloworld on Linux/Mac OS X
DEBUG=helloworld:* npm start

## Creating the project

```
express express-locallibrary-tutorial --view=pug
```

## Enable server restart on file changes

```
npm install --save-dev nodemon
```

package.json
```js
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
  },
```

SET DEBUG=express-locallibrary-tutorial:* & npm run devstart

## Designing the LocalLibrary models

![](https://mdn.mozillademos.org/files/15645/Library%20Website%20-%20Mongoose_Express.png)

## Mongoose primer

### Installing Mongoose and MongoDB

```
npm install mongoose
```

## Connect to MongoDB

```js
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'insert_your_database_url_here';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

npm install env2 --save

>> https://github.com/dwyl/learn-environment-variables

```js
require('env2')('.env');    // loads all entries into process.env

console.log(process.env.DB_HOST); // "127.0.0.1"
```


## Connecting to MongoDB

```js
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

## Defining and creating models

```js
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});
```

### Creating a model

```js
// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
```

### Schema types (fields)

```js
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

### Validation

```js
 var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
        required: [true, 'Why no eggs?']
      },
      drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water',]
      }
    });
```

### Virtual properties

```js

```

### Using models

```js
// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
  if (err) return handleError(err);
  // saved!
});

// Access model field values using dot notation
console.log(awesome_instance.name); //should log 'also_awesome'

// Change record by modifying the fields, then calling save().
awesome_instance.name="New cool name";
awesome_instance.save(function (err) {
   if (err) return handleError(err); // saved!
   });
```

### Searching for records

```js
var Athlete = mongoose.model('Athlete', yourSchema);

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
})

//

// find all athletes that play tennis
var query = Athlete.find({ 'sport': 'Tennis' });

// selecting the 'name' and 'age' fields
query.select('name age');

// limit our results to 5 items
query.limit(5);

// sort by age
query.sort({ age: -1 });

// execute the query at a later time
query.exec(function (err, athletes) {
  if (err) return handleError(err);
  // athletes contains an ordered list of 5 athletes who play Tennis
})

//
Athlete.
  find().
  where('sport').equals('Tennis').
  where('age').gt(17).lt(50).  //Additional where query
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(callback); // where callback is the name of our callback function.
```

### Working with related documents — population

```js
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title    : String,
});

var Story  = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);

//

var bob = new Author({ name: 'Bob Smith' });

bob.save(function (err) {
  if (err) return handleError(err);

  //Bob now exists, so lets create a story
  var story = new Story({
    title: "Bob goes sledding",
    author: bob._id    // assign the _id from the our author Bob. This ID is created by default!
  });

  story.save(function (err) {
    if (err) return handleError(err);
    // Bob now has his story
  });
});

//
Story
.findOne({ title: 'Bob goes sledding' })
.populate('author') //This populates the author id with actual author information!
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log('The author is %s', story.author.name);
  // prints "The author is Bob Smith"
});s
```

### One schema/model per file

```js
// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string          : String,
    a_date            : Date,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema );

///

//Create a SomeModel model just by requiring the module
var SomeModel = require('../models/somemodel')

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function);
```

### Setting up the MongoDB database

```
/express-locallibrary-tutorial  //the project root
  /models
    author.js
    book.js
    bookinstance.js
    genre.js
```

### Author model

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
```

### Book model

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.ObjectId, ref: 'Genre'}]
});

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);
```

### BookInstance model

```js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
  due_back: {type: Date, default: Date.now},
});

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
```

### Testing - create some items

npm install async --save

node populatedb <db_url>

### Routes Needed for the local libraly

- catalog/ — The home/index page. catalog/<objects>/ — The list of all books, bookinstances, genres, or authors (e.g. /catalog/books/, /catalog/genres/, etc.)
- catalog/<object>/<id> — The detail page for a specific book, bookinstance, genre, or author with the given _id field value (e.g./catalog/book/584493c1f4887f06c0e67d37).
- catalog/<object>/create — The form to create a new book, bookinstance, genre, or author (e.g. /catalog/book/create).
- catalog/<object>/<id>/update — The form to update a specific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37/update).
- catalog/<object>/<id>/delete — The form to delete a specific book, bookinstance, genre, author with the given _id field value (e.g./catalog/book/584493c1f4887f06c0e67d37/delete).

### Create the route-handler callback functions

```
/express-locallibrary-tutorial  //the project root
  /controllers
    authorController.js
    bookController.js
    bookinstanceController.js
    genreController.js
```

### Author controller

```js

```