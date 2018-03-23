import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {getDoctors} from './getDoctors';

$(function(){

  function displayData(results) {
    $('#results-list').empty();
    if(results.meta.count == 0){
      $('#results-error').text("No doctors found for your search query. Please try another term.")
    }
    else {
      $('#results-error').text("");
      for(var i = 0; i < results.meta.count; i++){
        $('#results-list').append(`<li>${results.data[i].profile.first_name} ${results.data[i].profile.last_name}</li>`);
      }
    }
  }

  $('#search-form').submit(function(event){
    event.preventDefault();

    let searchIssue = $('#search-issue').val();

    if(searchIssue != ""){
      let returnedDoctors = getDoctors(searchIssue, displayData);
      displayData(returnedDoctors);
    }
    else{
      $('#results-error').text("Please enter a search term.");
    }


  })
});
