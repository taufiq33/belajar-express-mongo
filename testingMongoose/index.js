const connection = require('./connection');
const mongoose = require('mongoose');

const dbConnection = connection.connect();
const TodoSchema = new mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now() },
});
const Todo = mongoose.model('Todo', TodoSchema);

const getAllTodo = async () => {
  await Todo.find().exec((err, result) => {
    console.log(result);
  })
}

getAllTodo();
