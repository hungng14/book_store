const mongoose = require('mongoose');
const mongoose_paginate = require('mongoose-paginate');

module.exports = {
	mongoose,
	mongoose-paginate,
	Schema: mongoose.Schema,
	ObjectId: mongoose.Schema.ObjectId,
};