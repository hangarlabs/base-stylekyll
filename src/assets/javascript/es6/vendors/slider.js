module.exports = function () {
	var $scoreSlider = $('.cm-cdt-m-score-slider');

	if( $scoreSlider.length ) {

		$scoreSlider.eq(0).removeClass('hide');

		$scoreSlider.on('click', '.btn-primary', function(e) {
			e.preventDefault();
			var $thisScore = $(this).closest('.cm-cdt-m-score-slider'),
					$value = $thisScore.find('.tooltip-inner').text(),
					$score = $thisScore.find('.score');
			$thisScore.addClass('active');
			$thisScore.find('.score-container').slideUp();
			$score.text($value);

			if( $thisScore.next().hasClass('cm-cdt-m-score-slider') ) {
				$thisScore.next().removeClass('hide');
			} else if( $thisScore.next().hasClass('additional-comments') ) {
				$thisScore.next().removeClass('hide');
			}
		});

		$scoreSlider.on('click', 'h3', function() {
			var $thisScore = $(this).closest('.cm-cdt-m-score-slider');
			if( $thisScore.hasClass('active') ) {
				$thisScore.removeClass('active');
				$thisScore.find('.score-container').slideDown();
			}
		});

	}
}
