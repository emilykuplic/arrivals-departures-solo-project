myApp.controller('AttendingController', function($http, $location, UserService, EventService) {
  console.log('AttendingController created');
  var vm = this;
  vm.userService = UserService;

  vm.data = EventService.data;
getAllPeople();

// vm.attendingThisEvent = function(){
//   var event_id = vm.data.selectedEvent.event_id;
//   console.log('attendingThisEvent function', event_id);
//   // giving the event_id from dropdown
//   console.log('its here');
//   // ajax call to server to get tasks
//
//   $http.get('/events/attending/' + event_id).then(function(response){
//     vm.peopleArray = response.data;
//     console.log('events.controller vm.peopleArray', vm.peopleArray);
//     //getAdminEvents();
//   }); // end success
// }; // end getPeopleAttendingEvent
  function getAllPeople(){
    var event_id = vm.data.selectedEvent.event_id;

    $http.get('/events/attending/' + event_id).then(function(response){
         vm.peopleArray = response.data;
         console.log('VANILLA PUDDING', vm.peopleArray);
       }); // end success
  }
});
