const {Schema, model}  = require('mongoose');

const MedicosSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: Object,
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    veterinaria:{
        type:Schema.Types.ObjectId,
        ref:'Veterinaria',
        required:true
    }
}, { collection: 'medicos' });

MedicosSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Medicos', MedicosSchema );