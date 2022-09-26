const {Schema, model}  = require('mongoose');

const VeterinariasSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
}, { collection: 'veterinarias' });

VeterinariasSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();  
    object.uid = _id;
    return object;
})

module.exports = model( 'veterinaria', VeterinariasSchema );