const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Room Schema
const RoomSchema= new Schema({
    roomID: Number,
    roomPrice: Number,
    roomDates: [String],
    roomBeds: [BedSchema]
});

//Bed Schema
const BedSchema= new Schema({
    bedType: String,
    bedSleeps: Number

});

module.exports = mongoose.model('Room', RoomSchema)