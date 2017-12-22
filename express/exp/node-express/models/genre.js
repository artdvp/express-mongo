var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
    name: {type: String ,required:true , max: 100, min: 3 },
    url: {type: String}
}
);

GenreSchema
.virtual('url')
.get(function () {
    return '/catagory/genre' + this._id;
});

module.exports = mongoose.model('Genre',GenreSchema);