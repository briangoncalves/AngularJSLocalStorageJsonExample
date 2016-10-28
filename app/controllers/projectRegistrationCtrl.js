angular.module('projectAnnoucementApp').controller('projectRegistrationCtrl', function projectRegistrationCtrl($scope, store, $filter) {
    'use strict';
    var projects = $scope.projects = store.projects;    
    clearProject();

    function clearProject() {
    	$scope.project = {};
    	$scope.position = {};
    	$scope.project.name = "";
    	$scope.project.description = "";
    	$scope.project.positions = [];

    	$scope.position.name = "";
    	$scope.position.description = "";
    	$scope.position.technologies = "";
    }


    $scope.$watch('projects', function () {        
        $scope.numberOfProjects = projects.length;        
    }, true);

    $scope.insertProject = function(project, position) {
    	var projectFound = $filter('filter')(projects, {name: project.name});
    	if (projectFound.length > 0) {
    		project.positions = projectFound[0].positions;
    		if ($scope.position.name !== "") {
    			var positionFound = $filter('filter')(project.positions, {name: position.name});
    			if (positionFound.length > 0) {
					project.positions[project.positions.indexOf(positionFound[0])] = position;
    			} else {
    				project.positions.push($scope.position);	
    			}
				
			}
    		store.put(project, projects.indexOf(project)).then(function success() {    		
	            $.notify("Project " + project.name + " saved with success", "success");
				clearProject();
	        }, function error() {
				$.notify("Failed to save project " + project.name, "error");
	        });
    	} else {
    		if ($scope.position.name !== "") {
				$scope.project.positions.push($scope.position);
			}
	    	store.insert(project).then(function success() {    		
	            $.notify("Project " + project.name + " added with success", "success");
				clearProject();
	        }, function error() {
				$.notify("Failed to add project " + project.name, "error");
	        });
    	}    	
    };    

    $scope.select = function(project) {
    	$scope.project = {};
    	$scope.position = {};
    	$scope.project.name = project.name;
    	$scope.project.description = project.description;
    	$scope.project.positions = project.positions;

    	$scope.position.name = "";
    	$scope.position.description = "";
    	$scope.position.technologies = "";
    };
});