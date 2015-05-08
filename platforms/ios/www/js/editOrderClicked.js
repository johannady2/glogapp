$(document).on('editOrderClicked',function(event,orderidtoedit)
{
    
            alert(orderidtoedit);
            $('.navbar-brand , .navbar-nav > li').not('.foreditorderonly').hide();
            $('.foreditorderonly').show();

});