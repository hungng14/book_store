const utils = require('../utils/utils');

class BaseService {
    constructor() {
        this.schema_name = utils.coll_name(this.constructor.name);
    }

    me() {
        return this.constructor.name;
    }

    promise(_promise) {
        return Promise.resolve(_promise).then((res) => res).catch((err) => { throw err; });
    }
}
module.exports = BaseService;
