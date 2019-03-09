const mongoose = require('mongoose');

const customerScheam = new mongoose.Schema({ 
    name : { 
        type: String,
        required: true
    },
    approved: {
        type: Boolean, 
        default: false
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    permissions: {
        type: Object,
        default: {
            read: false,
            edit: false,
            delete: false
        }
    }
}, {timestamps: true });

shopAdminScheam.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id;

        delete ret.deleted;
        delete ret._id;
        delete ret.__v;
    }
})


const ShopAdmin = mongoose.model('ShopAdmin', shopAdminScheam);

module.exports = ShopAdmin;
