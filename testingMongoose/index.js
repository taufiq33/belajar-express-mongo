const connection = require('./connection');
const mongoose = require('mongoose');

const dbConnection = connection.connect();
const TodoSchema = new mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now() },
  completed: { type: Boolean, default: false },
  completed_at: Date,
});
const Todo = mongoose.model('Todo', TodoSchema);

const getAllTodo = async () => {
  await Todo.find().exec((err, result) => {
    console.log(result);
  });
}

const setTodoDone = async (todoId) => {
  await Todo.updateOne(
    { _id: todoId },
    { completed: true, completed_at: Date.now() }
  );
};

const addTodo = async (text) => {
  const newTodo = new Todo();
  newTodo.text = text;
  const insert = await newTodo.save();
  console.log(insert);
}

const setTodoText = async (todoId, text) => {
  await Todo.updateOne(
    { _id: todoId },
    { text: text }
  );
};

const deleteTodo = async (todoId) => {
  await Todo.deleteOne({
    _id: todoId
  })
};

// deleteTodo('6264a94a44306553ab416b59');
getAllTodo();
