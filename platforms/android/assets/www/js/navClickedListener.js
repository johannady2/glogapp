$(document).on('navClicked',function(event,filename)
{

    if(filename == "catalogue.html")
    { 
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            db.transaction(queryCatalogueItems, errorCB);
            

                //off click is fix for event trigger multiple times.There are many other solutions if needed to change this in the future.
                 $('body').off('click', '.viewItem').on("click",".viewItem", function(event,idForSinglePage) 
                 {
                    idForSinglePage = $(this).data('itemid');

                    viewItemClickedContentReady(event,idForSinglePage);
                     alert('test1');
                 });
        }
        

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


