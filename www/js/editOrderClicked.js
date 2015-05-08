$(document).on('editOrderClicked',function(event,orderidtoedit)
{
            
    
            alert(orderidtoedit);
            alert(cartcataloguetitleArr);
            alert(cartcataloguetitleArr[orderidtoedit]);
            //alert(orderidtoedit);
            $('.navbar-brand , .navbar-nav > li').not('.foreditorderonly').hide();
            $('.foreditorderonly').show();
    
            $('.content-cont').empty();
            $('.content-cont').load("edit-order.html");
    
            $('.edit-order-cataloguetitle').html(cartcataloguetitleArr[orderidtoedit]);

});