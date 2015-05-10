/*-----------------------------------------------------------------*/
/*------------------------Database-----------------------------------*/
/*------------------------------------------------------------------*/

document.addEventListener("deviceready",onDeviceReady,false);

//GLOBAL VARIABLES
var db;
var idForSinglePage;
var scanResult;
var orderidtoedit;











//if variable is undefined, define.
if(localStorage.BarcodeInvtyCat == null)
{
    
    /*FOR LOCALSTORAGE TO ARRAY*/
    //NOTE: x,y,z
    var cartcataloguetitleArr;
    var cartpicturefilenameArr;
    var cartfulldescriptionArr;
    var cartdisplayPriceArr;
    var cartbarcodeArr;
    var cartQuantityArr;
    var cartsubtotalArr;
    
    /*initialized on placeOrder click*/
    //NOTE: x,y,z,
    //always add "," at the end of array when storing as localStorage
    localStorage.cataloguetitle = '';
    localStorage.picturefilename = '';
    localStorage.fulldescription = '';
    localStorage.displayPrice = '';
    localStorage.BarcodeInvtyCat = '';
    localStorage.quantity = '';
    localStorage.subtotal = '';
    
    /*initialized on renderCart*/
    localStorage.orderid='';
}




function onDeviceReady()
{
    
    db = window.openDatabase("Database","1.0","Cordova Demo", 2*1024*1024);
    db.transaction(createDB, errorCB, successCB);
   
}


function createDB(tx)
{
    
   
    tx.executeSql('DROP TABLE IF EXISTS INVENTORY_MASTER_CATALOGUE');
    tx.executeSql('DROP TABLE IF EXISTS CATALOGUE_MASTER');
    tx.executeSql('CREATE TABLE IF NOT EXISTS INVENTORY_MASTER_CATALOGUE(SysPk_InvtyCat INTEGER PRIMARY KEY   AUTOINCREMENT ,Barcode_InvtyCat, CatalogueTitle_InvtyCat , PictureFileName_InvtyCat , FullDescription_InvtyCat,DisplayPrice_InvtyCat DECIMAL(9,2))',[],populateTables,errorCB);
   //tx.executeSql('CREATE TABLE IF NOT EXISTS CATALOGUE_MASTER(SysPk_CatMstr INTEGER PRIMARY KEY   AUTOINCREMENT,Description_CatMstr,Principal_CatMstr,PromoStartDate_CatMstr Date,PromoEndDate_CatMstr DATETIME)'
}

function errorCB(err)
{
    //alert("Error processing SQL: " + err.message);
   
}

function successCB()
{
    ////alert('successful');

}

