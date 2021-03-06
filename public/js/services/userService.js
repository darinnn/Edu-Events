﻿(function() {
    'use strict';
    app.factory('userService', ['$http', '$window', function($http, $window) {
        var self = this;

        self.user = {
            userName: $window.localStorage.getItem('userName'),
            _id: $window.localStorage.getItem('_id'),
            token: $window.localStorage.getItem('token')
        };

        function loginUser(userName, password) {
            return $http.post('api/login', {
                'name': userName,
                'password': password
            });
        }

        function registerUser(userName, password, email, school, schoolAddress) {
            return $http.post('api/register', {
                'name': userName,
                'password': password,
                'email': email,
                'school': school,
                'schoolAddress': schoolAddress
            });

        }

        function setUser(data) {
            self.user.userName = data.name;
            self.user._id = data._id;
            self.user.token = data.token;
            self.user.password = null;

            $window.localStorage.setItem('userName', data.name);
            $window.localStorage.setItem('_id', data._id);
            $window.localStorage.setItem('token', data.token);
        }

        function getUser() {
            return self.user;
        }

        function logoutUser(userNama) {
            // remove user props
            for (var prop in self.user) delete self.user[prop];

            $window.localStorage.clear();
        }

        return {
            loginUser: loginUser,
            registerUser: registerUser,
            setUser: setUser,
            getUser: getUser,
            logoutUser: logoutUser
        };
    }]);
}());