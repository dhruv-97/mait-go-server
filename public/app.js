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
  .controller('MyCtrl',['$scope','$http','$window',function($scope,$http,$window){
    $scope.assignment={
        files:[]
    };
    $scope.sendAssignment = function () {
            console.log($scope.assignment);
            $scope.assignment.group=jsUcfirst($scope.assignment.group);
            var assignmentObj= angular.toJson($scope.assignment);
            $http.post('https://agile-hamlet-82527.herokuapp.com/assignment',assignmentObj,{
            headers: { 'Content-Type': 'application/json'}
        }).success(function(data, status, headers, config) {
                    alert("Success!");
                    $window.location.reload();
                   }).error(function(data, status, headers, config) {
                     alert("Error");
                  });
              };
    
    function uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            $scope.assignment.files.push(url);
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `assignment/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }
    (() => {
        document.getElementById('file-input').onchange = initUpload;
    })();

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    function initUpload(){
      const files = document.getElementById('file-input').files;
      if(files.length == 0){
        return alert('No file selected.');
      }
      for(var i=0; i<files.length; i++)
        getSignedRequest(files[i]);
    }
    
    
}])
.controller('MyCtrl2',['$scope','$http','$window',function($scope,$http,$window){
    $scope.upcoming={};
    $scope.sendUpcoming = function () {
            console.log($scope.upcoming);
            var upcomingObj= angular.toJson($scope.upcoming);
            $http.post('http://localhost:3000/upcoming',upcomingObj,{
            headers: { 'Content-Type': 'application/json'}
        }).success(function(data, status, headers, config) {
                    alert("Success!");
                    $window.location.reload();
                   }).error(function(data, status, headers, config) {
                     alert("Error");
                  });
              };
    
    function uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log(url);
            $scope.upcoming.imageUrl=url;
          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `upcoming/sign-s3?file-name=${file.name}&file-type=${file.type}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }
    (() => {
        document.getElementById('file-input').onchange = initUpload;
    })();

    /*
     Function called when file input updated. If there is a file selected, then
     start upload procedure by asking for a signed request from the app.
    */
    function initUpload(){
      const files = document.getElementById('file-input').files;
      if(files.length == 0){
        return alert('No file selected.');
      }
      getSignedRequest(files[0]);
    }
    
    
}])
;