const mongoose = require('mongoose');
const databaseConfig = require('../config/database');

const alertTagSchema = mongoose.Schema(
    {
        peopleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        detailId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        alertType: {
            type: String,
            required: true
        },
        created_date: String,
        msg: [String],
    }
);

const alertTag = module.exports = mongoose.model('AlertTag', alertTagSchema, 'AlertTag');

module.exports.GetAlertTagById = tagId => alertTag.findById(tagId).exec();
module.exports.GetAllAlertTagsOfPerson = peopleId => alertTag.find({peopleId: peopleId}).exec();
module.exports.GetAllAlertsTagOfDetail = (peopleId, detailId) => alertTag.find({peopleId: peopleId, detailId: detailId}).exec();
module.exports.GetAllAlertsTagOfType = type => alertTag.find({alertType: type}).exec();

module.exports.AddAlertTagToDetail = (peopleId, detailId, alertType, msg) => {
    let date = new Date();
    let dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    let newTagJson = {
        peopleId: peopleId,
        detailId: detailId,
        alertType: alertType,
        msg: (msg != "" || msg)? [msg] : [],
        date_create_at: dateString
    };
    let newTag = new alertTag(newTagJson);
    return newTag.save();
};

module.exports.RemoveAlertTagToDetail = tagId => {
    return alertTag .findOne({_id: tagId})
                    .remove()
                    .exec();
};