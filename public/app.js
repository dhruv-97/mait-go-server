function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
angular.module('formExample', [])
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
	      
	            $scope.timetableForm.$setPristine();
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
;