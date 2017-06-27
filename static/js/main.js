$(function () {
    // Code highlighting
    $('pre code').each(function (i, block) {
        var $block = $(block);
        $.each($block.prop("classList"), function (i, c) {
            $block.removeClass(c);
            c = c.replace('language-', '');
            if (!$block.hasClass(c)) $block.addClass(c);
        });

        hljs.highlightBlock(block);
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
});