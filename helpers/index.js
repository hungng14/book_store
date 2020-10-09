const hbs = require('handlebars');

hbs.registerHelper('compilehtml', (templateStr, options) => {
    const template = hbs.compile(templateStr);
    return template();
});

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : '';
});

module.exports = hbs;
