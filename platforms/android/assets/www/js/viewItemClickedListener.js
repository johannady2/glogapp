$(document).on('viewItemClicked',function(event,idForSinglePage)
{
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
    { 
        db.transaction(function(tx){queryItemDetails(tx,idForSinglePage)},errorCB);
        alert('test2');
        
    }
});