module.exports = function () {
	var $search = $('.cm-cdt-m-search');

	// Add active class on anchor click - animation of width
	$search.on('click', '#search', function(e) {
		e.stopPropagation();
		if( !$search.hasClass('active') ) {
			e.preventDefault();
			$search.addClass('active');
			$search.find('.cm-cdt-m-dropdown').find('select')[0].selectize.open();
		}
	});
}