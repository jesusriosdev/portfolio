$(document).ready(function() {

    /***********************************************************************************************/
    /* NAVIGATION */
    /***********************************************************************************************/

    $('.brgr').click(function() {
        this.classList.toggle("is-active");
    });

    $('#btnAboutMe').click(function() {
        
        var target = "#aboutme",
        $target = $(target);
    
        $('html, body').stop().animate({ 'scrollTop': $target.offset().top }, 900, 'swing', function() { window.location.hash = target; });
    });

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        if($($('.brgr')[0]).hasClass('is-active') == true) {
            $($('.brgr')[0]).trigger("click");
        }

        var target = this.hash,
        $target = $(target);
    
        $('html, body').stop().animate({ 'scrollTop': $target.offset().top }, 900, 'swing', function() { window.location.hash = target; });
    });

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $('#btnScrollToTop').fadeIn("slow");
        } else {
            $('#btnScrollToTop').fadeOut("slow");
        }
    };

    $('.navbar-brand').click(function() {
        $('html, body').stop().animate({ 'scrollTop': 0 }, 900, 'swing', function() { window.location.hash = 0; });
    });
    $('#btnScrollToTop').click(function() {
        $('html, body').stop().animate({ 'scrollTop': 0 }, 900, 'swing', function() { window.location.hash = 0; });
    });

    /***********************************************************************************************/
    /* NAVIGATION */
    /***********************************************************************************************/
    
    /***********************************************************************************************/
    /* PAGE CONFIGURATION */
    /***********************************************************************************************/

    $('#copyrightYear').text(new Date().getFullYear());

    /***********************************************************************************************/
    /* PAGE CONFIGURATION */
    /***********************************************************************************************/

    /***********************************************************************************************/
    /* MODALS */
    /***********************************************************************************************/

    // $('#btnLogin').click(function() {
    //     $('#loginModal').modal('toggle');
    // });

    /***********************************************************************************************/
    /* MODALS */
    /***********************************************************************************************/
});