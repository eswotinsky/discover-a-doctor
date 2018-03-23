import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {getDoctorsBySpecialty} from './getDoctors';
import {getDoctorsByName} from './getDoctors';

$(function(){

  function displayData(results) {
    $('#results-list').empty();
    if(results.meta.count == 0){
      $('#results-error').text("No doctors found for your search query. Please try another term.")
    }
    else {
      $('#results-error').text("");
      for(var i = 0; i < results.meta.count; i++){
        let doctorName = `${results.data[i].profile.first_name} ${results.data[i].profile.last_name}`;
        let doctorAddress = `${results.data[i].practices[0].visit_address.street}, ${results.data[i].practices[0].visit_address.street2}, ${results.data[i].practices[0].visit_address.city}`;
        let doctorPhoneNumber = results.data[i].practices[0].phones[0].number;
        let doctorWebsite = results.data[i].practices[0].website;
        let doctorAcceptsNewPatients = results.data[i].practices[0].accepts_new_patients;

        $('#results-list').append(`<li>${doctorName}<ul><li>${doctorAddress}</li><li>Phone: ${doctorPhoneNumber}</li><li>${doctorWebsite}</li><li>Accepting new patients: ${doctorAcceptsNewPatients}</li></ul></li>`);
      }
    }
  }

  $('#specialty-search-form').submit(function(event){
    event.preventDefault();

    let searchIssue = $('#search-issue').val();
    if(searchIssue != ""){
      let returnedDoctors = getDoctorsBySpecialty(searchIssue, displayData);
      displayData(returnedDoctors);
    }
    else{
      $('#results-list').empty();
      $('#results-error').text("Please enter a search term.");
    }
  })

  $('#name-search-form').submit(function(event){
    event.preventDefault();

    let searchName = $('#search-name').val();
    if(searchName != ""){
      let returnedDoctors = getDoctorsByName(searchName, displayData);
      displayData(returnedDoctors);
    }
    else{
      $('#results-list').empty();
      $('#results-error').text("Please enter a search term.");
    }
  })

});
