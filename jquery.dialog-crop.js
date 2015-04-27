/*!
*	jQuery Dialog Crop v0.1 released under MIT License
*	Author: Pedro Marcelo <pedromarcelodesaalves@gmail.com>
*	https://github.com/pedromarcelojava/jQuery-Dialog-Crop
*/

(function($){
	$.initDialogCropOptions = function(options) {
		if (typeof options === "undefined") options = {};
		// Dialog
		if (typeof options.dialog === "undefined") options.dialog = {};
		if (typeof options.dialog.close === "undefined") options.dialog.close = function(evn, ui){ $(this).addClass("dialog-hide").dialog("destroy").html(""); };
		options.dialog.position = {my: "center", at: "center", of: window};
		// Jcrop
		if (typeof options.jcrop === "undefined") options.jcrop = {};

		return options;
	}

	$.fn.dialogCrop = function(options) {
		if (this.length > 0)
		{
			options = $.initDialogCropOptions(options);
			var data = {
				dialog: this,
			};

			$("a[data-toggle=\"dialog-crop\"]").click(data, function(evn){
				evn.preventDefault();
				$('<img>', {
					id: 'dialog-crop-image',
					src: $(this).attr('href')
				}).appendTo(evn.data.dialog);
				$(evn.data.dialog).removeClass("dialog-hide").dialog(options.dialog);
				$(function(){$("#dialog-crop-image").Jcrop(options.jcrop);});
			});

			$(window).resize(data, function(evn){
				$(evn.data.dialog).dialog("option", "position", options.dialog.position);
			});
		}

		return this;
	}
})(jQuery);