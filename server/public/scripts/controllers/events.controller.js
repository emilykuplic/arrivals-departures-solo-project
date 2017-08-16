myApp.controller('EventsController', function($http, $location, UserService, EventService) {
  // console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;

  vm.data = EventService.data;


  getAllEvents();
  getAdminEvents();
  getUsers();

  function getAllEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getEvents

  function getUsers(){
    console.log( 'in getUsers function' );
    // ajax call to server to get tasks
    $http.get('/events/create').then(function(response){
      vm.userObject = response.data;
      console.log('events.controller vmuserObject', vm.userObject);
    }); // end success
  } // end getEvents

  function getAdminEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events/admin').then(function(response){
      vm.allEventsObject = response.data;
      console.log('events.controller vm.allEventsObject', vm.allEventsObject);
    }); // end success
  } // end getAdminEvents

  //access from the view
  vm.getPendingEvent= function(selectedEvent){
    console.log('in getPendingEvent function', selectedEvent);
    vm.data.selectedEvent = selectedEvent;
    $location.path('/events/rsvp');
  }; // end getPendingEvents

  //access from the view
  vm.rsvpEvent = function(selectedEvent){
      console.log( 'in rsvpEvents functon', selectedEvent);
      // ajax call to server to get tasks
      $http.put('/events/rsvp', vm.data).then(function(selectedEvent){
      }); // end success
    }; // end rsvpEvents

    vm.editThisEvent= function(selectedEvent){
      console.log('in editThisEvent function', selectedEvent);
      vm.data.selectedEvent = selectedEvent;
      vm.data.selectedEvent.starting_date = new Date(vm.data.selectedEvent.starting_date);
      vm.data.selectedEvent.ending_date = new Date(vm.data.selectedEvent.ending_date);
      $location.path('/events/edit');
    }; // end editThisEvents

    //access from the view
    vm.editEvent = function(selectedEvent){
        console.log( 'in editEvents functon', selectedEvent);
        // ajax call to server to get tasks
        $http.put('/events/edit', vm.data).then(function(selectedEvent){
        }); // end success
      }; // end editEvent

      vm.deleteThisEvent = function(selectedEvent){
          console.log( 'in deleteEvents functon', selectedEvent);
          vm.data.selectedEvent = selectedEvent;
          // ajax call to server to get tasks
          $http.delete('/events/edit/' + selectedEvent.id).then(function(selectedEvent){
              getAdminEvents();
          }); // end success
        }; // end editEvents

    vm.createEvent = function(createEvent){
        console.log( 'in createEvent functon');
        // ajax call to server to get tasks
        $http.post('/events/create', createEvent ).then(function(response){
          console.log('events.controller vmeventObject');
        }); // end success
      }; // end editEvents


  }); //end of controller




function appendToDom(events){
  console.log('appendToDom');
}