function populateTables(tx)
{
 

   
    var sqlInsert = 'INSERT INTO INVENTORY_MASTER_CATALOGUE(Barcode_InvtyCat,CatalogueTitle_InvtyCat,PictureFileName_InvtyCat,FullDescription_InvtyCat,DisplayPrice_InvtyCat) VALUES(?,?,?,?,?)';
   
    tx.executeSql(sqlInsert,["101191","Yotsuba,Revoltech","img/item1.jpg","Sample,f Strings with commas.",63.00],null,errorCB);
    tx.executeSql(sqlInsert,["4801010127215","GIF sample","img/item2.gif","with free milk",63.00],null,errorCB);
    tx.executeSql(sqlInsert,["8999999003395","Pond\'s Pure White","img/item3.jpg","with free candy",14.00],null,errorCB);
    tx.executeSql(sqlInsert,["4807788058850","Iron Supplement","img/item4.gif","with free facial chocolate",99.99],null,errorCB);
    tx.executeSql(sqlInsert,["12345","Used Monggol Pencil","img/item5.jpg","free Soy Sauce",99.99],null,errorCB);
    tx.executeSql(sqlInsert,["795144075167","Strawberry Kiss Intimate Secret","img/item6.jpg","BUY 1 TAKE 1",15.00],null,errorCB);
    tx.executeSql(sqlInsert,["4005401548218","Faber Castell TextLiner 48","img/item7.jpg","with free facial baby poweder",232.00],null,errorCB);
    tx.executeSql(sqlInsert,["123","Pocky Strawberry","img/item8.jpg","Free Cookies",232.00],null,errorCB);
    tx.executeSql(sqlInsert,["11223344","Pocky Set","img/item9.jpg","Mentos",232.00],null,errorCB);
   
    tx.executeSql(sqlInsert,["987654321098","40L notebooks","img/Item10.jpg","pack of 8",50.00],null,errorCB);
    tx.executeSql(sqlInsert,["036000291452","Jockey Lowrise Brief","img/Item11.jpg","pack of 8",325.00],null,errorCB);
    tx.executeSql(sqlInsert,["016000660601","Trolley Bags","img/Item12.jpg","(P799.75 each) save 10%",799.75],null,errorCB);
    tx.executeSql(sqlInsert,["5010029020519","Trolley Bags","img/Item13.jpg","was P399",299.00],null,errorCB);
    tx.executeSql(sqlInsert,["*9123*39","TSport Backpacks","img/Item14.jpg","(P198.00 each)",198.00],null,errorCB);
    tx.executeSql(sqlInsert,["50184385","Shining East Value Pack","img/Item15.jpg","save P10",99.00],null,errorCB);
    tx.executeSql(sqlInsert,["5702012000737","Darlington","img/Item16.jpg","Buy 1 Take 1",89.75],null,errorCB);
    tx.executeSql(sqlInsert,["850785004003","Sanyang Clerical Chair","img/Item17.jpg","was P1899",1519.20],null,errorCB);
    tx.executeSql(sqlInsert,["741360988644","Sanyang Computer Table","img/Item18.jpg","was P1595",1276.00],null,errorCB);
    tx.executeSql(sqlInsert,["123456789012","Sanyang Office Table","img/Item19.jpg","was P1695",1320.00],null,errorCB);
    tx.executeSql(sqlInsert,["042000062008","Sanyang Study Table","img/Item20.jpg","was P3750",3000.00],null,errorCB);
    tx.executeSql(sqlInsert,["012345678905","80L notebooks","img/Item21.jpg","pack of 10",100.00],null,errorCB);
   



    

}

/*-----------------------------------------------------------------*/
/*------------------------//Database-----------------------------------*/
/*------------------------------------------------------------------*/








/*----------------------------------------------------------------------*/
/*-------------------custom events-------------------------------*/
/*----------------------------------------------------------------------*/
function navClickedAndContentContReady(event,filename)
{//e.stopPropagation();//dunno what this is for but tutorial used this and he said it's better not to use this

    $(document).trigger('navClicked',[filename]);

}


function viewItemClickedContentReady(event,idForSinglePage)
{
    $('.content-cont').trigger('viewItemClicked',[idForSinglePage]);
}


function doneScanning(event,scanResult)
{
    //alert('doneScanning started');
    $(document).trigger('itemScanned',[scanResult]);
     //alert('trigger completed');
}

function editOrderClickedContentReady(event,orderidtoedit)
{
    $(document).trigger('editOrderClicked',[orderidtoedit]);
}

/*----------------------------------------------------------------------*/
/*-------------------//custom events-------------------------------*/
/*----------------------------------------------------------------------*/








