module.exports = function () {
	var $dropownSelect 				= $('.cm-cdt-m-dropdown.is-select'),
			$dropownAutocomplete  = $('.cm-cdt-m-dropdown.is-autocomplete');

	// Add Arrow on Select Dropdowns.
	var $selectAddArrow = function() {
		$(this.$control[0]).append('<svg class="icon icon-arrow"><use xlink:href="#arrow"></use></svg>');
	};

	// Initialize Select Dropdowns with Selectize.
	$dropownSelect.find('select').selectize({
		hideSelected: true,
		onInitialize: $selectAddArrow,
		onChange: $selectAddArrow
	});

	// Initialize Autcomplete Dropdowns with Selectize.
	$dropownAutocomplete.find('select').selectize({
		hideSelected: true,
		searchField: ['text', 'title'],
		maxOptions: 3,
		options: [],
		create: false,
		render: {
			option: function(item, escape) {
				return `<div id="${escape(item.value)}" class="option" data-email="${escape(item.email)}">
					<img src="${escape(item.image)}" alt="${escape(item.text)}">
					<div>
						<p>${escape(item.text)}</p>
						<h6><span>${escape(item.title)}</span></h6>
					</div>
				</div>`;
			},
			item: function(item, escape) {
				return `<div class="item" data-email="${escape(item.email)}">${escape(item.text)}</div>`;
			}
		},
		load: function(query, callback) {
			var url = $(this.$control[0]).closest('.cm-cdt-m-dropdown').find('select').data('url');
      if (!query.length) return callback();
      $.ajax({
        url: url,
        type: 'GET',
        error: function() {
          callback();
        },
        success: function(data) {
          callback(data);
        }
      });
    },
		onChange: function(value) {
			var $this 								 = $(this.$control[0]).closest('.cm-cdt-m-dropdown'),
					$optionText 					 = $this.find('option:selected').text(),
					$evaluator 						 = $this.find('.selectize-who-evaluator'),
					$relationshipEvaluator = $this.find('.selectize-relationship-evaluator'),
					$relationshipInput 		 = $this.find('.selectize-relationship-input'),
					$secondSteps 					 = $this.find('.selectize-second-steps');
			
			if(value) {
				$evaluator.find('.selectize-dynamic-value').text(`${$optionText}`);
				$relationshipEvaluator.find('.selectize-dynamic-value').text($optionText.split(' ')[0]);
				$secondSteps.removeClass('hide');
				$relationshipInput.focus();
			} else {
				$secondSteps.addClass('hide');
			}
		}
	});

	// Regular Employee Suggest Peers Functionality
	if( $dropownAutocomplete.length ) {
		$dropownAutocomplete.eq(0).removeClass('hide');

		$dropownAutocomplete.on('click', '.js-suggest-peer', function(e) {
			e.preventDefault();
			var $this 						 = $(this).closest('.cm-cdt-m-dropdown'),
					$relationshipInput = $this.find('.selectize-relationship-input'),
					$evaluator 				 = $this.find('.js-suggest-peer').find('.selectize-dynamic-value');

			if( $relationshipInput.val().length ) {
				$evaluator.text( $this.find('.item').text() + ', ' + $relationshipInput.val() );
			}
			$this.toggleClass('active');
			$this.find('.selectize-who-evaluator').toggleClass('hide');
			$this.find('.slide-evaluator').slideToggle();

			if( $this.next().hasClass('cm-cdt-m-dropdown') && $('.cm-cdt-m-dropdown:visible').length < 3 ) {
				$this.next().removeClass('hide');
			}

			if( $('.cm-cdt-m-dropdown.active').length >= 3 ) {
				$('.suggest-peers-btns').removeClass('hide');
			} else {
				$('.suggest-peers-btns').addClass('hide');
			}
		});

		$('.js-add-new-peer').on('click', function(e) {
			e.preventDefault();
			$dropownAutocomplete.eq( $('.cm-cdt-m-dropdown:visible').length ).removeClass('hide');

			if( $('.cm-cdt-m-dropdown:visible').length === 10 ) {
				$(this).addClass('hide');
			}
		});
	}
}