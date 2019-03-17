const express = require('express');
const router = express.Router();
const Customer = require('../../models/customer.model');
const validate = require('../middlewares/validator');
const authorize = require('../middlewares/aclAuthoirzation');

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/*
    APIs that called sync from other microServices 
*/
router.post('/signup', async (req, res, next) => {
    try {
        const createdCustomer = await Customer.create({
            gatewayIDFK: req.body.GWUserID,
            name: req.body.GWUserName
        });

        res.status(201).send(createdCustomer);
    } catch (e) {
        // next(e);
    }
});


router.get('/:gatewayUserId', async (req, res, next) => {
    try {
        const customerDetails = await Customer.findOne({ gatewayIDFK: req.params.gatewayUserId });
        res.status(200).send(customerDetails);
    } catch (e) {

    }
});


router.post('/subscribe', async (req, res, next) => {
    try {
        const GWCustomerID = req.body.GWCustomerID,
            shopId = req.body.shopId;

        const updatedCustomer = await Customer.findOneAndUpdate({gatewayIDFK: GWCustomerID}, {
            $push: {
                shops: shopId
            }
        }, {new: true});

        res.status(200).send(updatedCustomer);
    } catch (e) {

    }
})

router.post('/unsubscribe', async (req, res, next) => {
    try {
        const GWCustomerID = req.body.GWCustomerID,
            shopId = req.body.shopId;

        const updatedCustomer = await Customer.findOneAndUpdate({gatewayIDFK: GWCustomerID}, {
            $pull: {
                shops: shopId
            }
        }, {new: true});

        res.status(200).send(updatedCustomer);
    } catch (e) {

    }
});
////////////////////////////////////////////////
///////////////////////////////////////////////


router.get('/', authorize(), async(req, res, next) => {
    try {
        // toDo: pagination and show full customer's details from gateway
        const customers = await Customer.find({})
        console.log("In the Name Of ALLAH");
        res.status(200).send(customers);
    } catch (e) {

    }
})

module.exports = router;    