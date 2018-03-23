import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {getDoctorsBySpecialty} from './getDoctors';
import {getDoctorsByName} from './getDoctors';

$(function(){

  function displayData(results) {
    $('#results').empty();
    if(results.meta.count == 0){
      $('#results-error').text("No doctors found for your search query. Please try another term.")
    }
    else {
      $('#results-error').text("");
      for(var i = 0; i < results.meta.count; i++){
        let doctorName = `${results.data[i].profile.first_name} ${results.data[i].profile.last_name}`;
        let doctorAddress;
        if (results.data[i].practices[0].visit_address.street2 != undefined){
          doctorAddress = `${results.data[i].practices[0].visit_address.street}, ${results.data[i].practices[0].visit_address.street2}, ${results.data[i].practices[0].visit_address.city}`;
        }
        else {
          doctorAddress = `${results.data[i].practices[0].visit_address.street}, ${results.data[i].practices[0].visit_address.city}`;
        }
        let doctorPhoneNumber = results.data[i].practices[0].phones[0].number;
        let doctorWebsite = results.data[i].practices[0].website;
        if(doctorWebsite){
          doctorWebsite = `<a href="${doctorWebsite}">${doctorWebsite}</a>`;
        }
        else{
          doctorWebsite = "None found";
        }
        let doctorAcceptsNewPatients = results.data[i].practices[0].accepts_new_patients;
        if(doctorAcceptsNewPatients){
          doctorAcceptsNewPatients = "Yes";
        }
        else{
          doctorAcceptsNewPatients = "No";
        }

        $('#results').append(`
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">${doctorName}</h4>
              <p>Address: ${doctorAddress}</p>
              <p>Phone: ${doctorPhoneNumber}</p>
              <p>Website: ${doctorWebsite}</p>
              <p>Accepting new patients: ${doctorAcceptsNewPatients}</p>
            </div>
          </div>
        `);
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
      $('#results').empty();
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
      $('#results').empty();
      $('#results-error').text("Please enter a search term.");
    }
  })

});
