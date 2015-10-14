/*
* Select Multiple Table
* Copyright (c) 2015 Mic (Bangkok, Thailand)
*
* This program is free software. It comes without any warranty, to
* the extent permitted by applicable law. You can redistribute it
* and/or modify it under the terms of the MIT LICENSE.
* See https://en.wikipedia.org/wiki/MIT_License for more details.
*/
;(function($, window, document) {

	SelectMultipleTable = function(el, opts) {
		this.el = el;
		this.opts = opts;
	};

	SelectMultipleTable.prototype = {
		options: {
			symbol: '✔',
			symbolCode: '&#10004;',
			selectId: 'smt-',
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
				var smtSelected = $(this).find('[data-smt-selected]');
				var optionValue = $(this).find('td').data('smt-value');
				if(smtSelected.hasClass('stm-show')) {
					smtSelected.removeClass('stm-show');
					smtSelected.html('');	
					that.deselect(optionValue);
				}
				else {
					smtSelected.addClass('stm-show');
					smtSelected.html(that.opts.symbolCode);
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
				var optionValue = $(v).find('td').data('smt-value');
				optionTags += '<option value="'+optionValue+'">'+optionValue+'</option>';
			});

			$(selectTag).append(optionTags);
			$(this.el).after(selectTag);
		}
	}
	
	$.fn.selectMultipleTable = function(options) {
		return this.each(function() {
			new SelectMultipleTable(this, options).init();
		});
	};

})(jQuery, window, document);