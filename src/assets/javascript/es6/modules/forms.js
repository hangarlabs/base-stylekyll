module.exports = function () {

	// FUNCTION: Update color and values depending on the input value.
	function scoreColors($target) {
		switch ( true ) {
		  case $target.val() >= 10:
		  	$target.val(10);
		    $target.addClass('color-perfect');
		    break;
		  case $target.val() < 10 && $target.val() >= 8:
		    $target.addClass('color-high');
		    break;
		  case $target.val() < 8 && $target.val() >= 6:
		    $target.addClass('color-medium');
		    break;
		  case $target.val() < 6 && $target.val() >= 1:
		    $target.addClass('color-low');
		    break;
		   case $target.val() !== '':
		    $target.val(1);
		    $target.addClass('color-low');
		    break;
		}
	}

	$('.js-score-input').each(function(index, value) {
		scoreColors( $(value) );
	});


	$('.js-score-input').on('keyup', function() {
	  var $this = $(this);

	  $this.removeClass (function (index, css) {
			return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
		});

		scoreColors( $this );
	});
}