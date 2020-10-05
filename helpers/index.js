const hbs = require('handlebars');

hbs.registerHelper('compilehtml', (templateStr, options) => {
  console.log(templateStr)
    const template = hbs.compile(templateStr);
    console.log(template())
    return template();
});
module.exports = hbs;
