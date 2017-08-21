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
            year: {
                type: String,
                required: true
            },
            month: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    }
);

const People = module.exports = mongoose.model('People', peopleSchema, 'People');
module.exports.GetPeopleById = id => People.findOne({_id: id}).exec();
module.exports.GetPeopleByFirstName = firstName => People.find({firstName: firstName}).exec();
module.exports.GetPeopleByLastName = lastName => People.find({lastName: lastName}).exec();
module.exports.GetPeopleByDOB = DOB => People.find({DOB: DOB}).exec();
module.exports.AddPeople = newPerson => newPerson.save();