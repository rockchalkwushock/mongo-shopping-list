/*
    Configures variables for starting application.
*/

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://admin:abc@ds049466.mlab.com:49466/shopping-list-app' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 3000;
