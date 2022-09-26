const {Schema, model}  = require('mongoose');

const MedicosSchema = Schema({
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
    },
    veterinaria:{
        type:Schema.Types.ObjectId,
        ref:'veterinaria'
    }
}, { collection: 'medicos' });

MedicosSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();  
    object.uid = _id;
    return object;
})

module.exports = model( 'Medicos', MedicosSchema );