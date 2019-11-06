const mysql = require('mysql')

var connection = () => {
    //This code commented out is for connection to remote database. Comment out as needed.
    
    // var db = mysql.createConnection({
    //     host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    //     port: '3306',
    //     user: 'admin',
    //     password: 'csc648_team10',
    //     //working database name, actual database is 'gatortrader'
    //     database: 'gatortrader_test'
    // });

    //This connection is when running local host mysql instance
    var db = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'aprilhaj27',
        //working database name, actual database is 'gatortrader'
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