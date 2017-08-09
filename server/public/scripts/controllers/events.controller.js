myApp.controller('EventsController', function($http, $location, UserService) {
  console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;


getEvents();

  function getEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
  vm.eventObject = response.data;
    console.log('events.controller vmeventObject', vm.eventObject);
  }); // end success
} // end getEvents
});





function appendToDom(events){
  console.log('appendToDom');
}