/*----------------------------------------------------------------------*/
/*-------------------navClickedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/





function queryCatalogueItems(tx)
{
   tx.executeSql('SELECT * FROM INVENTORY_MASTER_CATALOGUE' , [], renderCatalogueItems, errorCB);  
}

function renderCatalogueItems(tx,results)
{
    
        var numberOfCatalogueItems = results.rows.length;
       
        var htmlstringCatalaogue ='';
        for(var ind=0; ind < numberOfCatalogueItems; ind++)
        {
            /*These ones will not be put in html because the elements need to be looped through*/

            htmlstringCatalaogue += '<div class="item"><div class="row artcont"><div class="col-md-12 col-ms-12 col-xs-12"><article class="oneitemarticle"><header class="entry-header page-header"><div class="row"><div class="col-md-8 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h1 class="entry-title">'+ results.rows.item(ind).CatalogueTitle_InvtyCat +'</h1>';
            htmlstringCatalaogue += '</div><div class="col-md-4 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h3 class="entry-title">$'+ results.rows.item(ind).DisplayPrice_InvtyCat +'</h1>';
            htmlstringCatalaogue += '</div></div></header>';
            htmlstringCatalaogue += '<div class="entry-content"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="img-container">';
            htmlstringCatalaogue += '<img src="'+ results.rows.item(ind).PictureFileName_InvtyCat +'" class="responsiveImage">';
            htmlstringCatalaogue += '</div><br/></div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<p>'+ results.rows.item(ind).FullDescription_InvtyCat +'</p>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).SysPk_InvtyCat +'">View</a>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '</div></div></article></div></div></div>';

        }
    
    
        $('#list').append(htmlstringCatalaogue);
    
        
}




function queryForSearch(tx)
{
   
    var enteredBarcode = $('#searchForm').children('[name="search"]').val();
    
    tx.executeSql('SELECT * FROM INVENTORY_MASTER_CATALOGUE WHERE Barcode_InvtyCat = "' + enteredBarcode +'"' , [], renderSearchResults, errorCB);
}

function renderSearchResults(tx,results)
{
    var htmlstring = "";
    var len = results.rows.length;
    
  
    for(var ind=0; ind < len; ind++)
    {
        
        htmlstring += '<div class="col-md-4 col-sm-4 col-xs-12"><img src="'+ results.rows.item(ind).PictureFileName_InvtyCat +'" class="responsiveImage"></div><div class="col-md-8 col-sm-8 col-xs-12"><h1>'+results.rows.item(ind).CatalogueTitle_InvtyCat+'</h1><p>'+results.rows.item(ind).FullDescription_InvtyCat+'</p><a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).SysPk_InvtyCat +'">View</a></div><div class="clearfix"><hr></div>';
   
        $('#itemsList').append(htmlstring);
         
    }
   
}


function startSearch()
{
    
    $("#searchForm").on('submit', function()
    {   $('#itemsList').empty();
     
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            db.transaction(queryForSearch, errorCB);
        }
        
        var searchedValue = $(this).children('[name="search"]').val();

      //  localStorage.searchedValueStorage = searchedValue;
       // $('.lastsearched').empty().append(localStorage.searchedValueStorage);

        return false;
    });
        
        
            // $('.lastsearched').append(localStorage.searchedValueStorage);
}










