function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
angular.module('formExample', ['ngFileUpload'])
	.config(function ($httpProvider) {
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	})
      .controller('formController', ['$scope', '$http', function($scope, $http) {
      	$scope.timetable = {};
      var time= angular.toJson($scope.timetable);
	    $scope.sendTimeTable = function () {
            $scope.timetable.group=jsUcfirst($scope.timetable.group);
            var time= angular.toJson($scope.timetable);
		        $http.post('https://agile-hamlet-82527.herokuapp.com/timetable',time,{
        headers: { 'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config) {
	              alert("Success!")
	             }).error(function(data, status, headers, config) {
	               alert("Error");
	            });
	        };
      }])
  .controller('announcementController', ['$scope', '$http', function($scope, $http) {
    $scope.announcement={};
    $scope.sendAnnouncement = function () {
            $scope.announcement.group=jsUcfirst($scope.announcement.group);
            var announcementObj= angular.toJson($scope.announcement);
            $http.post('https://agile-hamlet-82527.herokuapp.com/announcement',announcementObj,{
            headers: { 'Content-Type': 'application/json'}
        }).success(function(data, status, headers, config) {
                    alert("Success!")
                   }).error(function(data, status, headers, config) {
                     alert("Error");
                  });
              };
  }])
  .controller('MyCtrl',['$scope','Upload','$window',function($scope,Upload,$window){
    $scope.assignment={};
    $scope.submit = function(){ //function to call on form submit
        //check if from is valid
        if ($scope.form.file.$valid && $scope.file) {
            console.log($scope.assignment);
            $scope.upload($scope.file); 
        }//call upload function
    }
    
    $scope.upload = function (file) {
        Upload.upload({
            url: 'https://agile-hamlet-82527.herokuapp.com/assignment',
            data: {file: file, 
            'name':$scope.assignment.name,
            'sem':$scope.assignment.sem,
            'group':$scope.assignment.group,
            'subject':$scope.assignment.subject,
            'marks':$scope.assignment.marks,
            'last':$scope.assignment.last
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}])
;