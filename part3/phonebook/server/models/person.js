
const mongoose = require('mongoose')
const validator = require("validator");
const url = process.env.MONGO_URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(result => {
    console.log('connected to MongoDB')
})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true,
        required: true
    },



    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(v) {
              return /\d{2,3}-\d+/.test(v);
            },
            error: props => `${props.value} is not a valid phone number!`
          },
        // validate(value) {
        //     if (/\d{2,3}-\d+/.test(value) == false) {
        //         throw Error(`${value}is not a valid phone number!`);
        //     }
        // },
        required: true
    },
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)
