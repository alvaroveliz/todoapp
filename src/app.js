var app = angular.module('TodoApp', ['ngResource', 'oauth.io']);
var API = 'https://polar-springs-9569.herokuapp.com/api';

app.config(function(OAuthProvider) {
    OAuthProvider.setPublicKey('VnBIg-uqhtbZEhB5j04LNaF-K5k');
});

app.config(function(OAuthProvider) {
    OAuthProvider.setHandler('github', function(OAuthData, $http) {
        
    });
});

app.controller('TodoCtrl', ['$scope', 'Tareas', 'Tarea', function($scope, Tareas, Tarea) {
    $scope.todo = Tareas.query();

    $scope.agregarTarea = function() {
        $scope.tarea.done = false;
        Tareas.create($scope.tarea, function() {
            $scope.todo = Tareas.query();
            $scope.tarea = null;
        });
    }

    $scope.cerrarTarea = function(tarea) {
        tarea.done = true;
        Tarea.save(tarea, {
            id: tarea.id
        }, function() {
            $scope.todo = Tareas.query();
        });
    };
}]);

app.controller('LoginCtrl', ['$scope', 'OAuth', function($scope, OAuth) {

    $scope.login = function() {
        OAuth.popup('github');
    };

}]);

app.factory('Tareas', ['$resource', function($resource) {
    return $resource(API + '/tareas', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
        create: {
            method: 'POST'
        }
    });
}]);

app.factory('Tarea', ['$resource', function($resource) {
    return $resource(API + '/tareas/:id', {}, {
        get: {
            method: 'GET',
            params: {
                id: '@id'
            }
        },
        save: {
            method: 'POST',
            params: {
                id: '@id'
            }
        },
        remove: {
            method: 'DELETE',
            params: {
                id: '@id'
            }
        }
    });
}]);
