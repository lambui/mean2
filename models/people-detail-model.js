const mongoose = require('mongoose');
const databaseConfig = require('../config/database');

const detailSchema = mongoose.Schema(
    {
        peopleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        details: [{
            create_at: Date,
            body: String
        }]
    }
);

const detail = module.exports = mongoose.model('PeopleDetail', detailSchema, 'PeopleDetail');

module.exports.GetDetailsById = id => detail.findById(id).exec();
module.exports.GetDetailsByPeopleId = peopleId => detail.findOne({peopleId: peopleId}).exec();

module.exports.CreateDetailList = peopleId => {
    return detail   .GetDetailsByPeopleId(peopleId)
                    .then(detailList => {
                        if(detailList != null)
                            return Promise.resolve(null);
                        else
                        {
                            let newDetailList = new detail({peopleId: peopleId});
                            return newDetailList.save();
                        } 
                    });
};

module.exports.AddDetailToPeople = (peopleId, detailBody) => {
    return detail   .GetDetailsByPeopleId(peopleId)
                    .then(detailList => {
                        let newDetail = {
                            create_at: new Date(),
                            body: detailBody
                        };

                        if(detailList == null)
                        {
                            return detail   .CreateDetailList(peopleId)
                                            .then(newDetailList => {
                                                newDetailList.details.push(newDetail);
                                                return newDetailList.save();
                                            });
                        }
                        else //if exist already
                        {
                            detailList.details.push(newDetail);
                            return detailList.save();
                        }
                    });
};

module.exports.RemoveDetailFromList = (peopleId, detailId) => {
    return detail   .update(
                        {peopleId: peopleId}, 
                        {$pull: {details: {_id: detailId}}}
                    )
                    .exec();
};

module.exports.GetDetail = (peopleId, detailId) => {
    return detail   .findOne(
                        { peopleId: peopleId }, 
                        { details: { $elemMatch: { _id: detailId }} }
                    )
                    .exec();
}