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
			this.setLimit();
		},

		activeMouse: function() {
			var that = this;
			
			$(this.el).parents(document).on('click', 'tbody tr', function(e) {
				var tmsSelected = $(this).find('[data-tms-selected]');
				var optionValue = $(this).find('td').data('tms-value');
				if(tmsSelected.hasClass('tms-show')) {
					// hide
					tmsSelected.removeClass('tms-show');
					tmsSelected.css({ color: '#ddd' }).html(that.opts.symbolCode);
					that.deselect(optionValue);
				}
				else {
					// show
					tmsSelected.addClass('tms-show');
					tmsSelected.css({ color: 'inherit' }).html(that.opts.symbolCode);
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
			var that = this;
			var selectTag = $('<select/>', { 'name': this.opts.nameAttr, 'style': 'display: none;', 'id': this.opts.selectId, 'multiple': 'multiple' });
			var optionTags = '';

			$(this.el).find('tbody tr').each(function(i, v) {
				$(v).find('[data-tms-selected]').css({ color: '#ddd' }).html(that.opts.symbolCode);
				var optionValue = $(v).find('td').data('tms-value');
				optionTags += '<option value="'+optionValue+'">'+optionValue+'</option>';
			});

			$(selectTag).append(optionTags);
			$(this.el).after(selectTag);
		},

		setLimit: function() {
			var that = this;
			var divContainer = $('<div/>', { 'class': 'tms-container' });
			var divHeader = $('<div/>', { 'class': 'tms-header' });
			var divBody = $('<div/>', { 'class': 'tms-body' });
			var table = '<table class="'+this.el.className+'">%s%</table>';
			
			// set header
			if($(this.el).find('thead').length > 0) {
				var tableHeader = table.replace('%s%', $(this.el).find('thead')[0].outerHTML);
				$(divHeader).append(tableHeader);
				$(divContainer).append(divHeader);
			}
			
			// set body
			var tableBody = table.replace('%s%', $(this.el).find('tbody')[0].outerHTML);
			$(divBody).append(tableBody);
			$(divContainer).append(divBody);

			// replace div container to existing table
			$(this.el).replaceWith(divContainer);

			// set width
			var widthArray = [];
			$(divContainer).find('.tms-body tbody tr:first td').each(function(index, td) {
				var tdWidth = $(td).width();
				widthArray.push(tdWidth);
			});
			
			$(divContainer).find('.tms-header table thead th').each(function(i, th) {
				$(th).width(widthArray[i])
			});

			// set height by limit
			var trHeight = $(divContainer).find('.tms-body tbody tr').outerHeight()*this.opts.limit;
			$(divContainer).find('.tms-header table').css({ 'margin': 0 });
			$(divContainer).find('.tms-body').css({ 'height': trHeight, 'overflow-y': 'auto' })
		}
	}
	
	$.fn.trMultipleSelect = function(options) {
		return this.each(function() {
			new TrMultipleSelect(this, options).init();
		});
	};

})(jQuery, window, document);