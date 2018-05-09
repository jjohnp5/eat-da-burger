var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burgers = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.

router.get('/', (req,res)=>{
    res.render('index');
});

router.get("/burgers", function(req, res) {
  burgers.all(function(data) {
    
    res.json(data);
  });
});
router.post('/add/burger', (req, res)=>{
    try {
        burgers.create([
        "burger_name", "devoured"
      ], [
        req.body.burger, 0
      ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId, response: true });
      });
    }catch(e){
        res.json({response: false})
    }
})
router.post('/devour/:id', (req, res)=>{
    var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update({
    devoured: 1
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).json({response: false}).end();
    } else {
      res.status(200).json({response: true}).end();
    }
  });
})
// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