function renderCartList()
{
    var cataloguetitleForArr = localStorage.cataloguetitle.replace(/,\s*$/,'');
    var picturefilenameForArr = localStorage.picturefilename.replace(/,\s*$/,'');
    var fulldescriptionForArr = localStorage.fulldescription.replace(/,\s*$/,'');
    var displayPriceForArr = localStorage.displayPrice.replace(/,\s*$/,'');
    var BarcodeInvtyCatForArr = localStorage.BarcodeInvtyCat.replace(/,\s*$/,'');
    var quantityForArr = localStorage.quantity.replace(/,\s*$/,'');
    var subtotalForArr = localStorage.subtotal.replace(/,\s*$/,'');
    
    cartcataloguetitleArr =  cataloguetitleForArr.split(',');
    cartpicturefilenameArr =  picturefilenameForArr.split(',');
    cartfulldescriptionArr =  fulldescriptionForArr.split(',');
    cartdisplayPriceArr =  displayPriceForArr.split(',');
    cartbarcodeArr =  BarcodeInvtyCatForArr.split(',');
    cartQuantityArr =  quantityForArr.split(',');
    cartsubtotalArr = subtotalForArr.split(',');
    
    var cartLength = cartbarcodeArr.length;
    var htmlstringcart = '';
    
    var orderid ='';

    if(cartLength == 1 && !cartbarcodeArr[0])
    {  
        htmlstringcart = '<div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><h1>No Orders</h1></div></div>';
    }
    else
    {
        
     for(var ind=0; ind < cartLength; ind++)
     {
        orderid += ind.toString() + ',';
  
         
         //commas are toNormal because this is for display
        htmlstringcart +=  '<div class="row cartItemCont"><div class="col-md-3 col-sm-3 col-xs-12"><img src="'+ cartpicturefilenameArr[ind]+'" class="responsiveImage" alt="no image available"></div><div class="col-md-9 col-sm-9 col-xs-12"><div class="row"><div class="col-md-11 col-sm-11 col-xs-11"><h2>'+ toNormalComma(cartcataloguetitleArr[ind]) + '</h2><p>'+toNormalComma(cartfulldescriptionArr[ind])+'</p></div><div class="col-md-1 col-sm-1 col-xs-1"><a href="#" class="edit-order" data-orderid="'+ ind +'">edit</a></div></div></div><div class="col-md-12 col-sm-12 col-xs-12"><p class="pull-left">quantity: <span>'+cartQuantityArr[ind]+'</span></p><p class="pull-right">$<span>'+ cartsubtotalArr[ind] +'</span></p></div></div>' ;
     }
        
    }

    
    localStorage.orderid = orderid;
    $('#cartListCont').append(htmlstringcart);

    //commas are not using toNormal so that string won't be interpreted as different array indexes.
    $('.orderAll-cont').append('<a href="#" class="btn btn-success btn-large orderAll" data-cataloguetitle="' + cartcataloguetitleArr.toString() +'" data-picturefilename="'+ cartpicturefilenameArr.toString() +'" data-fulldescription="'+ cartfulldescriptionArr.toString() +'" data-displayPrice="'+ cartdisplayPriceArr.toString()+'" data-barcode="'+cartbarcodeArr.toString()+'" data-quantity= "'+cartQuantityArr.toString() +'"  data-subtotal="'+ cartsubtotalArr.toString()+'">Order All</a>');
    
    
    
    $('body').off('click','.orderAll').on('click','.orderAll' , function()
    {
       alert($(this).attr('data-cataloguetitle'));
       alert($(this).attr('data-picturefilename'));
       alert($(this).attr('data-fulldescription'));
       alert($(this).attr('data-displayPrice'));
       alert($(this).attr('data-barcode'));
       alert($(this).attr('data-quantity'));
       alert($(this).attr('data-subtotal'));
        
        
    });
}








