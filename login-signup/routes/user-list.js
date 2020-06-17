const express = require('express');
const Users = require('../models/User')

const router = express.Router();

router
    .get('/', async (req, res) => {
        Users.find({}, (err, foundData) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (foundData.length === 0) {
                    res.status(404).send("No data available")
                } else {
                    console.log(foundData)
                    res.json(foundData)
                }
            }
        })
    })

module.exports = router;