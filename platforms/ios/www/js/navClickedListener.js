$(document).on('navClicked',function(event,filename)
{

    if(filename == "catalogue.html")
    { 
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            
            db.transaction(queryCatalogues, errorCB);
            

                //off click is fix for event trigger multiple times.There are many other solutions if needed to change this in the future.
                 $('body').off('click', '.viewItem').on("click",".viewItem", function(event,idForSinglePage) 
                 {
                    idForSinglePage = $(this).data('itemid');

                    viewItemClickedContentReady(event,idForSinglePage);
                
                 });
        }
        

    }
    else if(filename == "search.html")
    {
			db.transaction(queryCategories, errorCB);
            startSearch();
       
    }
    else if(filename == "cart.html")
    {
     
        //renderCartList();
		db.transaction(queryCartSettings,errorCB);
        $('body').off('click', '.edit-order').on('click','.edit-order', function(event,orderidtoedit)
        {   
            orderidtoedit = $(this).data('orderid');
            editOrderClickedContentReady(event,orderidtoedit);
        });
        
        
            

        
        
        
    }
    else if(filename == "test-getjson.html")
    {      
       
          getjsonForINVENTORY_MASTER_CATALOGUE(); 
    }

  
    
});


