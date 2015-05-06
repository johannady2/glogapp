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
                 $('.forsingleonly').hide();
                 if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
                {
                    scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback);
                    
                      
                    //$('.scanbtn').parent().addClass('active');
                    
                    
                   
                }
                 else
                 {
                     $('.webdefault').click();//default page after splash screen will navigatioon with this class
                     $('.scanbtn').hide()//navigation to scan navigation is hidden on PC

                 }   
                    

             });
         });
  

     
     
     
     //forsingleonly AKA backbutton has seperate loader
        $('.navbar-nav > li > a').not('.forsingleonly a').on( "click", function(e) 
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
            
            
            $('.forsingleonly a').attr('href',loadThisContent);
            //alert('backbutton updated');
         
         
            //$(".content-cont").load(loadThisContent);
            $(".content-cont").load(loadThisContent,  null, function(event,filename)
            {

                    var filename = loadThisContent;
                    navClickedAndContentContReady(event,filename);//trigger is in callback of .content-cont to ensure that this div is loaded first, before the data is appended.

            });
          

        });
     
        $('.forsingleonly a').on('click', function(e)
        {  e.preventDefault();
            var backTo = $(this).attr('href');
            
            $('.navbar-brand , .navbar-nav > li').not('.forsingleonly').show();
            $('.forsingleonly').hide();
            $(".content-cont").load(backTo);
            $('.navbar-nav > li > a[href="'+ backTo +'"]').not('.forsingleonly a').click();
      
        });

    
     
     
     
     
     
 });


 
         