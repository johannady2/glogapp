$(document).on('navClicked',function(event,filename)
{

    if(filename == "catalogue.html")
    { 
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            db.transaction(queryCatalogueItems, errorCB);
            
            

            
          
       
                 $('.content-cont').on("click",".viewItem", function(e) 
                 {
                      var openThisItem = $(this).data('itemid');
                     alert(openThisItem);
                 });
       
            
            
            
            
        }
        
       //just for testing $('.content-cont').append('<button class="btn btn-success btn-large viewItem" data-itemid="testing">View</button>');
    }
    else if(filename == "search.html")
    {
          startSearch();
       
    }
    else if(filename == "test-localstorage.html")
    {

        testlocalstorage();

    }
    else if(filename == "test-getjson.html")
    {       
          testgetjson(); 
    }

});


