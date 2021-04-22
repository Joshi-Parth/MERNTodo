const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000; 
const mongoose = require('mongoose');
const todoRoutes = express.Router();

let Todo = require('./todo.model')



app.use(cors());
app.use(express.json());


const url = `mongodb+srv://ParthJoshi:RwtGoV73Hwz1iFYt@cluster0.qdp5h.mongodb.net/todos?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })





todoRoutes.route('/').get(function(req,res) {
    Todo.find(function (err,todos) {
        if(err){
            console.log(err);
        } else {
            res.json(todos);
        }
    })
})
todoRoutes.route('/:id').get(function(req,res){
    Todo.findById( req.params.id , (err, todos) => {
        res.json(todos);
    })
})

todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id, (err,todo) => {
        if(!todo){
            res.status(404).send("Data is not found");
        }
        else{
            todo.description = req.body.description;
            todo.responsible = req.body.responsible;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;

            todo.save()
            .then(todo => {
                res.json('Todo updated')
            })
            .catch(err => {
                res.status.send("Update not possible");
            })
        }
    })
})

todoRoutes.route('/add').post(function (req, res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            console.log(req.body);
            res.status(200).json({"todo": "todo added succesfully"})
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

// todoRoutes.route('/delete/:id').delete(function(req, res) {
//     Todo.findByIdAndRemove(req.params.id)
//         .then(response => {
//             console.log(response)
//             res.status(200).json("Succesfully deleted")
//         })
//         .catch(err => {res.status(400).send('Delete failed')})
            
// })



app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});