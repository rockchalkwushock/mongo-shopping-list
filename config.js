/*
    Configures variables for starting application.
*/

exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
    process.env.MONGO_URI :'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 3000;
