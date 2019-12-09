/**
 * Search function used to query pool for items.
 *
 * 
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const initCategories = require('../database/initCategories')

//Initialize categories of items from database.
var categories = initCategories.init()

var results=null

console.log("This is what the global variable for results holds : "+ results)
//Search function that renders results to posts page
router.post('/results', function (req, res, next) {
    var msg = ""
    //deal with category result here later
    // console.log("value returned from search entry is (" + req.body.searchEntry + ")")

    //if category was selected output all items for that category
    if (categories.includes(req.body.searchEntry)) {
        pool.query("SELECT * FROM item WHERE category=? AND approved = 1", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            }
            else if (result.length == 0) {
                msg = "No search results were found for the given entry."
            }
            else{
                results=result
               
            }
            
            res.render('results', {
                displayMessage: msg,
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
            })
        })
    }
    else if (!req.body.searchEntry) {
        pool.query("SELECT * FROM item WHERE approved = 1 ORDER BY date_upload DESC ", (err, result) => {
            if (err) {
                console.log(err)
            }  else{
                results=result
               
            }
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
                feedbackMessage: "Recent Posts on Gatortrader"
            })
        })
    } else {
        //else only output the item that the user entered
        pool.query("SELECT * FROM item WHERE name like '%" + req.body.searchEntry + "%' AND approved = 1", (err, result) => {
            console.log(result)
            if (err) {
                console.log(err)
            }
            else if (result.length == 0) {
                msg = "No search results were found for the given entry."
            }else{
                results=result
              
            }
            res.render('results', {
                displayMessage: msg,
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
            })
        })
    }

})


//sorted search function that renders results to posts page
router.post('/results/sort', function (req, res, next) {
    var sortBy= req.body.sortBy

        //sort by price low to high
        if(sortBy == "price-asc"){
          
            results.sort((a,b)=>{
                return (a.price < b.price) ? 1 : -1 
            })
        }
         //sort by price low to high
         if(sortBy == "price-desc"){
           
            results.sort((a,b)=>{
                return (a.price > b.price) ? 1 : -1 
            })
        }

        res.render('results', {
            searchResult: results,
            categories: categories,
            isLogin: req.session.loggedin,
        })

})


module.exports = router