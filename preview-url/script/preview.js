define(function(require, exports, module) {
    var $ = require("jquery");
    $(document).ajaxStop(function() {
        // 0 === $.active
        setTimeout(function() {
            var inputVal = $('div[name=previewURL]').text();
            console.log(inputVal);
        }, 1000);
    });
});