$(document).on('editOrderClicked',function(event,orderidtoedit)
{
            
    

            //alert(orderidtoedit);
            $('.navbar-brand , .navbar-nav > li').not('.foreditorderonly').hide();
            $('.foreditorderonly').show();
            
            $('.content-cont').empty();
            $('.content-cont').load("edit-order.html",  null, function()
            {
    
                /*INITIAL DISPLAY - BEFORE EDIT*/
                $('.edit-order-PictureFileName').attr('src',cartpicturefilenameArr[orderidtoedit]);//<h1>cataloguetitle</h1>
                $('.edit-order-cataloguetitle').append(cartcataloguetitleArr[orderidtoedit]);//<h1>cataloguetitle</h1>
                $('.edit-order-fulldescription').append(cartfulldescriptionArr[orderidtoedit]);//<p>fulldescription</p>
                $('.edit-order-displayPrice').append(cartdisplayPriceArr[orderidtoedit]);//<h3>$<span>displayPrice</span></h3>
                $('.edit-order-quantity').val(cartQuantityArr[orderidtoedit]);//<input type="text" name="quantity" id="quatity" class="edit-order-quantity" value="1">                
                $('.edit-order-subtotal').append(cartsubtotalArr[orderidtoedit]);//<p><span>$</span><span class="edit-order-subtotal"></span></p>
                
                
                //'.saveChanges'
            });
    
      

});