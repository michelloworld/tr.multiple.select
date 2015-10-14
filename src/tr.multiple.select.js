/*
* Table Row Multiple Select
* Copyright (c) 2015 Mic (Bangkok, Thailand)
*
* This program is free software. It comes without any warranty, to
* the extent permitted by applicable law. You can redistribute it
* and/or modify it under the terms of the MIT LICENSE.
* See https://en.wikipedia.org/wiki/MIT_License for more details.
*/
;(function($, window, document) {

	TrMultipleSelect = function(el, opts) {
		this.el = el;
		this.opts = opts;
	};

	TrMultipleSelect.prototype = {
		options: {
			symbol: '✔',
			symbolCode: '&#10004;',
			selectId: 'tms-',
		},

		init: function() {
			var that = this;
			this.opts = $.extend({}, this.options, this.opts);
			this.opts.selectId = this.opts.selectId+Math.ceil(Math.random()*1000000);
			
			this.activeMouse();
			this.buildSelectOption();			
		},

		activeMouse: function() {
			var that = this;
			$(this.el).find('tbody tr').on('click', function(e) {
				var tmsSelected = $(this).find('[data-tms-selected]');
				var optionValue = $(this).find('td').data('tms-value');
				if(tmsSelected.hasClass('tms-show')) {
					tmsSelected.removeClass('tms-show');
					tmsSelected.html('');	
					that.deselect(optionValue);
				}
				else {
					tmsSelected.addClass('tms-show');
					tmsSelected.html(that.opts.symbolCode);
					that.select(optionValue);
				}
			});
		},

		select: function(value) {
			$('#'+this.opts.selectId).find('option[value='+value+']').prop('selected', true);
		},

		deselect: function(value) {
			$('#'+this.opts.selectId).find('option[value='+value+']').prop('selected', false);
		},

		buildSelectOption: function() {
			var selectTag = $('<select/>', { 'name': this.opts.nameAttr, 'style': 'display: none;', 'id': this.opts.selectId, 'multiple': 'multiple' });
			var optionTags = '';

			$(this.el).find('tbody tr').each(function(i, v) {
				var optionValue = $(v).find('td').data('tms-value');
				optionTags += '<option value="'+optionValue+'">'+optionValue+'</option>';
			});

			$(selectTag).append(optionTags);
			$(this.el).after(selectTag);
		}
	}
	
	$.fn.trMultipleSelect = function(options) {
		return this.each(function() {
			new TrMultipleSelect(this, options).init();
		});
	};

})(jQuery, window, document);