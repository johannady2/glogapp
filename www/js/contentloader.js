 $(document).ready(function()
{ 
      
    
       var defaultContent = 'splash.html';     
         $(".content-cont").load(defaultContent,  null, function(event,filename)
         {
			 $('.site-content').removeClass('container');
             $('body').css('background-image', 'url(' + '"img/splashbg.jpg"' + ')');
			 $('.content-cont').css( 'marginTop','0px' );
		 $('.content-cont').css('marginBottom', '0px' );
			

			 
			 
             $(".slideToUnlock").on('click',function()
             {
				 
				$('.site-content').addClass('container');
                 $('body').css('background-image', 'none');
				  $('.content-cont').css('marginTop','60px');
				$('.content-cont').css('marginBottom','60px');

			 
			 
				 
				 
                 $('nav , footer').show();
                 $('.splashscreencont').remove();
                 $('.forsingleonly , .foreditorderonly').hide();
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
  

     
     
     
     //forsingleonly and foreditorderonly have seperate loaders
        $('.navbar-nav > li > a , .navbar-default .navbar-brand').not('.forsingleonly a , .foreditorderonly a').on( "click", function(e) 
        {
            e.preventDefault();
            

            $('.active').removeClass('active');

            var currenthrefclass = $(this).attr('class');
         
            if( currenthrefclass == 'navbar-brand')
            {
                
               
                var navbarContent = $(this).attr('href');

                $('.navbar-nav > li > a[href="'+navbarContent+'"]').click();
                
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
            $('.forsingleonly , .foreditorderonly').hide();
            $(".content-cont").load(backTo ,  null, function()
            {
                $('.navbar-nav > li > a[href="'+ backTo +'"]').not('.forsingleonly a , .foreditorderonly a').click();
            });
           
      
        });

    

       

        $(document).on('click','.foreditorderonly', function ()
        {
            $('.navbar-brand , .navbar-nav > li').not('.foreditorderonly').show();
            $('.forsingleonly , .foreditorderonly').hide();
            $(".content-cont").load("cart.html",  null, function()
            {
                $('.navbar-nav > li > a[href="cart.html"]').click();
            });
   
        });
     
     
     
     
     
     
 });


 
         