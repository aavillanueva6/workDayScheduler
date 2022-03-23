// Defines global variables used in multiple functions
let currentTime;
let storedText;

// Defines DOM items that need a handler
let textBlocks = $('#plannerDiv').children().children('.agendaItems');

// Declares functions

/**
 * function: no arguments
 * initializes window. used to update fields and call appropriate functions upon page load
 * calls in saved data for .agendaItems <textarea>s
 */
function init() {
  console.log('init called');
  getTimeDate();
  checkTimes();

  //getItems from localStorage to pull stored data and deliver it to the textareas
  $.each(textBlocks, function () {
    let timeBlockID = 'time' + $(this).attr('data-time');
    console.log(timeBlockID);
    $(this).val(localStorage.getItem(timeBlockID));
    console.log('line38');
  });
}

/**
 * function, no arguments
 * uses momentjs to pull the current time and date
 * current date is displayed in the #currentDay <p>
 * current time is used to update classes for .agendaItems <textarea>s
 */
function getTimeDate() {
  let now = moment();
  $('#currentDay').text(
    `${now.format('dddd')}, ${now.format('MMMM')} ${now.format(
      'Do'
    )}, ${now.format('YYYY')}`
  );
  currentTime = parseInt(now.format('HH'));
}

/**
 * function with no arguments.
 * Calls the getTimeDate function and updates the class for the time blocks based on what time it is when the funciton is called.
 */
function checkTimes() {
  getTimeDate();
  $.each(textBlocks, function () {
    let timeComparitor = parseInt($(this).attr('data-time'));
    if (timeComparitor < currentTime) {
      $(this).removeClass('future').removeClass('present').addClass('past');
    } else if (timeComparitor === currentTime) {
      $(this).removeClass('future').removeClass('past').addClass('present');
    } else {
      $(this).removeClass('past').removeClass('present').addClass('future');
    }
  });
}

// Declares event listeners
$('.container').on('click', '.saveBtn', function (event) {
  let btnClicked = $(event.currentTarget);
  let textAreaClicked = btnClicked.parent('div').children('textarea');

  // sets the textarea input to localStorage
  localStorage.setItem(
    'time' + textAreaClicked.attr('data-time'),
    textAreaClicked.val()
  );

  init();
});

// Calls initiliaztion function on page load
init();

// runs the checkTimes once every minute after the initial load.  This will pull the new current time from moment, and then update the time rows if needed.
setInterval(checkTimes, 60000);