function testgetjson()
{

    var SysPk_InvtyCatARR = [];
    var Barcode_InvtyCatARR = [];
    var SysFk_Freebies01_InvtyCatARR = [];
    var SysFk_Freebies02_InvtyCatARR = [];
    var SysFk_Freebies03_InvtyCatARR = [];
    var FullDescription_InvtyCatARR = [];
    var DisplayPrice_InvtyCatARR = [];
    var PromoPrice_InvtyCatARR = [];
    var PromoEndDate_InvtyCatARR = [];

    $.getJSON( "http://localhost/dummyPrestashop/", function( data )
    {/*
        {"PEOPLE":[{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}},{"PERSON":{"id":"2","name":"ong","city":"iligan","street":"kjkjljkj","homenum":"9809009","mobilenum":"9090909"}},{"PERSON":{"id":"3","name":"eu","city":"kjkjkj","street":"kjkjkjk","homenum":"909090","mobilenum":"8989"}},{"PERSON":{"id":"4","name":"james","city":"kjkjjk","street":"jkjk","homenum":"3333333","mobilenum":"444444444"}},{"PERSON":{"id":"5","name":"jerome","city":"kjkjkj","street":"kjkjkjk","homenum":"90090","mobilenum":"909090"}},{"PERSON":{"id":"6","name":"keyki","city":"jjkj","street":"kjkjk","homenum":"2147483647","mobilenum":"2147483647"}},{"PERSON":{"id":"7","name":"p-seven","city":"jhjhjhj","street":"hjh","homenum":"909090","mobilenum":"9090"}},{"PERSON":{"id":"8","name":"p-eight","city":"kjkjkjk","street":"jkjkj","homenum":"9090909","mobilenum":"90909"}}]}
    */

          $.each( data, function( index, value ) 
          {//key PEOPLE/[{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}},{"PERSON":{"id":"2","name":"ong","city":"iligan","street":"kjkjljkj","homenum":"9809009","mobilenum":"9090909"}},{"PERSON":{"id":"3","name":"eu","city":"kjkjkj","street":"kjkjkjk","homenum":"909090","mobilenum":"8989"}},{"PERSON":{"id":"4","name":"james","city":"kjkjjk","street":"jkjk","homenum":"3333333","mobilenum":"444444444"}},{"PERSON":{"id":"5","name":"jerome","city":"kjkjkj","street":"kjkjkjk","homenum":"90090","mobilenum":"909090"}},{"PERSON":{"id":"6","name":"keyki","city":"jjkj","street":"kjkjk","homenum":"2147483647","mobilenum":"2147483647"}},{"PERSON":{"id":"7","name":"p-seven","city":"jhjhjhj","street":"hjh","homenum":"909090","mobilenum":"9090"}},{"PERSON":{"id":"8","name":"p-eight","city":"kjkjkjk","street":"jkjkj","homenum":"9090909","mobilenum":"90909"}}]

                /*var obj = JSON.stringify(value);
                //alert(obj);*/

                $.each(value, function(inde, valu)
                {
                    //{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}}
                    $.each(valu, function(ind, val)
                    {//{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}



                        $.each( val, function( i, v )
                        {

                                if(i == "SysPk_InvtyCat")
                                {
                                     SysPk_InvtyCatARR.push(val['SysPk_InvtyCat']);
                                    $('.getjsontest').append(val['SysPk_InvtyCat'] + " inserted to array SysPk_InvtyCatARR<br>");
                                }
                                else if(i == "Barcode_InvtyCat")
                                {
                                    Barcode_InvtyCatARR.push(val['Barcode_InvtyCat']);
                                    $('.getjsontest').append(val['Barcode_InvtyCat'] + " inserted to array Barcode_InvtyCatARR<br>");
                                }
                                else if(i == "SysFk_Freebies01_InvtyCat")
                                {
                                    SysFk_Freebies01_InvtyCatARR.push(val['SysFk_Freebies01_InvtyCat']);
                                    $('.getjsontest').append(val['SysFk_Freebies01_InvtyCat'] + " inserted to array SysFk_Freebies01_InvtyCatARR<br>");

                                }                                       
                                else if(i == "SysFk_Freebies02_InvtyCat")
                                {
                                    SysFk_Freebies02_InvtyCatARR.push(val['SysFk_Freebies02_InvtyCat']);
                                    $('.getjsontest').append(val['SysFk_Freebies02_InvtyCat'] + " inserted to array SysFk_Freebies02_InvtyCatARR<br>");

                                }                                       
                                else if(i == "SysFk_Freebies03_InvtyCat")
                                {
                                    SysFk_Freebies03_InvtyCatARR.push(val['SysFk_Freebies03_InvtyCat']);
                                    $('.getjsontest').append(val['SysFk_Freebies03_InvtyCat'] + " inserted to array SysFk_Freebies03_InvtyCatARR<br>");

                                }
                                else if(i == "FullDescription_InvtyCat")
                                {
                                    FullDescription_InvtyCatARR.push(val['FullDescription_InvtyCat']);
                                    $('.getjsontest').append(val['FullDescription_InvtyCat'] + " inserted to array FullDescription_InvtyCatARR<br>");
                                }
                                else if(i == "DisplayPrice_InvtyCat")
                                {
                                    DisplayPrice_InvtyCatARR.push(val['DisplayPrice_InvtyCat']);
                                    $('.getjsontest').append(val['DisplayPrice_InvtyCat'] + " inserted to array DisplayPrice_InvtyCatARR<br>");
                                }
                                else if(i == "PromoPrice_InvtyCat")
                                {
                                    PromoPrice_InvtyCatARR.push(val['PromoPrice_InvtyCat']);
                                    $('.getjsontest').append(val['PromoPrice_InvtyCat'] + " inserted to array PromoPrice_InvtyCatARR<br>");
                                }
                                else if(i == "PromoEndDate_InvtyCat")
                                {
                                    PromoEndDate_InvtyCatARR.push(val['PromoEndDate_InvtyCat']);
                                    $('.getjsontest').append(val['PromoEndDate_InvtyCat'] + " inserted to array PromoEndDate_InvtyCatARR<br>");
                                }


                        });	

                    });	

                });
          });

            $('.getjsontest').append("there are " + SysPk_InvtyCatARR.length + " promo sets<br><hr><br>");
    
            }); 
}

