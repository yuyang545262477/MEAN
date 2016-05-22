angular
.module('scotchTodo', [])
.controller('mainController', mainController);

//内置控制器

function mainController($scope, $http) {
    $scope.formData = {};
//    when loading on the page ,get all todos and show them.
    $http.get('/api/todos')
    .success(function (data) {
        $scope.todos = data;
        console.log(data);
    })
    .error(function (err) {
        console.log('error is ' + err);
    });
//  when submitting the add form,send the text to the node API
    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
        .success(function (data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        })
        .error(function (err) {
            console.log('post error is :' + err);
        });
    };
    //  delete
    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
        .success(function (data) {
            $scope.formData = {};
            $scope.todos = data;
        })
        .error(function (err) {
            console.log('delete error:' + err);
        });
    };
}
