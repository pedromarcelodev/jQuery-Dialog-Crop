/*!
*	jQuery Dialog Crop v1.0 released under MIT License
*	Author: Pedro Marcelo <pedromarcelodesaalves@gmail.com>
*	https://github.com/pedromarcelojava/jQuery-Dialog-Crop
*/

(function($){
	$.initDialogCropOptions = function(options) {
        var defaults = {
            classHide : "dialog-hide",
            imageClass : "",
            dialog : {
                position : {my: "center", at: "center", of: window},
                close : function(evn, ui){
                    $(this).addClass(options.classHide).dialog("destroy").html("");
                }
            },
            jcrop : {}
        };

		return $.extend({}, defaults, options);
	}

	$.fn.dialogCrop = function(options) {
		if (this.length > 0)
		{
            $.dialogCrop = {};
			options = $.initDialogCropOptions(options);
			var data = {
				dialog: this,
			};

			$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
                _title: function(title) {
                    var $title = this.options.title || '&nbsp;';
                    if( ("title_html" in this.options) && this.options.title_html == true )
                        title.html($title);
                    else
                        title.text($title);
                }
            }));

			$("a[data-toggle=\"dialog-crop\"]").click(data, function(evn){
				evn.preventDefault();
                var img = new Image();
                img.onload = function(){
                    $.dialogCrop.originalWidth = this.width;
                    $.dialogCrop.prop = $.dialogCrop.originalWidth / $.dialogCrop.dialogImageWidth;
                    if (typeof options.formTarget !== "undefined")
                    {
                        var $jdcp = $('#jquery-dialog-crop-prop');

                        if ($jdcp.length > 0)
                        {
                            $jdcp.val($.dialogCrop.prop);
                        }
                        else
                        {
                            $('<input>',{
                                type: 'hidden',
                                name: 'jquery-dialog-crop-prop',
                                value: $.dialogCrop.prop
                            }).appendTo(options.formTarget);
                        }
                    }
                }
                img.src = $(this).attr('href');
				$('<img>', {
					id: 'dialog-crop-image',
					src: $(this).attr('href'),
                    "class": options.imageClass
				}).appendTo(evn.data.dialog);
				$(evn.data.dialog).removeClass(options.classHide).dialog(options.dialog);
				$(function(){$("#dialog-crop-image").Jcrop(options.jcrop);});
                $.dialogCrop.dialogImageWidth = $('#dialog-crop-image').width();
			});

			$(window).resize(data, function(evn){
				$(evn.data.dialog).dialog("option", "position", options.dialog.position);
			});
		}

		return this;
	}
})(jQuery);