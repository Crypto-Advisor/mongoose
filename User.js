const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 120,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        minlength: 5,
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,
})

userSchema.methods.sayHi = function() {
    console.log(`Hi. My name is ${this.name}`)
}

//can only be called on user itself
userSchema.statics.findByName = function(name){
    return this.find({ name: new RegExp(name, 'i')})
}

//can only be called with .find() or .where() first as a query
userSchema.query.byName = function(name){
    return this.where({ name: new RegExp(name, 'i')})
}

//helpful for data you want to use all of the time but dont want to seperately store in database
userSchema.virtual('namedEmail').get(function(){
    return `${this.name} <${this.email}>`
})

//middleware before a save, can also be after and for different actions
userSchema.pre('save', function(next){
    this.updatedAt = Date.now()
    next()
})

userSchema.post('save', function(doc, next){
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User", userSchema)