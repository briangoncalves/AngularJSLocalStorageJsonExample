angular.module('projectAnnoucementApp').controller('projectAnnoucementCtrl', function projectAnnoucementCtrl($rootScope, $scope, store) {
    'use strict';
    var projects = $scope.projects = store.projects;    
    $scope.userName = $rootScope.globals.currentUser.username;
    $scope.filterProject = "";

    $scope.$watch('projects', function () {        
        $scope.numberOfProjects = projects.length;        
    }, true);

    $scope.applyForProject = function(project, position) {
        if (!position.applications) {
            position.applications = [];
        }
        position.applications.push($scope.userName);
        project.positions[project.positions.indexOf(position)] = position;
        store.put(project, projects.indexOf(project)).then(function success() {
            $.notify("Applied for project " + project.name + " with success", "success");
        }, function error() {
            projects.splice(projects.indexOf(project), 1);
            $.notify("Failed to apply for project " + project.name, "error");
        });
    };
});