/*----------------------------------------------------------------------*/
/*-------------------//navClickedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/




/*----------------------------------------------------------------------*/
/*-------------------viewItemClicked.js-------------------------------*/
/*----------------------------------------------------------------------*/
function queryItemDetails(tx,idForSinglePage)
{
    
  tx.executeSql('SELECT * FROM INVENTORY_MASTER_CATALOGUE WHERE SysPk_InvtyCat=' + idForSinglePage , [], renderSinglePage, errorCB);  
}

function renderSinglePage(tx,results)
{
    
    var doesThisExist = results.rows.length;
    
    
    
    if(doesThisExist > 0)
    {
        $('.content-cont').load('single-item.html',null,function(){
        
         $('.singleitemPictureFileName').attr('src',results.rows.item(0).PictureFileName_InvtyCat);
         $('.singleitemcataloguetitle').append(results.rows.item(0).CatalogueTitle_InvtyCat);
         $('.singleitemfulldescription').append(results.rows.item(0).FullDescription_InvtyCat);
         $('.singleitemdisplayprice').append(results.rows.item(0).DisplayPrice_InvtyCat);
         $('.singleitemsubtotal').append(results.rows.item(0).DisplayPrice_InvtyCat);//temporary. value will change on quantity input
        $( '.singleitemtable' ).after( '<a href="#" class="btn btn-success btn-large placeOrder" data-displayPrice="'+ results.rows.item(0).DisplayPrice_InvtyCat +'" data-cataloguetitle="'+ results.rows.item(0).CatalogueTitle_InvtyCat +'" data-picturefilename="'+ results.rows.item(0).PictureFileName_InvtyCat +'" data-fulldescription="'+ results.rows.item(0).FullDescription_InvtyCat +'" data-BarcodeInvtyCat="'+results.rows.item(0).Barcode_InvtyCat+'" data-quantity="1" data-subtotal="'+ results.rows.item(0).DisplayPrice_InvtyCat +'">Place Order</a>');
        
        });
       
        
        /*PROBABLY NEED TO MOVE TESE TO HTML IN THE FUTURE AND load each data per element
            var htmlstringSingle ='';
            htmlstringSingle += '<div class="row single-cont"><div class="col-md-6 col-sm-12 col-xs-12"><div class="img-container">';   
            htmlstringSingle += '<img src="'+ results.rows.item(0).PictureFileName_InvtyCat +'" class="responsiveImage">';
            htmlstringSingle += '</div></div>';
            htmlstringSingle += '<div class="col-md-6 col-sm-12 col-xs-12"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringSingle += '<h1>'+ results.rows.item(0).CatalogueTitle_InvtyCat +'</h1>';
            htmlstringSingle += '<p>'+ results.rows.item(0).FullDescription_InvtyCat +'</p>';
            htmlstringSingle += '<h3 class="pull-right">$<span class="glogprice">'+ results.rows.item(0).DisplayPrice_InvtyCat +'</span></h3>';
            htmlstringSingle += '</div> </div>';
            htmlstringSingle += '<div class="row"><div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringSingle += '<table class="totalcounter"><tr><td>';
            htmlstringSingle += '<label for="quantity">Quantity</label>';
            htmlstringSingle += '</td><td class="pull-right">';
            htmlstringSingle += '<input type="text" name="glogquantity" id="glogquantity" value="1">';
            htmlstringSingle += '</td></tr><tr><td>';
            htmlstringSingle += '<label for="quantity">Subtotal</label>';
            htmlstringSingle += '</td><td class="pull-right">';
            htmlstringSingle += '<div><p><span>$</span><span class="glogtotal">'+ results.rows.item(0).DisplayPrice_InvtyCat +'</span></p></div>';
            htmlstringSingle += '</td></tr></table>';
            htmlstringSingle += '<a href="#" class="btn btn-success btn-large placeOrder" data-displayPrice="'+ results.rows.item(0).DisplayPrice_InvtyCat +'" data-cataloguetitle="'+ results.rows.item(0).CatalogueTitle_InvtyCat +'" data-picturefilename="'+ results.rows.item(0).PictureFileName_InvtyCat +'" data-fulldescription="'+ results.rows.item(0).FullDescription_InvtyCat +'" data-BarcodeInvtyCat="'+results.rows.item(0).Barcode_InvtyCat+'" data-quantity="1" data-subtotal="'+ results.rows.item(0).DisplayPrice_InvtyCat +'">Place Order</a>';
            htmlstringSingle += '</div></div></div></div>';
        */
    }
    else
    {
        htmlstringSingle = 'Sorry, we do not have this item.';
        $('.content-cont').empty();
        $('.content-cont').append(htmlstringSingle);
    
    }


    
    
    

}
/*----------------------------------------------------------------------*/
/*-------------------//viewItemClicked.js-------------------------------*/
/*----------------------------------------------------------------------*/

