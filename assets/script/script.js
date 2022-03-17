// Defines global variables used in multiple functions

// Defines DOM items that need handlers

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
  //TODO: add function calls to set class for textarea based on current time.
}

// Declares event listeners

//TODO: currently this is for any click on the container... needs to be changed to be when current target is a saveBtn.
//TODO: this currently just runs the init function.  actual functionality should run a function to save typed data, and run the getTimeDate function
$('.container').on('click', init);

// Calls initiliaztion function
init();
