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
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
}, { collection: 'veterinarias' });

VeterinariasSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();  
    return object;
})

module.exports = model( 'Veterinaria', VeterinariasSchema );