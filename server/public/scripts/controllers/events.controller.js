myApp.controller('EventsController', function($http, $location, UserService, EventService) {
  console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;

  vm.data = EventService.data;


  getAllEvents();
  getAdminEvents();

  function getAllEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getEvents


  function getAdminEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getAdminEvents

  //access from the view
  vm.getPendingEvent= function(selectedEvent){
    console.log('in getPendingEvent function', selectedEvent);
    vm.data.selectedEvent = selectedEvent;
    $location.path('/events/rsvp');
  }; // end getPendingEvents


  vm.rsvpEvents = function(selectedEvent){
      console.log( 'in rsvpEvents functon', selectedEvent);
      // ajax call to server to get tasks
      $http.put('/events/rsvp', vm.data).then(function(selectedEvent){
      }); // end success
    }; // end rsvpEvents

    vm.editEvents = function(selectedEvent){
        console.log( 'in editEvents functon', selectedEvent);
        // ajax call to server to get tasks
        $http.put('/events/edit', vm.data).then(function(selectedEvent){
        }); // end success
      }; // end editEvents


  }); //end of controller




function appendToDom(events){
  console.log('appendToDom');
}
