const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    phone:{
        type:String,
        required:true 
    }
})

const contact_new = mongoose.model('Contact_new',contactSchema);
module.exports = contact_new;