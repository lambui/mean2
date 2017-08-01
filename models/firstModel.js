const mongoose = require('mongoose');
const databaseConfig = require('../config/database');

const peopleSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        DOB: {
            type: String,
            required: true
        }
    }
);

const People = module.exports = mongoose.model('People', peopleSchema);

module.exports.GetPeopleById = id => People.findById(id).exec();
module.exports.GetPeopleByFirstName = firstName => People.find({firstName: firstName}).exec();
module.exports.GetPeopleByLastName = lastName => People.find({lastName: lastName}).exec();
module.exports.GetPeopleByDOB = DOB => People.find({DOB: DOB}).exec();

module.exports.AddPeople = newPerson => newPerson.save();