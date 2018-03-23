import $ from 'jquery';
export function getDoctors(medicalIssue, displayData) { //displayData will be a method in main.js to output results to screen
    const location = "47.607424,-122.335993,75"; //1201 Third Avenue, Seattle, WA 98101, USA - display docs within 75 mile radius
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${medicalIssue}&location=${location}&skip=0&limit=20&user_key=${process.env.exports.apiKey}`)
    .then(function(results) {
      displayData(results);
    })
    .fail(function(error){
       $('#results-error').text(`Error ${error.meta.http_status_code}. Please try again in a moment. If the problem continues, <a href="https://github.com/eswotinsky/discover-a-doctor">contact this application\'s developer</a> for assistance.`);
     });
}
