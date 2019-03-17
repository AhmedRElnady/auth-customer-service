const mongoose = require('mongoose');

const customerScheam = new mongoose.Schema({ 
    gatewayIDFK : { //ensure index
        type: mongoose.Schema.Types.ObjectId,  // to populate accross databases
        required: true
    },
     /*
        I duplicate customer [name] attribute -intentionally- here in the customer service db,
        as an example of data that frequently retrieved.
        There are more than 4 other approaches as you mention in your notes.
    */
   name: {    
        type: String,
        required: true
    },
    shops:[{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }]
}, {timestamps: true });

customerScheam.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id;

        delete ret.deleted;
        delete ret._id;
        delete ret.__v;
    }
})


const Customer = mongoose.model('Customer', customerScheam);

module.exports = Customer;
