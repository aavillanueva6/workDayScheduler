// Defines global variables used in multiple functions
let currentTime;
let storedText;

// Defines DOM items that need handlers
let mainContainer = $('#plannerDiv');
let textBlocks = mainContainer.children().children('.agendaItems');
// console.log(textBlocks);

// Defines items that will utilize click handlers

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

  //TODO: add function calls to set class for textarea based on current time.
}

function checkTimes() {
  $.each(textBlocks, function () {
    let timeComparitor = parseInt($(this).attr('data-time'));
    if (timeComparitor < currentTime) {
      $(this).removeClass('future').removeClass('present').addClass('past');
    } else if (timeComparitor === currentTime) {
      $(this).removeClass('future').removeClass('past').addClass('present');
      return;
    } else {
      $(this).removeClass('past').removeClass('present').addClass('future');
    }
  });
}

// Declares event listeners

//TODO: currently this is for any click on the container... needs to be changed to be when current target is a saveBtn.
//TODO: this currently just runs the init function.  actual functionality should run a function to save typed data, and run the getTimeDate function
$('.container').on('click', '.saveBtn', function (event) {
  let btnClicked = $(event.target);
  let parentOfBtn = btnClicked.parent('div');
  let textAreaClicked = parentOfBtn.children('textarea');

  console.log(parseInt(textAreaClicked.attr('data-time')));
  let newItem = {
    text: textAreaClicked.val(),
    timeSlot: textAreaClicked.attr('data-time'),
  };
  console.log(newItem);
  init();
});

// Calls initiliaztion function
init();
