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
                $('.edit-order-cataloguetitle').append(toNormalComma(cartcataloguetitleArr[orderidtoedit]));//<h1>cataloguetitle</h1>
                $('.edit-order-fulldescription').append(toNormalComma(cartfulldescriptionArr[orderidtoedit]));//<p>fulldescription</p>
                $('.edit-order-promoPrice').append(cartpromoPriceArr[orderidtoedit]);//<h3>$<span>promoPrice</span></h3>
                $('.edit-order-quantity').val(cartQuantityArr[orderidtoedit]);//<input type="text" name="quantity" id="quatity" class="edit-order-quantity" value="1">                
                $('.edit-order-subtotal').append(cartsubtotalArr[orderidtoedit]);//<p><span>$</span><span class="edit-order-subtotal"></span></p>
                 
                
                
                /*edting*/
                editOrderPageQuantityInputListener();
                
                
                
                
                /*save changes*/
                $('.content-cont').off('click', '.saveChanges').on('click', '.saveChanges',function()
                {
                    var editOrderNewQuantity = $('.edit-order-quantity').val();
                    var editOrderNewSubtotal = $('.edit-order-subtotal').html();
                    
                    var newQuantitylength =  $.trim(editOrderNewQuantity).length;
                    
                    
                    if(newQuantitylength == 0)//if field is left empty , the quantity will be 1
                    {
                        editOrderNewQuantity = 1;
                    }
                  
                    
                    cartQuantityArr[orderidtoedit] = editOrderNewQuantity;
                    cartsubtotalArr[orderidtoedit] = editOrderNewSubtotal;
                    
        
                    
                    
                    var Quantity_ArrToSTring = cartQuantityArr.toString()+",";
                    var Subtotal_ArrToSTring = cartsubtotalArr.toString()+",";
                    
                    localStorage.quantity =  Quantity_ArrToSTring;
                    localStorage.subtotal = Subtotal_ArrToSTring;
                    
                    alert('changes saved.');
                    $('.foreditorderonly a').click();

                });

                
                
                /*remove from cart*/
                $('.content-cont').off('click', '.removeFromCart').on('click', '.removeFromCart',function()
                {

                    cartcataloguetitleArr.splice(orderidtoedit,1);
                    cartpicturefilenameArr.splice(orderidtoedit,1);
                    cartfulldescriptionArr.splice(orderidtoedit,1);
                    cartpromoPriceArr.splice(orderidtoedit,1);
                    cartbarcodeArr.splice(orderidtoedit,1);
                    cartQuantityArr.splice(orderidtoedit,1);
                    cartsubtotalArr.splice(orderidtoedit,1);
                    
                    if(cartbarcodeArr.length > 0)
                    {
                        var newarrstring_cataloguetitle = cartcataloguetitleArr.toString()+",";
                        var newarrstring_picturefilename = cartpicturefilenameArr.toString()+",";
                        var newarrstring_fulldescription = cartfulldescriptionArr.toString()+",";
                        var newarrstring_promoPrice = cartpromoPriceArr.toString()+",";
                        var newarrstring_cartbarcode = cartbarcodeArr.toString()+",";
                        var newarrstring_cartQuantity = cartQuantityArr.toString()+",";
                        var newarrstring_cartsubtotal = cartsubtotalArr.toString()+",";
                    } 
                    else
                    {
                        var newarrstring_cataloguetitle = '';
                        var newarrstring_picturefilename = '';
                        var newarrstring_fulldescription = '';
                        var newarrstring_promoPrice ='';
                        var newarrstring_cartbarcode = '';
                        var newarrstring_cartQuantity = '';
                        var newarrstring_cartsubtotal = '';
                    }
               
                    localStorage.cataloguetitle = newarrstring_cataloguetitle;
                    localStorage.picturefilename = newarrstring_picturefilename;
                    localStorage.fulldescription = newarrstring_fulldescription;
                    localStorage.promoPrice = newarrstring_promoPrice;
                    localStorage.BarcodeInvtyCat = newarrstring_cartbarcode;
                    localStorage.quantity = newarrstring_cartQuantity;
                    localStorage.subtotal = newarrstring_cartsubtotal;
                    
                    
                    alert('item removed');
                    $('.foreditorderonly a').click();
                    

                });
       
            });
    
      

});