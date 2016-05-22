/*
 * 后端文件
 * */
var express = require('express');
var app = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/MEANtodolist');


app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    
    app.use(express.logger('dev'));
    app.use(express.urlencoded());
    app.use(express.json());
});
//define model
var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});
//define route

//get all todos
app.get('/api/todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});
// create todos and send back all todos after creation

//noinspection JSUnresolvedFunction
app.post('/api/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        })
    })
});


//delete a todo

app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        })
        
    })
});

app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});


app.listen(8080);

console.log('app running :8080');
