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
                 $('.content-cont').empty();
                 
                 if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
                {
                    $('.scanbtn').click();
                }
                 else
                 {
                     $('.webdefault').click();

                 }   
                    

             });
         });
  

     
     
     
     $('.navbar-nav > li > a[href="'+defaultContent+'"]').parent().addClass('active');
     $('.navbar-nav > li > a , .navbar-brand').on( "click", function(e) 
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

     
     
 });

function navClickedAndContentContReady(event,filename)
{//e.stopPropagation();//dunno what this is for but tutorial used this and he said it's better not to use this

    $(document).trigger('navClicked',[filename]);/* add parameter by ('navclick',e.target.id);*/
    
    
}

 
         