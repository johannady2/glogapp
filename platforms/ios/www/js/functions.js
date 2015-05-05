/*-----------------------------------------------------------------*/
/*------------------------Database-----------------------------------*/
/*------------------------------------------------------------------*/

document.addEventListener("deviceready",onDeviceReady,false);

var db;//GLOBAL VARIABLE

function onDeviceReady()
{
    alert('device is ready');
    db = window.openDatabase("Database","1.0","Cordova Demo", 2*1024*1024);
    db.transaction(createDB, errorCB, successCB);
   
}


function createDB(tx)
{
    
   
    tx.executeSql('DROP TABLE IF EXISTS INVENTORY_MASTER_CATALOGUE');
    
    
        tx.executeSql('CREATE TABLE IF NOT EXISTS INVENTORY_MASTER_CATALOGUE(id INTEGER PRIMARY KEY   AUTOINCREMENT ,Barcode_InvtyCat, title , image , description,displayPrice)',[],populateInventoryMasterCatalogue,errorCB);
    
    
    alert('Table created');
}

function errorCB(err)
{
    alert("Error processing SQL: " + err.message);
}

function successCB()
{
    alert('successful');

}

function populateInventoryMasterCatalogue(tx)
{
    alert('inserting');

   
    var sqlInsert = 'INSERT INTO INVENTORY_MASTER_CATALOGUE(Barcode_InvtyCat,title,image,description,displayPrice) VALUES(?,?,?,?,?)';
   
    tx.executeSql(sqlInsert,["101191","Long Image Sample","img/item1.jpg","with free 1kg rice","63.00"],null,errorCB);
    tx.executeSql(sqlInsert,["4801010127215","Johnson\'s Baby Cologne","img/item2.gif","with free milk","63.00"],null,errorCB);
    tx.executeSql(sqlInsert,["8999999003395","Pond\'s Pure White","img/item3.jpg","with free candy","14.00"],null,errorCB);
    tx.executeSql(sqlInsert,["4807788058850","Iron Supplement","img/item4.gif","with free facial chocolate","99.99"],null,errorCB);
    tx.executeSql(sqlInsert,["12345","Pocky Cholcate","img/item5.jpg","free Soy Sauce","99.99"],null,errorCB);
    tx.executeSql(sqlInsert,["795144075167","Pocky Set","img/item6.jpg","BUY 1 TAKE 1","15.00"],null,errorCB);
    tx.executeSql(sqlInsert,["400541548218","Faber Castell TextLiner 48","img/item7.jpg","with free facial baby poweder","232.00"],null,errorCB);
    tx.executeSql(sqlInsert,["123","Flour 2kg","img/item8.jpg","Free Cookies","232.00"],null,errorCB);
    tx.executeSql(sqlInsert,["11223344","Maxx","img/item9.jpg","Mentos","232.00"],null,errorCB);


    alert('inserted');

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

            htmlstringCatalaogue += '<div class="item"><div class="row artcont"><div class="col-md-12 col-ms-12 col-xs-12"><article><header class="entry-header page-header"><div class="row"><div class="col-md-8 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h1 class="entry-title">'+ results.rows.item(ind).title +'</h1>';
            htmlstringCatalaogue += '</div><div class="col-md-4 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h3 class="entry-title">$'+ results.rows.item(ind).displayPrice +'</h1>';
            htmlstringCatalaogue += '</div></div></header>';
            htmlstringCatalaogue += '<div class="entry-content"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="img-container">';
            htmlstringCatalaogue += '<img src="'+ results.rows.item(ind).image +'" class="responsiveImage">';
            htmlstringCatalaogue += '</div><br/></div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<p>'+ results.rows.item(ind).description +'</p>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).id +'">View</a>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '</div></div></article></div></div></div>';

        }
    
        $('#list').append(htmlstringCatalaogue);
    
        
}




function queryForSearch(tx)
{
    alert("oh yeah!!!! successqueryForSearch");
    var enteredBarcode = $('#searchForm').children('[name="search"]').val();
    
    tx.executeSql('SELECT * FROM INVENTORY_MASTER_CATALOGUE WHERE Barcode_InvtyCat = "' + enteredBarcode +'"' , [], renderSearchResults, errorCB);
}

function renderSearchResults(tx,results)
{
    var htmlstring = "";
    var len = results.rows.length;
    
    alert('length ' + len);
    
    
  
    for(var ind=0; ind < len; ind++)
    {
        
        htmlstring += '<li>'+ results.rows.item(ind).title+'<br><img src="'+ results.rows.item(ind).image +'"><br><a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).id +'">View</a></li>';
   
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

        localStorage.searchedValueStorage = searchedValue;
        $('.lastsearched').empty().append(localStorage.searchedValueStorage);

        return false;
    });
        
        
             $('.lastsearched').append(localStorage.searchedValueStorage);
}



function testlocalstorage()
{
            
            var item1 = new Array();// or var arr = [];
            item1.push('item 1 detail_1');
            item1.push('item 1 detail_2');
            item1.push('item 1 detail1_3');


            var item2 = new Array();// or var arr = [];
            item2.push('item 2 detail_1');
            item2.push('item 2 detail_2');
            item2.push('item 2 detail1_3');


            var item3 = new Array();// or var arr = [];
            item3.push('item 3 detail_1');
            item3.push('item 3 detail_2');
            item3.push('item 3 detail1_3');


            var itemslist = new Array();
            itemslist.push(item1);
            itemslist.push(item2);
            itemslist.push(item3);

            // window.localStorage.setItem("LS1name", LS1);
            window.localStorage["itemslist_LS"] = itemslist;

            //$('.localstoragetest').html(window.localStorage.getItem("LS1name"));
            $('.localstoragetest').append("itemslist_LS(string): "+window.localStorage["itemslist_LS"] + "<br><br>");
            $('.localstoragetest').append("itemslist(array): "+itemslist);
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
                        alert(obj);*/

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
                
                
            
                
                
                
                /*
                    //OTHER WAY
                	for(aPromoSet in data)
					{
                        
						var promoSet = data[aPromoSet];
						
						
						console.log(promoSet.DisplayPrice_InvtyCat);
					}
					
					$.each( data[aPromoSet], function( key, value )
					{
                        
						$.each( value, function( ke, valu )
						{
                            $.each( valu, function( k, val )
                            {
                                    alert( k + ": " + val );
                            });
						});
					});*/
                
            }); 
}























/*----------------------------------------------------------------------*/
/*-------------------//navClickedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/