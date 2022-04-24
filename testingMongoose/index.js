const connection = require('./connection');
const mongoose = require('mongoose');

const dbConnection = connection.connect();
// const TodoSchema = new mongoose.Schema({
//   text: String,
//   created: { type: Date, default: Date.now() },
//   completed: { type: Boolean, default: false },
//   completed_at: Date,
// });
// const Todo = mongoose.model('Todo', TodoSchema);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  email: {
    required: true,
    minlength: 5,
    maxlength: 100,
    type: String,
    validate: {
      validator: (email) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
      message: (inputedEmail) => `${inputedEmail} is not valid email`,
    }
  },
  password: {
    required: true,
    minlength: 8,
    maxlength: 100,
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
})

const User = mongoose.model('User', UserSchema);

// const getAllTodo = async () => {
//   await Todo.find().exec((err, result) => {
//     console.log(result);
//   });
// }

// const setTodoDone = async (todoId) => {
//   await Todo.updateOne(
//     { _id: todoId },
//     { completed: true, completed_at: Date.now() }
//   );
// };

// const addTodo = async (text) => {
//   const newTodo = new Todo();
//   newTodo.text = text;
//   const insert = await newTodo.save();
//   console.log(insert);
// }

// const setTodoText = async (todoId, text) => {
//   await Todo.updateOne(
//     { _id: todoId },
//     { text: text }
//   );
// };

// const deleteTodo = async (todoId) => {
//   await Todo.deleteOne({
//     _id: todoId
//   })
// };

const getAllUser = async () => {
  await User.find().exec((err, result) => {
    console.log(result);
  });
}

const addUser = async ({ username, email, password }, adminRole = false) => {
  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = password;
  adminRole ? newUser.role = 'admin' : '';
  const insert = await newUser.save();
  console.log(insert);
}

const deleteUser = async (UserId) => {
  await User.deleteOne({
    _id: UserId
  })
};

// deleteUser('6264b643e699b284f89990f8');
// getAllUser();

const query = User.find();
query.select('username email')
  .sort({ username: 1 });

const listUser = query.exec((error, list) => {
  console.log(list)
});

