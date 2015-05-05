 $(document).ready(function()
{ 
      
    
       var defaultContent = 'splash.html';     
         $(".content-cont").load(defaultContent,  null, function(event,filename)
         {
             $('body').css('background-image', 'url(' + '"img/splashbg.jpg"' + ')');
             $(".slideToUnlock").on('click',function()
             {
                 $('body').css('background-image', 'none');
                 $('nav , footer').show();
                 $('.splashscreencont').remove();
                 
                 if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
                {
                    scanner.startScanning();
                    $('.scanbtn').parent().addClass('active');
                    
                    //on manatee close $('.webdefault').click();
                   
                }
                 else
                 {
                     $('.webdefault').click();//default page after splash screen will navigatioon with this class
                     $('.scanbtn').hide()//navigation to scan navigation is hidden on PC

                 }   
                    

             });
         });
  

     
     
     
     
     $('.navbar-nav > li > a , .navbar-brand ').on( "click", function(e) 
        {
            e.preventDefault();
         
     

          $('.active').removeClass('active');
         
         var currenthrefclass = $(this).attr('class');
         
         if( currenthrefclass == 'navbar-brand')
         {
            var navbarContent = $(this).attr('href');
             
             $('.navbar-nav > li > a[href="'+navbarContent+'"]').parent().addClass('active');
         }
         else
         {
             $(this).parent().addClass('active');/* .not('.navbar-brand')*/
              

         }
         
        
         
            var loadThisContent = $(this).attr('href');
         
         
            //$(".content-cont").load(loadThisContent);
           $(".content-cont").load(loadThisContent,  null, function(event,filename) {
               
             if(filename != "scan.html")
            {
            var filename = loadThisContent;
            navClickedAndContentContReady(event,filename);//trigger is in callback of .content-cont to ensure that this div is loaded first, before the data is appended.
            }
            
           });
          

        });
     
     
        $('.viewItem').on( "click", function(e) 
        {
            var openThisItem = $(this).data('itemid');
            alert(openThisItem);
        });

     
     
 });


 
         