myApp.controller('EventsController', function($http, $location, UserService, EventService) {
  console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;

  vm.data = EventService.data;


  getAllEvents();

  function getAllEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getEvents

  //access from the view
  vm.getPendingEvent= function(selectedEvent){
    console.log('in getPendingEvent function', selectedEvent);
    EventService.data.selectedEvent = selectedEvent;
    $location.path('/events/rsvp');
  // $http.get('/events/invitation/'+ selectedEvent.event_id).then(function(response){
  //   vm.pendingEvent = response.data;
  //   // returns the invitation id
  //   console.log('events.controller vmeventObject', vm.pendingEvent);
  // }); // end success
  } // end getPendingEvents

    // function rsvpEvents(eventId){
    //   console.log( 'in getEvents function' );
    //   // ajax call to server to get tasks
    //   $http.put('/events/rsvp/' + eventId).then(function(response){
    //     console.log('events.controller vmeventObject', vm.eventObject);
    //   }); // end success
    // } // end getEvents

  }); //end of controller


function rsvp(){

}


function appendToDom(events){
  console.log('appendToDom');
}