/*----------------------------------------------------------------------*/
/*-------------------itemScannedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/
function queryItemDetailsByBarcode(tx,scanResult)
{
  //alert('queryItemDetailsByBarcode started');
  tx.executeSql('SELECT * FROM INVENTORY_MASTER_CATALOGUE WHERE Barcode_InvtyCat="' + scanResult +'"', [], renderSinglePage, errorCB); 
  //alert('queryItemDetailsByBarcode done');
}

//renderSinglePage already created for viewItemClicked.js

/*----------------------------------------------------------------------*/
/*-------------------//itemScannedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/



/*-----------------single-itme.html to cart.html---------------------*/

   
    
    $(document).on('input','#glogquantity',function ()
    {
        /*keycodes undefined are undefined so i did this instead*/

        
        var glogprice = $('.glogprice').html(); 
        
         var currentvalue = $('#glogquantity').val();
         var glogqlen = $.trim($('#glogquantity').val());
        
        //alert('glogqlen ='+glogqlen);
        
        if(glogqlen.length>0 && currentvalue != 0 && currentvalue !='0' && testinput(/[^0-9.]/, currentvalue)==0)//if not empty && not zero && (does not contain any none numeric && glogqlen == 1)
        {
          //alert('in if');
            //alert('currentvalue =' + currentvalue);
            
            var newvalue = currentvalue.toString().replace(/[^0-9\.]+/g, '');
            $('#glogquantity').val(newvalue);
            var qval = $('#glogquantity').val();
            
            
        }
        else
        {
            
          //alert('in else');
            currentvalue = 1;
           // //alert('currentvalue =' + currentvalue);
            
            var newvalue = currentvalue.toString().replace(/[^0-9\.]+/g, '');
            $('#glogquantity').val('');
            var qval = 1;

        }
        
        
        //alert('after if else');
             
            
           
            parseInt(qval);
                
           // //alert(qval);
            var glogtotaltemp = qval *  glogprice;   
            var glogtotal = glogtotaltemp.toFixed(2);
           // //alert('glogtotal =' + glogtotal);
            $('.glogtotal').empty();
            $('.glogtotal').append(glogtotal);
           
    
            $('.placeOrder').attr('data-quantity',qval);
            $('.placeOrder').attr('data-subtotal',glogtotal);
       
      
    });
    

