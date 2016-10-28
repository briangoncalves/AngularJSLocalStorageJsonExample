angular.module('projectAnnoucementApp').factory('projectStorage', function ($http, $injector) {
    'use strict';
    // Detect if an API backend is present. If so, return the API module, else
    // hand off the localStorage adapter
    return $http.get('/api').then(function () {
        return $injector.get('api');
    }, function () {
        return $injector.get('localStorage');
    });
}).factory('api', function ($resource) {
    'use strict';
    var store = {
        projects: [],
        api: $resource('/api/projects/:id', null, {
            update: {
                method: 'PUT'
            }
        }),        
        delete: function (project) {
            var originalProjects = store.projects.slice(0);
            store.projects.splice(store.projects.indexOf(project), 1);
            return store.api.delete({
                id: project.id
            }, function () {}, function error() {
                angular.copy(originalProjects, store.projects);
            });
        },
        get: function () {
            return store.api.query(function (resp) {
                angular.copy(resp, store.projects);
            });
        },
        insert: function (project) {
            var originalProjects = store.projects.slice(0);
            return store.api.save(project, function success(resp) {
                project.id = resp.id;
                store.projects.push(project);
            }, function error() {
                angular.copy(originalProjects, store.projects);
            }).$promise;
        },
        put: function (project) {
            return store.api.update({
                id: project.id
            }, project).$promise;
        }
    };
    return store;
}).factory('localStorage', function ($q) {
    'use strict';
    var STORAGE_ID = 'ProjectAnnouncement-projectsStorage';
    var store = {
        projects: [],
        _getFromLocalStorage: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },
        _saveToLocalStorage: function (projects) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(projects));
        },        
        delete: function (project) {
            var deferred = $q.defer();
            store.projects.splice(store.projects.indexOf(project), 1);
            store._saveToLocalStorage(store.projects);
            deferred.resolve(store.projects);
            return deferred.promise;
        },
        get: function () {
            var deferred = $q.defer();
            angular.copy(store._getFromLocalStorage(), store.projects);
            deferred.resolve(store.projects);
            return deferred.promise;
        },
        insert: function (project) {
            var deferred = $q.defer();
            store.projects.push(project);
            store._saveToLocalStorage(store.projects);
            deferred.resolve(store.projects);
            return deferred.promise;
        },
        put: function (project, index) {
            var deferred = $q.defer();
            store.projects[index] = project;
            store._saveToLocalStorage(store.projects);
            deferred.resolve(store.projects);
            return deferred.promise;
        }
    };
    return store;
});