const mysql = require('mysql')

var connection = () => {
    var db = mysql.createConnection({
        host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: 'csc648_team10',
        database: 'gatortrader_test'
    });
    db.connect(function (err) {
        if (err) throw err
    })
    return db
}
var types = [];

//fetches all categories from database 
const initCategories = () => {
    if (!connection()._connectCalled) {
        connection()
    }

    connection().query("SELECT * FROM category", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (types.length == 0) {
                for (let i = 0; i < result.length; i++) {
                    types.push(result[i].type)
                }
            }
        }
    })
    return types
}

module.exports = { connection, initCategories }