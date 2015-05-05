$(document).on('navClicked',function(event,filename)
{


    if(filename == "test-localstorage.html")
    {

        testlocalstorage();

    }
    else if(filename == "test-getjson.html")
    {       
          testgetjson(); 
    }
    else if(filename == "test-LS2.html")
    {
          testLS2();
       
    }
});