function testinput(re, str)
{
  
    
    if (re.test(str) && (str.length == 1))
    {
       // //alert('contains none numeric and string length == 1');
        return 1;
    } 
    else
    {
      //  //alert('does not contain none numeric || or contains but length > 1');
        return 0;
    }
  
}



$(document).on('click','.placeOrder', function()
{
    
    var cataloguetitle = $(this).attr('data-cataloguetitle');
    var picturefilename = $(this).attr('data-picturefilename');
    var fulldescription = $(this).attr('data-fulldescription');
    var displayPrice = $(this).attr('data-displayPrice');
    var BarcodeInvtyCat = $(this).attr('data-BarcodeInvtyCat');
    var quantity = $(this).attr('data-quantity');
    var subtotal = $(this).attr('data-subtotal');
    
    //this prevents commas from cataloguetitles from being interpreted as , when localstorage string is turned into an array
    cataloguetitle = cataloguetitle.replace(',','(xxxGLogCommaxxx)');
    picturefilename = picturefilename.replace(',','(xxxGLogCommaxxx)');
    fulldescription = fulldescription.replace(',','(xxxGLogCommaxxx)');
    displayPrice = displayPrice.replace(',','(xxxGLogCommaxxx)');
    BarcodeInvtyCat = BarcodeInvtyCat.replace(',','(xxxGLogCommaxxx)');
    quantity = quantity.replace(',','(xxxGLogCommaxxx)');
    subtotal = subtotal.replace(',','(xxxGLogCommaxxx)');

    localStorage.cataloguetitle += cataloguetitle.toString()+',';
    localStorage.picturefilename += picturefilename.toString()+',';
    localStorage.fulldescription += fulldescription.toString()+',';
    localStorage.displayPrice += displayPrice.toString()+',';
    localStorage.BarcodeInvtyCat += BarcodeInvtyCat.toString()+',';
    localStorage.quantity += quantity.toString()+',';
    localStorage.subtotal += subtotal.toString()+',';
    
    alert('item added to cart');
    
    $('.forsingleonly a').click();
});

/*----------------//single-itme.html  to cart.html-------------------*/

/*---------------------------------------editOrder.html-----------------------------------*/
function editOrderPageQuantityInputListener()
{

   
    $(document).on('input','.edit-order-quantity',function ()
    {
        /*keycodes undefined are undefined so i did this instead*/
        var editorderdisplayprice = $('.edit-order-displayPrice').html(); 
        var currentq = $('.edit-order-quantity').val();
         var editorderlen = $.trim($('.edit-order-quantity').val());

        
        if(editorderlen.length>0 && currentq != 0 && currentq !='0' && testinput(/[^0-9.]/, currentq)==0)//if not empty && not zero && (does not contain any none numeric && glogqlen == 1)
        {
            var newq = currentq.toString().replace(/[^0-9\.]+/g, '');
            $('.edit-order-quantity').val(newq);
            var qval = $('.edit-order-quantity').val();
   
        }
        else
        {
            currentq = 1;
            var newq = currentq.toString().replace(/[^0-9\.]+/g, '');
            $('.edit-order-quantity').val('');
            var qval = 1;

        }
        
            parseInt(qval);     
          
            var glogtotaltemp = qval *  editorderdisplayprice;   
            var glogtotal = glogtotaltemp.toFixed(2);
          
            $('.edit-order-subtotal').empty();
            $('.edit-order-subtotal').append(glogtotal);

    });
}
/*-------------------------------//editorder.html----------------------------*/

function toNormalComma(stringWithCustomComma)
{
   var stringWithNormalComma = stringWithCustomComma.replace('(xxxGLogCommaxxx)',',');

    
    
    return stringWithNormalComma;
    
}

function toCustomComma(stringWithNormalComma)
{
    var stringWithCustomComma = stringWithNormalComma.replace(',','(xxxGLogCommaxxx)');

    
    return stringWithCustomComma;
}

