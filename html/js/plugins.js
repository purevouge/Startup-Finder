// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// initialize 
$(document).ready(function() {
	// wow animation
	new WOW().init();
	// add sorting and responsiveness to data table
	var checkExist = setInterval(function() {
	   if ($('#data_grid table').length) {
		  $("#data_grid table").addClass("tablesorter table grid footable"); 
		  $("#data_grid th").addClass("pressed"); 
		  $('#data_grid th').attr('data-hide','phone,tablet');
		  $('#data_grid th:first-of-type').attr('data-hide','');
		  $('#data_grid th:nth-of-type(2)').attr('data-hide','');
		  $("#data_grid table").tablesorter();
		  
		  $("#data_grid tr").each(function () {

			  $('td:contains("http://")', this).each(function () {
				  var imgLnk = $(this).text();
				  $(this).html("<img src='" + imgLnk + "'>");
			  })
			   
			  $('td:contains(".com")', this).each(function () {
				  var siteLnk = $(this).text();
				  $(this).html("<a target='_blank' href='http://" + siteLnk + "'>" + siteLnk + "</a>");
			  })
			   
			  $('#data_grid th:first-of-type').html("#");
			  $('#data_grid td:first-of-type').html("<a href='javascript:void(0);'><i class='fa fa-eye'></i></a>");
			   
			   
			  $('td:last-of-type:contains("no")', this).each(function () {				   
			  		$(this).closest('tr').find('td:first-of-type > a > i').toggleClass('fa-eye-slash').css('color', '#fff');
			  })
		  })
		  
		  // responsive data table
		  $('.footable').footable({
			calculateWidthOverride: function() {
			  return { width: $(window).width() };
			}
		  });
		  if (!$('.footable').is(':visible')) {
		  	return;
		  }
		  $('.footable').trigger('footable_initialize');
		  
		  clearInterval(checkExist);
	   }
	}, 100);		
});
