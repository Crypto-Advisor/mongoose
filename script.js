const mongoose = require('mongoose')
const User = require("./User")

mongoose.connect("mongodb://localhost/testdb", 
    ()=>{
        console.log('Connected to database')
    },
    e => console.error(e)
)

run()
async function run(){

    try{
        // const user = await User.create({ 
        //     name: "Kyle",
        //     age: 26,
        //     email: "test@gmail.com",
        //     hobbies: ["Weight Lifting", "Bowling"],
        //     address: {
        //         street: "Main st",
    
        //     }
        // })
        // user.name = "Sally"
        // await user.save()
        // const user = new User({ name: "Kyle", age: 26})
        // await user.save()

        // console.log(user)

        const user = await User.findOne({ name: "Sally", email: 'test@gmail.com'})
        console.log(user)
        console.log(user.namedEmail)
        user.sayHi()
    } catch(e){
        console.log(e.message)
    }
    
}

