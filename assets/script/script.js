// Defines global variables used in multiple functions
let currentTime;
let storedText;

// Defines DOM items that need handlers
let mainContainer = $('#plannerDiv');
let textBlocks = mainContainer.children().children('.agendaItems');

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

  //getItems from localStorage to pull stored data and deliver it to the textareas
  textBlocks.eq(0).val(localStorage.getItem('time00'));
  textBlocks.eq(1).val(localStorage.getItem('time01'));
  textBlocks.eq(2).val(localStorage.getItem('time02'));
  textBlocks.eq(3).val(localStorage.getItem('time03'));
  textBlocks.eq(4).val(localStorage.getItem('time04'));
  textBlocks.eq(5).val(localStorage.getItem('time05'));
  textBlocks.eq(6).val(localStorage.getItem('time06'));
  textBlocks.eq(7).val(localStorage.getItem('time07'));
  textBlocks.eq(8).val(localStorage.getItem('time08'));
  textBlocks.eq(9).val(localStorage.getItem('time09'));
  textBlocks.eq(10).val(localStorage.getItem('time10'));
  textBlocks.eq(11).val(localStorage.getItem('time11'));
  textBlocks.eq(12).val(localStorage.getItem('time12'));
  textBlocks.eq(13).val(localStorage.getItem('time13'));
  textBlocks.eq(14).val(localStorage.getItem('time14'));
  textBlocks.eq(15).val(localStorage.getItem('time15'));
  textBlocks.eq(16).val(localStorage.getItem('time16'));
  textBlocks.eq(17).val(localStorage.getItem('time17'));
  textBlocks.eq(18).val(localStorage.getItem('time18'));
  textBlocks.eq(19).val(localStorage.getItem('time19'));
  textBlocks.eq(20).val(localStorage.getItem('time20'));
  textBlocks.eq(21).val(localStorage.getItem('time21'));
  textBlocks.eq(22).val(localStorage.getItem('time22'));
  textBlocks.eq(23).val(localStorage.getItem('time23'));
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
  getTimeDate();
  console.log('checkTimes called');
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
  console.log(event.currentTarget);
  let btnClicked = $(event.currentTarget);
  let parentOfBtn = btnClicked.parent('div');
  let textAreaClicked = parentOfBtn.children('textarea');

  // sets the textarea input to localStorage
  localStorage.setItem(
    'time' + textAreaClicked.attr('data-time'),
    textAreaClicked.val()
  );

  init();
});

// Calls initiliaztion function
init();

// runs the checkTimes once every minute after the initial load.  This will pull the new current time from moment, and then update the time rows if needed.
setInterval(checkTimes, 60000);
