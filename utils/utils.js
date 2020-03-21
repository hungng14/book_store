class Utils {
    constructor() {
        this.decoded = {};
    }

    static coll_name(value = '') {
        const class_name = value.split('Service')[0];
        let coll_name = '';
        for (let i = 0, leng = class_name.length; i < leng; i += 1) {
            const is_upper = class_name.charAt(i) === class_name.charAt(i).toUpperCase();
            if (is_upper && i > 0) {
                coll_name += `_${class_name.charAt(i)}`;
                continue;
            }
            coll_name += class_name.charAt(i);
        }
        return coll_name.toLocaleLowerCase();
    }

    static set_decoded(decoded) {
        Utils.decoded = decoded;
        return Utils.decoded;
    }

    static get_decoded() {
        return Utils.decoded;
    }
}
module.exports = Utils;
