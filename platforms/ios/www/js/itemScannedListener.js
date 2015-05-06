$(document).on('itemScanned',function(event,scanResult)
{
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
    {   
        alert('itemScanned Listerneer Triggered');
        $('.navbar-brand , .navbar-nav > li').not('.forsingleonly').hide();
        $('.forsingleonly').show();
        db.transaction(function(tx){queryItemDetailsByBarcode(tx,scanResult)},errorCB);
        alert('itemScanned Listener done');
    }
});