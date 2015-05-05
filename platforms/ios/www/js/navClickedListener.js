$(document).on('navClicked',function(event,filename)
{

    if(filename == "catalogue.html")
    {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            db.transaction(queryCatalogueItems, errorCB);
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


