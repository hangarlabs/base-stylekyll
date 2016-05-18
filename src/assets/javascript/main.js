(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Import Search

var _search = require("./modules/search");

var _search2 = _interopRequireDefault(_search);

var _forms = require("./modules/forms");

var _forms2 = _interopRequireDefault(_forms);

var _selectize = require("./vendors/selectize");

var _selectize2 = _interopRequireDefault(_selectize);

var _slider = require("./vendors/slider");

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// jQuery DOM Ready


// Import Selectize
$(function () {
  'use strict';

  // Initialize Search

  (0, _search2.default)();

  // Initialize Forms
  (0, _forms2.default)();

  // Initialize Slider
  (0, _slider2.default)();

  // Initialize Selectize
  (0, _selectize2.default)();
});

// Import Slider


// Import Forms

},{"./modules/forms":2,"./modules/search":3,"./vendors/selectize":4,"./vendors/slider":5}],2:[function(require,module,exports){
'use strict';

module.exports = function () {

	// FUNCTION: Update color and values depending on the input value.
	function scoreColors($target) {
		switch (true) {
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

	$('.js-score-input').each(function (index, value) {
		scoreColors($(value));
	});

	$('.js-score-input').on('keyup', function () {
		var $this = $(this);

		$this.removeClass(function (index, css) {
			return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
		});

		scoreColors($this);
	});
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function () {
	var $search = $('.cm-cdt-m-search');

	// Add active class on anchor click - animation of width
	$search.on('click', '#search', function (e) {
		e.stopPropagation();
		if (!$search.hasClass('active')) {
			e.preventDefault();
			$search.addClass('active');
			$search.find('.cm-cdt-m-dropdown').find('select')[0].selectize.open();
		}
	});
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function () {
	var $dropownSelect = $('.cm-cdt-m-dropdown.is-select'),
	    $dropownAutocomplete = $('.cm-cdt-m-dropdown.is-autocomplete');

	// Add Arrow on Select Dropdowns.
	var $selectAddArrow = function $selectAddArrow() {
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
			option: function option(item, escape) {
				return '<div id="' + escape(item.value) + '" class="option" data-email="' + escape(item.email) + '">\n\t\t\t\t\t<img src="' + escape(item.image) + '" alt="' + escape(item.text) + '">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p>' + escape(item.text) + '</p>\n\t\t\t\t\t\t<h6><span>' + escape(item.title) + '</span></h6>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
			},
			item: function item(_item, escape) {
				return '<div class="item" data-email="' + escape(_item.email) + '">' + escape(_item.text) + '</div>';
			}
		},
		load: function load(query, callback) {
			var url = $(this.$control[0]).closest('.cm-cdt-m-dropdown').find('select').data('url');
			if (!query.length) return callback();
			$.ajax({
				url: url,
				type: 'GET',
				error: function error() {
					callback();
				},
				success: function success(data) {
					callback(data);
				}
			});
		},
		onChange: function onChange(value) {
			var $this = $(this.$control[0]).closest('.cm-cdt-m-dropdown'),
			    $optionText = $this.find('option:selected').text(),
			    $evaluator = $this.find('.selectize-who-evaluator'),
			    $relationshipEvaluator = $this.find('.selectize-relationship-evaluator'),
			    $relationshipInput = $this.find('.selectize-relationship-input'),
			    $secondSteps = $this.find('.selectize-second-steps');

			if (value) {
				$evaluator.find('.selectize-dynamic-value').text('' + $optionText);
				$relationshipEvaluator.find('.selectize-dynamic-value').text($optionText.split(' ')[0]);
				$secondSteps.removeClass('hide');
				$relationshipInput.focus();
			} else {
				$secondSteps.addClass('hide');
			}
		}
	});

	// Regular Employee Suggest Peers Functionality
	if ($dropownAutocomplete.length) {
		$dropownAutocomplete.eq(0).removeClass('hide');

		$dropownAutocomplete.on('click', '.js-suggest-peer', function (e) {
			e.preventDefault();
			var $this = $(this).closest('.cm-cdt-m-dropdown'),
			    $relationshipInput = $this.find('.selectize-relationship-input'),
			    $evaluator = $this.find('.js-suggest-peer').find('.selectize-dynamic-value');

			if ($relationshipInput.val().length) {
				$evaluator.text($this.find('.item').text() + ', ' + $relationshipInput.val());
			}
			$this.toggleClass('active');
			$this.find('.selectize-who-evaluator').toggleClass('hide');
			$this.find('.slide-evaluator').slideToggle();

			if ($this.next().hasClass('cm-cdt-m-dropdown') && $('.cm-cdt-m-dropdown:visible').length < 3) {
				$this.next().removeClass('hide');
			}

			if ($('.cm-cdt-m-dropdown.active').length >= 3) {
				$('.suggest-peers-btns').removeClass('hide');
			} else {
				$('.suggest-peers-btns').addClass('hide');
			}
		});

		$('.js-add-new-peer').on('click', function (e) {
			e.preventDefault();
			$dropownAutocomplete.eq($('.cm-cdt-m-dropdown:visible').length).removeClass('hide');

			if ($('.cm-cdt-m-dropdown:visible').length === 10) {
				$(this).addClass('hide');
			}
		});
	}
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function () {
	var $scoreSlider = $('.cm-cdt-m-score-slider');

	if ($scoreSlider.length) {

		$scoreSlider.eq(0).removeClass('hide');

		$scoreSlider.on('click', '.btn-primary', function (e) {
			e.preventDefault();
			var $thisScore = $(this).closest('.cm-cdt-m-score-slider'),
			    $value = $thisScore.find('.tooltip-inner').text(),
			    $score = $thisScore.find('.score');
			$thisScore.addClass('active');
			$thisScore.find('.score-container').slideUp();
			$score.text($value);

			if ($thisScore.next().hasClass('cm-cdt-m-score-slider')) {
				$thisScore.next().removeClass('hide');
			} else if ($thisScore.next().hasClass('additional-comments')) {
				$thisScore.next().removeClass('hide');
			}
		});

		$scoreSlider.on('click', 'h3', function () {
			var $thisScore = $(this).closest('.cm-cdt-m-score-slider');
			if ($thisScore.hasClass('active')) {
				$thisScore.removeClass('active');
				$thisScore.find('.score-container').slideDown();
			}
		});
	}
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2phdmFzY3JpcHQvZXM2L21haW4uanMiLCJzcmMvYXNzZXRzL2phdmFzY3JpcHQvZXM2L21vZHVsZXMvZm9ybXMuanMiLCJzcmMvYXNzZXRzL2phdmFzY3JpcHQvZXM2L21vZHVsZXMvc2VhcmNoLmpzIiwic3JjL2Fzc2V0cy9qYXZhc2NyaXB0L2VzNi92ZW5kb3JzL3NlbGVjdGl6ZS5qcyIsInNyYy9hc3NldHMvamF2YXNjcmlwdC9lczYvdmVuZG9ycy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUdBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUdBOzs7Ozs7Ozs7O0FBR0EsRUFBRSxZQUFNO0FBQ047OztBQURNO0FBSU47OztBQUpNLHNCQU9OOzs7QUFQTSx1QkFVTjs7O0FBVk0sMEJBYU4sR0FiTTtDQUFOLENBQUY7Ozs7Ozs7Ozs7QUNmQSxPQUFPLE9BQVAsR0FBaUIsWUFBWTs7O0FBRzVCLFVBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QjtBQUM3QixVQUFTLElBQVQ7QUFDRSxRQUFLLFFBQVEsR0FBUixNQUFpQixFQUFqQjtBQUNKLFlBQVEsR0FBUixDQUFZLEVBQVosRUFERDtBQUVFLFlBQVEsUUFBUixDQUFpQixlQUFqQixFQUZGO0FBR0UsVUFIRjtBQURGLFFBS08sUUFBUSxHQUFSLEtBQWdCLEVBQWhCLElBQXNCLFFBQVEsR0FBUixNQUFpQixDQUFqQjtBQUN6QixZQUFRLFFBQVIsQ0FBaUIsWUFBakIsRUFERjtBQUVFLFVBRkY7QUFMRixRQVFPLFFBQVEsR0FBUixLQUFnQixDQUFoQixJQUFxQixRQUFRLEdBQVIsTUFBaUIsQ0FBakI7QUFDeEIsWUFBUSxRQUFSLENBQWlCLGNBQWpCLEVBREY7QUFFRSxVQUZGO0FBUkYsUUFXTyxRQUFRLEdBQVIsS0FBZ0IsQ0FBaEIs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LFdBQVcsSUFBWCxHQUFrQixRQUFsQixDQUEyQix1QkFBM0IsQ0FBSixFQUEwRDtBQUN6RCxlQUFXLElBQVgsR0FBa0IsV0FBbEIsQ0FBOEIsTUFBOUIsRUFEeUQ7SUFBMUQsTUFFTyxJQUFJLFdBQVcsSUFBWCxHQUFrQixRQUFsQixDQUEyQixxQkFBM0IsQ0FBSixFQUF3RDtBQUM5RCxlQUFXLElBQVgsR0FBa0IsV0FBbEIsQ0FBOEIsTUFBOUIsRUFEOEQ7SUFBeEQ7R0FYaUMsQ0FBekMsQ0FKeUI7O0FBb0J6QixlQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsWUFBVztBQUN6QyxPQUFJLGFBQWEsRUFBRSxJQUFGLEVBQVEsT0FBUixDQUFnQix3QkFBaEIsQ0FBYixDQURxQztBQUV6QyxPQUFJLFdBQVcsUUFBWCxDQUFvQixRQUFwQixDQUFKLEVBQW9DO0FBQ25DLGVBQVcsV0FBWCxDQUF1QixRQUF2QixFQURtQztBQUVuQyxlQUFXLElBQVgsQ0FBZ0Isa0JBQWhCLEVBQW9DLFNBQXBDLEdBRm1DO0lBQXBDO0dBRjhCLENBQS9CLENBcEJ5QjtFQUExQjtDQUhnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8vIEltcG9ydCBTZWFyY2hcbmltcG9ydCBzZWFyY2ggZnJvbSBcIi4vbW9kdWxlcy9zZWFyY2hcIjtcblxuLy8gSW1wb3J0IEZvcm1zXG5pbXBvcnQgZm9ybXMgZnJvbSBcIi4vbW9kdWxlcy9mb3Jtc1wiO1xuXG4vLyBJbXBvcnQgU2VsZWN0aXplXG5pbXBvcnQgc2VsZWN0aXplIGZyb20gXCIuL3ZlbmRvcnMvc2VsZWN0aXplXCI7XG5cbi8vIEltcG9ydCBTbGlkZXJcbmltcG9ydCBzbGlkZXIgZnJvbSBcIi4vdmVuZG9ycy9zbGlkZXJcIjtcblxuLy8galF1ZXJ5IERPTSBSZWFkeVxuJCgoKSA9PiB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBJbml0aWFsaXplIFNlYXJjaFxuICBzZWFyY2goKTtcblxuICAvLyBJbml0aWFsaXplIEZvcm1zXG4gIGZvcm1zKCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBTbGlkZXJcbiAgc2xpZGVyKCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBTZWxlY3RpemVcbiAgc2VsZWN0aXplKCk7XG5cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0Ly8gRlVOQ1RJT046IFVwZGF0ZSBjb2xvciBhbmQgdmFsdWVzIGRlcGVuZGluZyBvbiB0aGUgaW5wdXQgdmFsdWUuXG5cdGZ1bmN0aW9uIHNjb3JlQ29sb3JzKCR0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKCB0cnVlICkge1xuXHRcdCAgY2FzZSAkdGFyZ2V0LnZhbCgpID49IDEwOlxuXHRcdCAgXHQkdGFyZ2V0LnZhbCgxMCk7XG5cdFx0ICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2NvbG9yLXBlcmZlY3QnKTtcblx0XHQgICAgYnJlYWs7XG5cdFx0ICBjYXNlICR0YXJnZXQudmFsKCkgPCAxMCAmJiAkdGFyZ2V0LnZhbCgpID49IDg6XG5cdFx0ICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2NvbG9yLWhpZ2gnKTtcblx0XHQgICAgYnJlYWs7XG5cdFx0ICBjYXNlICR0YXJnZXQudmFsKCkgPCA4ICYmICR0YXJnZXQudmFsKCkgPj0gNjpcblx0XHQgICAgJHRhcmdldC5hZGRDbGFzcygnY29sb3ItbWVkaXVtJyk7XG5cdFx0ICAgIGJyZWFrO1xuXHRcdCAgY2FzZSAkdGFyZ2V0LnZhbCgpIDwgNiAmJiAkdGFyZ2V0LnZhbCgpID49IDE6XG5cdFx0ICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2NvbG9yLWxvdycpO1xuXHRcdCAgICBicmVhaztcblx0XHQgICBjYXNlICR0YXJnZXQudmFsKCkgIT09ICcnOlxuXHRcdCAgICAkdGFyZ2V0LnZhbCgxKTtcblx0XHQgICAgJHRhcmdldC5hZGRDbGFzcygnY29sb3ItbG93Jyk7XG5cdFx0ICAgIGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdCQoJy5qcy1zY29yZS1pbnB1dCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG5cdFx0c2NvcmVDb2xvcnMoICQodmFsdWUpICk7XG5cdH0pO1xuXG5cblx0JCgnLmpzLXNjb3JlLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG5cdCAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuXHQgICR0aGlzLnJlbW92ZUNsYXNzIChmdW5jdGlvbiAoaW5kZXgsIGNzcykge1xuXHRcdFx0cmV0dXJuIChjc3MubWF0Y2ggKC8oXnxcXHMpY29sb3ItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuXHRcdH0pO1xuXG5cdFx0c2NvcmVDb2xvcnMoICR0aGlzICk7XG5cdH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgJHNlYXJjaCA9ICQoJy5jbS1jZHQtbS1zZWFyY2gnKTtcblxuXHQvLyBBZGQgYWN0aXZlIGNsYXNzIG9uIGFuY2hvciBjbGljayAtIGFuaW1hdGlvbiBvZiB3aWR0aFxuXHQkc2VhcmNoLm9uKCdjbGljaycsICcjc2VhcmNoJywgZnVuY3Rpb24oZSkge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0aWYoICEkc2VhcmNoLmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRzZWFyY2guYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JHNlYXJjaC5maW5kKCcuY20tY2R0LW0tZHJvcGRvd24nKS5maW5kKCdzZWxlY3QnKVswXS5zZWxlY3RpemUub3BlbigpO1xuXHRcdH1cblx0fSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciAkZHJvcG93blNlbGVjdCBcdFx0XHRcdD0gJCgnLmNtLWNkdC1tLWRyb3Bkb3duLmlzLXNlbGVjdCcpLFxuXHRcdFx0JGRyb3Bvd25BdXRvY29tcGxldGUgID0gJCgnLmNtLWNkdC1tLWRyb3Bkb3duLmlzLWF1dG9jb21wbGV0ZScpO1xuXG5cdC8vIEFkZCBBcnJvdyBvbiBTZWxlY3QgRHJvcGRvd25zLlxuXHR2YXIgJHNlbGVjdEFkZEFycm93ID0gZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzLiRjb250cm9sWzBdKS5hcHBlbmQoJzxzdmcgY2xhc3M9XCJpY29uIGljb24tYXJyb3dcIj48dXNlIHhsaW5rOmhyZWY9XCIjYXJyb3dcIj48L3VzZT48L3N2Zz4nKTtcblx0fTtcblxuXHQvLyBJbml0aWFsaXplIFNlbGVjdCBEcm9wZG93bnMgd2l0aCBTZWxlY3RpemUuXG5cdCRkcm9wb3duU2VsZWN0LmZpbmQoJ3NlbGVjdCcpLnNlbGVjdGl6ZSh7XG5cdFx0aGlkZVNlbGVjdGVkOiB0cnVlLFxuXHRcdG9uSW5pdGlhbGl6ZTogJHNlbGVjdEFkZEFycm93LFxuXHRcdG9uQ2hhbmdlOiAkc2VsZWN0QWRkQXJyb3dcblx0fSk7XG5cblx0Ly8gSW5pdGlhbGl6ZSBBdXRjb21wbGV0ZSBEcm9wZG93bnMgd2l0aCBTZWxlY3RpemUuXG5cdCRkcm9wb3duQXV0b2NvbXBsZXRlLmZpbmQoJ3NlbGVjdCcpLnNlbGVjdGl6ZSh7XG5cdFx0aGlkZVNlbGVjdGVkOiB0cnVlLFxuXHRcdHNlYXJjaEZpZWxkOiBbJ3RleHQnLCAndGl0bGUnXSxcblx0XHRtYXhPcHRpb25zOiAzLFxuXHRcdG9wdGlvbnM6IFtdLFxuXHRcdGNyZWF0ZTogZmFsc2UsXG5cdFx0cmVuZGVyOiB7XG5cdFx0XHRvcHRpb246IGZ1bmN0aW9uKGl0ZW0sIGVzY2FwZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgaWQ9XCIke2VzY2FwZShpdGVtLnZhbHVlKX1cIiBjbGFzcz1cIm9wdGlvblwiIGRhdGEtZW1haWw9XCIke2VzY2FwZShpdGVtLmVtYWlsKX1cIj5cblx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZXNjYXBlKGl0ZW0uaW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlKGl0ZW0udGV4dCl9XCI+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdDxwPiR7ZXNjYXBlKGl0ZW0udGV4dCl9PC9wPlxuXHRcdFx0XHRcdFx0PGg2PjxzcGFuPiR7ZXNjYXBlKGl0ZW0udGl0bGUpfTwvc3Bhbj48L2g2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5gO1xuXHRcdFx0fSxcblx0XHRcdGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGVzY2FwZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJpdGVtXCIgZGF0YS1lbWFpbD1cIiR7ZXNjYXBlKGl0ZW0uZW1haWwpfVwiPiR7ZXNjYXBlKGl0ZW0udGV4dCl9PC9kaXY+YDtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGxvYWQ6IGZ1bmN0aW9uKHF1ZXJ5LCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIHVybCA9ICQodGhpcy4kY29udHJvbFswXSkuY2xvc2VzdCgnLmNtLWNkdC1tLWRyb3Bkb3duJykuZmluZCgnc2VsZWN0JykuZGF0YSgndXJsJyk7XG4gICAgICBpZiAoIXF1ZXJ5Lmxlbmd0aCkgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cdFx0b25DaGFuZ2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgJHRoaXMgXHRcdFx0XHRcdFx0XHRcdCA9ICQodGhpcy4kY29udHJvbFswXSkuY2xvc2VzdCgnLmNtLWNkdC1tLWRyb3Bkb3duJyksXG5cdFx0XHRcdFx0JG9wdGlvblRleHQgXHRcdFx0XHRcdCA9ICR0aGlzLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKSxcblx0XHRcdFx0XHQkZXZhbHVhdG9yIFx0XHRcdFx0XHRcdCA9ICR0aGlzLmZpbmQoJy5zZWxlY3RpemUtd2hvLWV2YWx1YXRvcicpLFxuXHRcdFx0XHRcdCRyZWxhdGlvbnNoaXBFdmFsdWF0b3IgPSAkdGhpcy5maW5kKCcuc2VsZWN0aXplLXJlbGF0aW9uc2hpcC1ldmFsdWF0b3InKSxcblx0XHRcdFx0XHQkcmVsYXRpb25zaGlwSW5wdXQgXHRcdCA9ICR0aGlzLmZpbmQoJy5zZWxlY3RpemUtcmVsYXRpb25zaGlwLWlucHV0JyksXG5cdFx0XHRcdFx0JHNlY29uZFN0ZXBzIFx0XHRcdFx0XHQgPSAkdGhpcy5maW5kKCcuc2VsZWN0aXplLXNlY29uZC1zdGVwcycpO1xuXHRcdFx0XG5cdFx0XHRpZih2YWx1ZSkge1xuXHRcdFx0XHQkZXZhbHVhdG9yLmZpbmQoJy5zZWxlY3RpemUtZHluYW1pYy12YWx1ZScpLnRleHQoYCR7JG9wdGlvblRleHR9YCk7XG5cdFx0XHRcdCRyZWxhdGlvbnNoaXBFdmFsdWF0b3IuZmluZCgnLnNlbGVjdGl6ZS1keW5hbWljLXZhbHVlJykudGV4dCgkb3B0aW9uVGV4dC5zcGxpdCgnICcpWzBdKTtcblx0XHRcdFx0JHNlY29uZFN0ZXBzLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG5cdFx0XHRcdCRyZWxhdGlvbnNoaXBJbnB1dC5mb2N1cygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHNlY29uZFN0ZXBzLmFkZENsYXNzKCdoaWRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBSZWd1bGFyIEVtcGxveWVlIFN1Z2dlc3QgUGVlcnMgRnVuY3Rpb25hbGl0eVxuXHRpZiggJGRyb3Bvd25BdXRvY29tcGxldGUubGVuZ3RoICkge1xuXHRcdCRkcm9wb3duQXV0b2NvbXBsZXRlLmVxKDApLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG5cblx0XHQkZHJvcG93bkF1dG9jb21wbGV0ZS5vbignY2xpY2snLCAnLmpzLXN1Z2dlc3QtcGVlcicsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciAkdGhpcyBcdFx0XHRcdFx0XHQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jbS1jZHQtbS1kcm9wZG93bicpLFxuXHRcdFx0XHRcdCRyZWxhdGlvbnNoaXBJbnB1dCA9ICR0aGlzLmZpbmQoJy5zZWxlY3RpemUtcmVsYXRpb25zaGlwLWlucHV0JyksXG5cdFx0XHRcdFx0JGV2YWx1YXRvciBcdFx0XHRcdCA9ICR0aGlzLmZpbmQoJy5qcy1zdWdnZXN0LXBlZXInKS5maW5kKCcuc2VsZWN0aXplLWR5bmFtaWMtdmFsdWUnKTtcblxuXHRcdFx0aWYoICRyZWxhdGlvbnNoaXBJbnB1dC52YWwoKS5sZW5ndGggKSB7XG5cdFx0XHRcdCRldmFsdWF0b3IudGV4dCggJHRoaXMuZmluZCgnLml0ZW0nKS50ZXh0KCkgKyAnLCAnICsgJHJlbGF0aW9uc2hpcElucHV0LnZhbCgpICk7XG5cdFx0XHR9XG5cdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkdGhpcy5maW5kKCcuc2VsZWN0aXplLXdoby1ldmFsdWF0b3InKS50b2dnbGVDbGFzcygnaGlkZScpO1xuXHRcdFx0JHRoaXMuZmluZCgnLnNsaWRlLWV2YWx1YXRvcicpLnNsaWRlVG9nZ2xlKCk7XG5cblx0XHRcdGlmKCAkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ2NtLWNkdC1tLWRyb3Bkb3duJykgJiYgJCgnLmNtLWNkdC1tLWRyb3Bkb3duOnZpc2libGUnKS5sZW5ndGggPCAzICkge1xuXHRcdFx0XHQkdGhpcy5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoICQoJy5jbS1jZHQtbS1kcm9wZG93bi5hY3RpdmUnKS5sZW5ndGggPj0gMyApIHtcblx0XHRcdFx0JCgnLnN1Z2dlc3QtcGVlcnMtYnRucycpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcuc3VnZ2VzdC1wZWVycy1idG5zJykuYWRkQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQoJy5qcy1hZGQtbmV3LXBlZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkZHJvcG93bkF1dG9jb21wbGV0ZS5lcSggJCgnLmNtLWNkdC1tLWRyb3Bkb3duOnZpc2libGUnKS5sZW5ndGggKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuXG5cdFx0XHRpZiggJCgnLmNtLWNkdC1tLWRyb3Bkb3duOnZpc2libGUnKS5sZW5ndGggPT09IDEwICkge1xuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdoaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyICRzY29yZVNsaWRlciA9ICQoJy5jbS1jZHQtbS1zY29yZS1zbGlkZXInKTtcblxuXHRpZiggJHNjb3JlU2xpZGVyLmxlbmd0aCApIHtcblxuXHRcdCRzY29yZVNsaWRlci5lcSgwKS5yZW1vdmVDbGFzcygnaGlkZScpO1xuXG5cdFx0JHNjb3JlU2xpZGVyLm9uKCdjbGljaycsICcuYnRuLXByaW1hcnknLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgJHRoaXNTY29yZSA9ICQodGhpcykuY2xvc2VzdCgnLmNtLWNkdC1tLXNjb3JlLXNsaWRlcicpLFxuXHRcdFx0XHRcdCR2YWx1ZSA9ICR0aGlzU2NvcmUuZmluZCgnLnRvb2x0aXAtaW5uZXInKS50ZXh0KCksXG5cdFx0XHRcdFx0JHNjb3JlID0gJHRoaXNTY29yZS5maW5kKCcuc2NvcmUnKTtcblx0XHRcdCR0aGlzU2NvcmUuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JHRoaXNTY29yZS5maW5kKCcuc2NvcmUtY29udGFpbmVyJykuc2xpZGVVcCgpO1xuXHRcdFx0JHNjb3JlLnRleHQoJHZhbHVlKTtcblxuXHRcdFx0aWYoICR0aGlzU2NvcmUubmV4dCgpLmhhc0NsYXNzKCdjbS1jZHQtbS1zY29yZS1zbGlkZXInKSApIHtcblx0XHRcdFx0JHRoaXNTY29yZS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdH0gZWxzZSBpZiggJHRoaXNTY29yZS5uZXh0KCkuaGFzQ2xhc3MoJ2FkZGl0aW9uYWwtY29tbWVudHMnKSApIHtcblx0XHRcdFx0JHRoaXNTY29yZS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRzY29yZVNsaWRlci5vbignY2xpY2snLCAnaDMnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciAkdGhpc1Njb3JlID0gJCh0aGlzKS5jbG9zZXN0KCcuY20tY2R0LW0tc2NvcmUtc2xpZGVyJyk7XG5cdFx0XHRpZiggJHRoaXNTY29yZS5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG5cdFx0XHRcdCR0aGlzU2NvcmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHQkdGhpc1Njb3JlLmZpbmQoJy5zY29yZS1jb250YWluZXInKS5zbGlkZURvd24oKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG59XG4iXX0=
