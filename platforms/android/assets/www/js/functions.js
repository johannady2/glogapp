/*-----------------------------------------------------------------*/
/*------------------------Database-----------------------------------*/
/*------------------------------------------------------------------*/

document.addEventListener("deviceready",onDeviceReady,false);

/*~~~~~~~~~~~~~~~~~~~~~~GLOBAL VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var db;
var idForSinglePage;//uses primary key to open singlepage
var scanResult;//the barcode you get from scanning
var orderidtoedit;//index of cart item. for editorder page.

var globalorderFromSwitch;//switch for catalogue or search because they use the same query
var globalorderedFrom;//when single page is opened.

//FOR toNormalString AND toCustomString
//how to use: toNormalString(str); then put returnedNormal/returnedCustom to where str is supposed to be.
var returnedNormal;//because if() return has weird results. and if()else(return) returns undefined.
var returnedCustom;

var returnedReplaceQuote;

var RecordCounter = 0;//for reccursive function  for rendering catalogue items. because for loop won't wait until select statement is successful.
var txparam; // tx ca not be passed as a parameter to nextRecord() as callback so made this global variable.
var resulstparam;//results ca not be passed as a parameter to nextRecord()as callback so made this global variable.


//if variable is undefined, define.
if(localStorage.BarcodeInvtyCat == null)
{
    
    /*FOR LOCALSTORAGE TO ARRAY*/
    //NOTE: x,y,z
    var cartSKUArr;
	var cartpicturefilenameArr;
    var cartbarcodeArr;
    var cartbrandArr;
    var cartfulldescriptionArr;
    var cartpromonameArr;
	var cartpromoPriceArr;
	var cartpromoEndDateArr;
	var cartpromoStartDateArr;
    var cartQuantityArr;
    var cartsubtotalArr;
	var cartorderedFromArr;//to know whether item was ordered from scan or catalogue or search

    
    /*initialized on placeOrder click*/
    //NOTE: x,y,z,
    //always add "," at the end of array when storing as localStorage
    localStorage.sku = '';
	localStorage.picturefilename = '';
	localStorage.BarcodeInvtyCat = '';
	localStorage.BrandInvtyCat = '';
	localStorage.fulldescription = '';
    localStorage.promoname = '';
    localStorage.promoPrice = '';
	localStorage.promoenddate = '';
	localStorage.promostartdate = '';
    localStorage.quantity = '';
    localStorage.subtotal = '';
    localStorage.orderedfrom ='';
	
    /*initialized on renderCart*/
    localStorage.orderid='';
}


	//-------------FOR API
		//--INVENTORY_MASTER_CATALOGUE
		var RowNumber_InvtyCatARR = [];
		var SysPk_InvtyCatARR =[];
		var	SysFk_CatMstr_InvtyCatARR = [];
		var	SKU_InvtyCatARR =[];
		var PictureFileName_InvtyCatARR= [];
		var	Barcode_InvtyCatARR = [];
		var	Brand_InvtyCatARR = [];
		var	Brand_InvtyCatARR = [];
		var	FullDescription_InvtyCatARR = [];
		var	PromoName_InvtyCatARR = [];
		var	PromoPrice_InvtyCatARR = [];

		var InventoryMasterCataloguedataLength;//get this fromgetjsonForINVENTORY_MASTER_CATALOGUE();
		var apiInvtyCatRecordCounter = 0;
		var apiInvtyCattxparam;
		//--//INVENTORY_MASTER_CATALOGUE

	//------------//FOR API

/*~~~~~~~~~~~~~~~~~~~~//GLOBAL VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//getjsonForINVENTORY_MASTER_CATALOGUE();

function errorCB(err)
{
    alert("Error processing SQL: " + err.message);
   
}

function successCB()
{
  //alert('successful');

}


function onDeviceReady()
{
    
    db = window.openDatabase("Database","1.0","Cordova Demo", 4*1024*1024);
    db.transaction(createDB, errorCB, successCB);
   
}
/*
"CREATE TABLE IF NOT EXISTS sample_db(id INTEGER PRIMARY KEY AUTOINCREMENT,
name_field TEXT NOT NULL DEFAULT "",
interval INTEGER NOT NULL DEFAULT 0, date_added TIMESTAMP DEFAULT (datetime('now','localtime')));
"
*/

function createDB(tx)
{
    tx.executeSql("DROP TABLE IF EXISTS INVENTORY_MASTER_CATALOGUE");
    var query = "";
    query += "CREATE TABLE IF NOT EXISTS INVENTORY_MASTER_CATALOGUE(RowNumber_InvtyCat INTEGER  PRIMARY KEY AUTOINCREMENT,SysPk_InvtyCat,";
    //query += "CREATE TABLE IF NOT EXISTS INVENTORY_MASTER_CATALOGUE(RowNumber_InvtyCat,SysPk_InvtyCat,";
    query += "SysFk_Invty_InvtyCat,SysFk_CatMstr_InvtyCat,SKU_InvtyCat,SysSeq_InvtyCat,UserSeq_InvtyCat, UserPk_InvtyCat,";
    query += "UserFk_Invty_InvtyCat,UserFk_CatMstr_InvtyCat,LastUpdatedBy_InvtyCat,LastUpdatedConcurrencyID_InvtyCat,LastUpdatedDate_InvtyCat TIMESTAMP DEFAULT (datetime('now','localtime')),";
    query += "Module_InvtyCat, Particulars_InvtyCat,PictureFileName_InvtyCat , Status_InvtyCat, Type_InvtyCat,";
    query += "Barcode_Freebies01_InvtyCat,Barcode_Freebies02_InvtyCat,Barcode_Freebies03_InvtyCat,Barcode_Freebies04_InvtyCat,Barcode_Freebies05_InvtyCat,";
    query += "Barcode_InvtyCat, Brand_InvtyCat ,CatalogueTitle_InvtyCat ,";
    query += "CataloguePageNumber_InvtyCat,Categories_InvtyCat,Classification_InvtyCat,Description_InvtyCat,DisplayPrice_InvtyCat DECIMAL(9,2),";
    query += "FreeDescription_InvtyCat,FullDescription_InvtyCat,PromoName_InvtyCat,PromoPrice_InvtyCat,PricePerPiece_InvtyCat,";
    query += "PromoStartDate_InvtyCat TIMESTAMP, PromoEndDate_InvtyCat TIMESTAMP, Principal_InvtyCat, PercentDiscount_InvtyCat,PriceRageMin_InvtyCat,PriceRangeMax_InvtyCat, QRcode_InvtyCat,";
    query += "RecordAddedDate_InvtyCat,SavingsAmount_InvtyCat,SysFk_Freebies01_InvtyCat,SysFk_Freebies02_InvtyCat,SysFk_Freebies03_InvtyCat,SysFk_Freebies04_InvtyCat,SysFk_Freebies05_InvtyCat,";
    query += "UnitOfMeasure_InvtyCat,UserFk_Freebies01_InvtyCat,UserFk_Freebies02_InvtyCat,UserFk_Freebies03_InvtyCat,UserFk_Freebies04_InvtyCat,UserFk_Freebies05_InvtyCat)";
    tx.executeSql( query ,[],populateInventoryMasterCatalogue,errorCB);
 
 
    tx.executeSql("DROP TABLE IF EXISTS CATALOGUE_MASTER");
    var query2 = "";
    query2 += "CREATE TABLE IF NOT EXISTS CATALOGUE_MASTER( RowNumber_CatMstr INTEGER PRIMARY KEY AUTOINCREMENT, SysPk_CatMstr,";
    query2 += "SysFk_CatMstr,SysSeq_CatMstr, UserPk_CatMstr, LastUpdatedBy_CatMstr, LastUpdatedConcurrencyID_CatMstr, LastUpdatedDate_CatMstr TIMESTAMP DEFAULT (datetime('now','localtime')), Module_CatMstr,";
    query2 += "Particulars_CatMstr,PictureFileName_CatMstr, Status_CatMstr,Type_CatMstr,";
    query2 += "CatalogueTitle_CatMstr, Description_CatMstr, FullDescription_CatMstr, FreeDescription_CatMstr,";
    query2 += "Principal_CatMstr,PromoEndDate_CatMstr TIMESTAMP, PromoStartDate_CatMstr TIMESTAMP)";
    tx.executeSql( query2,[],populateCatalogueMaster,errorCB);
    
    
    tx.executeSql("DROP TABLE IF EXISTS INVENTORY_MASTER");
    var query3 ="";
    query3 += "CREATE TABLE IF NOT EXISTS INVENTORY_MASTER(RowNumber_Invty INTEGER PRIMARY KEY AUTOINCREMENT, SysPk_Invty,";
    query3 += "UserPk_Invty, LastUpdatedBy_Invty, LastUpdatedConcurrencyID_Invty, LastUpdatedDate_Invty TIMESTAMP DEFAULT  (datetime('now','localtime')),";
    query3 += "Module_Invty,Particulars_Invty,PictureFileName_Invty, Status_Invty, Type_Invty, Barcode_Invty,";
    query3 += "Brand_Invty,Classification_Invty, Categories_Invty, Description_Invty,FullDescription_Invty,FreeDescription_Invty,";
    query3 += "DisplayPrice_Invty, Principal_Invty, QRcode_Invty, SubCategories_Invty)";
    tx.executeSql(query3,[],populateInventoryMaster, errorCB);
	
	
	tx.executeSql("DROP TABLE IF EXISTS SETTINGS");
	var query4 ="";
	query4 +="CREATE TABLE IF NOT EXISTS SETTINGS(MinimumPrice_Settings)";
	tx.executeSql(query4,[],populateSettingsTable,errorCB);
	

	tx.executeSql("DROP TABLE IF EXISTS CATEGORY_MASTER");
	var query5= "";
	query5 += "CREATE TABLE IF NOT EXISTS CATEGORY_MASTER ";
	query5 += "(RowNumber_CatgyMstr INTEGER PRIMARY KEY AUTOINCREMENT,SysPk_CatgyMstr, CategoryName_CatgyMstr)";//
	tx.executeSql(query5,[],populateCategoryMaster,errorCB);//populateCategoryMaster
	
	
	//relationship between inventory master catalogue && category master
	tx.executeSql("DROP TABLE IF EXISTS INVENTORY_MASTER_CATALOGUE_CATEGORY");
	var query6 ="";
	query6 +="CREATE TABLE IF NOT EXISTS INVENTORY_MASTER_CATALOGUE_CATEGORY(RowNumber_InvtyCatCatgy INTEGER PRIMARY KEY AUTOINCREMENT,SysFk_InvtyCat_InvtyCatCatgy, SysFk_CatgyMstr_InvtyCatCatgy)";
	tx.executeSql(query6,[],populateInvtyCatCatgy,errorCB);
	
}




function populateInventoryMasterCatalogue(tx)
{
  

/*
	alert('apiInvtyCatRecordCounter =' + apiInvtyCatRecordCounter);

	
		var RecordBeingProcessesd =  apiInvtyCatRecordCounter + 1;//get this fromgetjsonForINVENTORY_MASTER_CATALOGUE();
		apiInvtyCattxparam = tx;
		var sqlInsert = "INSERT INTO INVENTORY_MASTER_CATALOGUE(RowNumber_InvtyCat,SysPk_InvtyCat,SysFk_CatMstr_InvtyCat,SKU_InvtyCat,PictureFileName_InvtyCat,Barcode_InvtyCat,Brand_InvtyCat,FullDescription_InvtyCat,PromoName_InvtyCat,PromoPrice_InvtyCat) VALUES(?,?,?,?,?,?,?,?,?,?)";

			
		if(RecordBeingProcessesd < InventoryMasterCataloguedataLength)// will have to make if < and else if == because last insert has a callback.
		{

				db.transaction(function(tx3){
					tx3.executeSql(sqlInsert,[RowNumber_InvtyCatARR[apiInvtyCatRecordCounter],SysPk_InvtyCatARR[apiInvtyCatRecordCounter],SysFk_CatMstr_InvtyCatARR[apiInvtyCatRecordCounter],SKU_InvtyCatARR[apiInvtyCatRecordCounter],PictureFileName_InvtyCatARR[apiInvtyCatRecordCounter],Barcode_InvtyCatARR[apiInvtyCatRecordCounter],Brand_InvtyCatARR[apiInvtyCatRecordCounter],FullDescription_InvtyCatARR[apiInvtyCatRecordCounter] ,PromoName_InvtyCatARR[apiInvtyCatRecordCounter],PromoPrice_InvtyCatARR[apiInvtyCatRecordCounter]],null,errorCB);
				},errorCB,function(){  apiInvtyCatRecordCounter  += 1;  populateInventoryMasterCatalogue(apiInvtyCattxparam);});

		}
		else if(RecordBeingProcessesd == InventoryMasterCataloguedataLength)//on last insert callback queryforexpired.
		{
				db.transaction(function(tx3){
					tx3.executeSql(sqlInsert,[RowNumber_InvtyCatARR[apiInvtyCatRecordCounter],SysPk_InvtyCatARR[apiInvtyCatRecordCounter],SysFk_CatMstr_InvtyCatARR[apiInvtyCatRecordCounter],SKU_InvtyCatARR[apiInvtyCatRecordCounter],PictureFileName_InvtyCatARR[apiInvtyCatRecordCounter],Barcode_InvtyCatARR[apiInvtyCatRecordCounter],Brand_InvtyCatARR[apiInvtyCatRecordCounter],FullDescription_InvtyCatARR[apiInvtyCatRecordCounter] ,PromoName_InvtyCatARR[apiInvtyCatRecordCounter],PromoPrice_InvtyCatARR[apiInvtyCatRecordCounter]],queryForExpired,errorCB);
				},errorCB,function(){  apiInvtyCatRecordCounter  += 1;  populateInventoryMasterCatalogue(apiInvtyCattxparam);});

		}
		else
		{
			apiInvtyCatRecordCounter = 0;
		}
		
  */
    var sqlInsert = "INSERT INTO INVENTORY_MASTER_CATALOGUE(SysPk_InvtyCat,SysFk_CatMstr_InvtyCat,SKU_InvtyCat,PictureFileName_InvtyCat,Barcode_InvtyCat,Brand_InvtyCat,FullDescription_InvtyCat,PromoName_InvtyCat,PromoPrice_InvtyCat) VALUES(?,?,?,?,?,?,?,?,?)";
   
   
    tx.executeSql(sqlInsert,["111111","4","111111","img/item1.jpg","101191","natasha","string part 1 of 2,string part 2 of 2." ,"string part 1 of 3 , string part 2 of 3 , string part 3 of 3",63.00],null,errorCB);
    tx.executeSql(sqlInsert,["333333","4","333333","img/item3.jpg","8999999003395","natasha","with free candy","Pond\'s Pure\' White",14.00],null,errorCB);
    tx.executeSql(sqlInsert,["444444","4","444444","img/item4.gif","4807788058850","natasha","with freechocolate","Iron Supplement",99.99],null,errorCB);
    tx.executeSql(sqlInsert,["555555","1","555555","img/item5.jpg","12345","natasha","free Soy Sauce","Used \"Monggol\" Pencil",31.99],null,errorCB);
    tx.executeSql(sqlInsert,["666666","1","666666","img/item6.jpg","795144075167","natasha","BUY 1 TAKE 1","Strawberry Used Kiss Intimate Secret",15.00],null,errorCB);
	tx.executeSql(sqlInsert,["777777","1","777777","img/item7.jpg","4005401548218","natasha","with free baby poweder","Faber Castell TextLiner 48",232.25],null,errorCB);
  
	
	
	tx.executeSql(sqlInsert,["222222","3","222222","img/item2.gif","4801010127215","avon","with free milk","GIF sample",63.00],null,errorCB);
	tx.executeSql(sqlInsert,["888888","3","888888","img/item8.jpg","123","avon","Free Cookies","Pocky Strawberry",232.00],null,errorCB);
    tx.executeSql(sqlInsert,["999999","3","999999","img/item9.jpg","11223344","avon","Mentos","Pocky Set",232.00],null,errorCB);

    tx.executeSql(sqlInsert,["11111111","2","11111111","img/Item10.jpg","987654321098","avon","pack of 8","40L notebooks",50.00],null,errorCB);
    tx.executeSql(sqlInsert,["22222222","2","22222222","img/Item11.jpg","036000291452","avon","pack of 8","Jockey Lowrise Brief",325.00],null,errorCB);
    tx.executeSql(sqlInsert,["33333333","2","33333333","img/Item12.jpg","016000660601","avon","(P799.75 each) save 10%","Trolley Bags",799.75],null,errorCB);
    tx.executeSql(sqlInsert,["44444444","2","44444444","img/Item13.jpg","5010029020519","avon","was P399","shoes",299.00],null,errorCB);
    tx.executeSql(sqlInsert,["55555555","2","55555555","img/Item14.jpg","*9123*39","etude house","(P198.00 each)","TSport Backpacks",198.00],null,errorCB);
    tx.executeSql(sqlInsert,["66666666","2","66666666","img/Item15.jpg","50184385","etude house","save P10","Shining East Value Pack",99.00],null,errorCB);
    tx.executeSql(sqlInsert,["77777777","2","77777777","img/Item16.jpg","5702012000737","etude house","Buy 1 Take 1","Darlington",89.75],null,errorCB);
    tx.executeSql(sqlInsert,["88888888","2","88888888","img/Item17.jpg","850785004003","etude house","was P1899","Sanyang Clerical Chair",1519.20],null,errorCB);
    tx.executeSql(sqlInsert,["99999999","2","99999999","img/Item18.jpg","741360988644","etude house","was P1595","Sanyang Computer Table",1276.00],null,errorCB);
    tx.executeSql(sqlInsert,["1111111111","2","1111111111","img/Item19.jpg","123456789012","etude house","was P1695","Sanyang Office Table",1320.00],null,errorCB);
    tx.executeSql(sqlInsert,["2222222222","2","2222222222","img/Item20.jpg","042000062008","etude house","was P3750","Sanyang Study Table",3000.00],null,errorCB);
    tx.executeSql(sqlInsert,["3333333333","2","3333333333","img/Item21.jpg","012345678905","etude house","pack of 10","80L notebooks",100.00],queryForExpired,errorCB);
   



}


function queryCategoriesForSelectBox(tx)
{   
	tx.executeSql('SELECT * FROM CATEGORY_MASTER', [], renderCategoriesToSelectBox);
}

function renderCategoriesToSelectBox(tx,results)
{   
    var categoriesString = '';
	
	for(var ind=0; ind < results.rows.length ; ind++ )
	{
		categoriesString += '<option value="'+results.rows.item(ind).SysPk_CatgyMstr+'">'+results.rows.item(ind).CategoryName_CatgyMstr+'</option>';
	}
	$('.search-category').append(categoriesString);
 

}

function queryCataloguesForSelectBox(tx)
{
   
    	tx.executeSql('SELECT * FROM CATALOGUE_MASTER', [], renderCataloguesToSelectBox);
}

function renderCataloguesToSelectBox(tx,results)
{  
    
    var CataloguesString = '';

	for(var ind=0; ind < results.rows.length ; ind++ )
	{
		CataloguesString += '<option value="'+results.rows.item(ind).SysPk_CatMstr+'">'+results.rows.item(ind).CatalogueTitle_CatMstr+'</option>';
	}
	$('.search-catalogue').append(CataloguesString);
}


function queryForExpired(tx)
{
	var queryexpd = 'SELECT DISTINCT IMC.SysFk_CatMstr_InvtyCat,CM.* FROM INVENTORY_MASTER_CATALOGUE AS IMC ';
	queryexpd += 'INNER JOIN CATALOGUE_MASTER AS CM ';
	queryexpd += 'ON IMC.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr ';
	queryexpd += 'WHERE PromoEndDate_CatMstr < ? ';
	var datetimenow = getDateTimeNow();
	tx.executeSql(queryexpd, [datetimenow], deleteExpiredPromos);
}

function deleteExpiredPromos(tx,results)
{
	//alert(results.rows.length);
	
	
	
	var deleteString = '';
	
	for(var ind=0; ind < results.rows.length ; ind++ )
	{
		
		//alert(results.rows.item(ind).SysFk_CatMstr_InvtyCat);
		
		deleteString += '"'+results.rows.item(ind).SysFk_CatMstr_InvtyCat + '",';
		
	}
	
	//deleteString
	
	deleteString = deleteString.substring(0, deleteString.length - 1);
	
	//var testDelString = ' ';
	//alert(deleteString);
	
	
	tx.executeSql('DELETE FROM CATALOGUE_MASTER WHERE SysPk_CatMstr IN('+ deleteString +')');
	tx.executeSql('DELETE FROM INVENTORY_MASTER_CATALOGUE WHERE SysFk_CatMstr_InvtyCat IN('+ deleteString +')',[],null,errorCB);
	
}



function populateCatalogueMaster(tx)
{
    var sqlInsert2 = "INSERT INTO CATALOGUE_MASTER(SysPk_CatMstr,SysSeq_CatMstr,CatalogueTitle_CatMstr, PromoEndDate_CatMstr, PromoStartDate_CatMstr) VALUES(?,?,?,?,?)";
    
    tx.executeSql(sqlInsert2,["1",2,"Johanna Catalogue","2015-05-15 24:59:59","2015-05-11 00:00:00"],null,errorCB);
    tx.executeSql(sqlInsert2,["2",1,"Back To School Catalogue","2015-05-29 24:59:59","2015-05-29 00:00:00"],null,errorCB);
	tx.executeSql(sqlInsert2,["3",3,"Expired Catalogue","2014-05-13 24:59:59","2015-05-11 00:00:00"],null,errorCB);
	tx.executeSql(sqlInsert2,["4",4,"NOOOTOOSHOO Catalogue","2015-05-14 24:59:59","2015-05-11 00:00:00"],null,errorCB);
}


function populateInventoryMaster()
{
     //alert('populate inventory master');
}

function populateSettingsTable(tx)
{

	   var sqlInsert4 = "INSERT INTO SETTINGS(MinimumPrice_Settings) VALUES(?)";
		tx.executeSql(sqlInsert4,[1000],null,errorCB);
  
}

function populateCategoryMaster(tx)
{	
		var sqlInsert5 = "INSERT INTO CATEGORY_MASTER(SysPk_CatgyMstr, CategoryName_CatgyMstr) VALUES(?,?)";
		tx.executeSql(sqlInsert5,["catgy1","Category Name 1"],null,errorCB);
		tx.executeSql(sqlInsert5,["catgy2","Category Name 2"],null,errorCB);
		tx.executeSql(sqlInsert5,["catgy3","Category Name 3"],null,errorCB);
		tx.executeSql(sqlInsert5,["catgy4","Category Name 4"],null,errorCB);
		tx.executeSql(sqlInsert5,["catgy5","Category Name 5"],null,errorCB);
		tx.executeSql(sqlInsert5,["catgy6","Category Name 6"],null,errorCB);
	
	
}


function populateInvtyCatCatgy(tx)
{
	//alert('test1');
	var sqlInsert6 = "INSERT INTO INVENTORY_MASTER_CATALOGUE_CATEGORY(SysFk_InvtyCat_InvtyCatCatgy, SysFk_CatgyMstr_InvtyCatCatgy) VALUES(?,?)";
	tx.executeSql(sqlInsert6,["111111","catgy1"],null,errorCB);
	tx.executeSql(sqlInsert6,["333333","catgy2"],null,errorCB);
	tx.executeSql(sqlInsert6,["444444","catgy3"],null,errorCB);
	tx.executeSql(sqlInsert6,["555555","catgy4"],null,errorCB);
	tx.executeSql(sqlInsert6,["666666","catgy5"],null,errorCB);
	tx.executeSql(sqlInsert6,["777777","catgy6"],null,errorCB);


	//alert('test2');
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





function queryCatalogues(tx)
{
 
   //tx.executeSql('SELECT IMC.*,CM.* FROM INVENTORY_MASTER_CATALOGUE AS IMC INNER JOIN CATALOGUE_MASTER AS CM ON IMC.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr' , [], renderCatalogueItems, errorCB);  
   tx.executeSql('SELECT * FROM CATALOGUE_MASTER ORDER BY SysSeq_CatMstr ASC' , [], nextRecord, errorCB);  
//	alert('select sql excecuted');
}

function nextRecord(tx,results)
{
		var recordBeingProcessed = RecordCounter + 1;//plus one because RecordCounter starts at zero..
	   var numberOfCatalogues = results.rows.length;
	


	//alert('numberOfCatalogues -' + numberOfCatalogues);
	//alert('recordBeingProcessed -' + recordBeingProcessed);
	   if(recordBeingProcessed <= numberOfCatalogues)
	   {
		   
		   
		   txparam = tx; // so i can pass this object to callback
			resulstparam = results;
		   
			//alert(results.rows.item(RecordCounter).CatalogueTitle_CatMstr);
			$('.lists-cont').append('<div class="catalogueTitle-cont"><h1 class="catalogueTitle">'+  results.rows.item(RecordCounter).CatalogueTitle_CatMstr  +'</h1><small>Valid from: ' + results.rows.item(RecordCounter).PromoStartDate_CatMstr + ' to ' + results.rows.item(RecordCounter).PromoEndDate_CatMstr +'</small></div><div class="clearfix"></div><div class="clearfix"></div><div class="list listSet-'+results.rows.item(RecordCounter).SysPk_CatMstr+'"></div><div class="clearfix"></div>');
			
			db.transaction(function(tx2){
				tx2.executeSql('SELECT IMC.*,CM.SysPk_CatMstr AS syspkcatmstr, CM.CatalogueTitle_CatMstr, CM.PromoEndDate_CatMstr, CM.PromoStartDate_CatMstr  FROM INVENTORY_MASTER_CATALOGUE AS IMC INNER JOIN CATALOGUE_MASTER AS CM ON IMC.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr WHERE IMC.SysFk_CatMstr_InvtyCat = ?', [results.rows.item(RecordCounter).SysPk_CatMstr], renderCatalogueItems);// WHERE IMC.SysFk_CatMstr_InvtyCat ="'+ results.rows.item(RecordCounter).CatalogueTitle_CatMstr +'"
			},errorCB,function(){  RecordCounter  += 1;  nextRecord(txparam,resulstparam);});
		   
		  
		
	   }
	   else
	   {
		 //  alert('no more records');
		   RecordCounter = 0;//reset to zero because it's a global varibale.. so that will start counting zero again when we comeback from a different page.
	   }
	

		/*for(var ind=0; ind < results.rows.length ; ind++)
		{
			$('.lists-cont').append('<h1>'+  results.rows.item(ind).CatalogueTitle_CatMstr  +'</h1><div class="list listSet-'+results.rows.item(ind).SysPk_CatMstr+'"></div>');
	
		}*/


}





function renderCatalogueItems(tx2,results)
{
	
	//alert('renderCatalogueItems' + results.rows.length);

	
      var numberOfCatalogueItems = results.rows.length;
     //  alert(numberOfCatalogueItems);
        var htmlstringCatalaogue ='';
        for(var ind=0; ind < numberOfCatalogueItems; ind++)
        {
            htmlstringCatalaogue += '<div class="item"><div class="row artcont"><div class="col-md-12 col-ms-12 col-xs-12"><article class="oneitemarticle"><header class="entry-header page-header"><div class="row"><div class="col-md-8 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h1 class="entry-title">' + results.rows.item(ind).PromoName_InvtyCat +'</h1>';
            htmlstringCatalaogue += '<h4 class="entry-title">' + results.rows.item(ind).Brand_InvtyCat +'</h4>';
            htmlstringCatalaogue += '</div><div class="col-md-4 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<h3 class="entry-title">$'+ results.rows.item(ind).PromoPrice_InvtyCat +'</h1>';
            htmlstringCatalaogue += '</div></div></header>';
            htmlstringCatalaogue += '<div class="entry-content"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="img-container">';
            htmlstringCatalaogue += '<img src="'+ results.rows.item(ind).PictureFileName_InvtyCat +'" class="responsiveImage">';
            htmlstringCatalaogue += '</div><br/></div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<p>'+ results.rows.item(ind).FullDescription_InvtyCat + '</p>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '<div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringCatalaogue += '<a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).RowNumber_InvtyCat +'">View</a>';
            htmlstringCatalaogue += '</div>';
            htmlstringCatalaogue += '</div></div></article></div></div></div>';
			
			
			
			
		
			
        }
    
    
		
     $('.listSet-'+results.rows.item(0).syspkcatmstr).append(htmlstringCatalaogue);
    // $('#list').append(htmlstringCatalaogue);
		
	
		
}


function queryForSearch(tx)
{
  
	
    var enteredBarcode = $('input[name="search-barcode"]').val();
	var enteredPromoname = $('input[name="search-promoname"]').val();
    var enteredfulldescription = $('input[name="search-fulldescription"]').val();
	var enteredBrand = $('input[name="search-brand"]').val();
	var enteredCatalogue = $('.search-catalogue').val();
	var enteredCategory = $('.search-category').val();

	
	var enteredBarcodelength = enteredBarcode.length;
	//alert('barcode length: ' + enteredBarcodelength);
	if(enteredBarcodelength > 0)
	{
	  var barcodeWhereString  = ' IMCIMCCatgy.Barcode_InvtyCat = "' + enteredBarcode +'"';
	}
	else
	{
		var barcodeWhereString = '';
	}
	
	
	var enteredPromonamelength = enteredPromoname.length;
	//alert('promo name length: ' + enteredPromonamelength);
	if(enteredPromonamelength > 0)
	{
		replaceQuotes(enteredPromoname);
	  var promonameWhereString  = ' AND  IMCIMCCatgy.PromoName_InvtyCat LIKE  "%' + returnedReplaceQuote  +'%"';

	}
	else
	{
		var promonameWhereString = '';
	}
    
    var enteredfulldescriptionlength = enteredfulldescription.length;
	//alert('promo name length: ' + enteredfulldescriptionlength);
	if(enteredfulldescriptionlength > 0)
	{
		replaceQuotes(enteredfulldescription);
	  var fulldescriptionWhereString  = ' AND  IMCIMCCatgy.FullDescription_InvtyCat LIKE  "%' + returnedReplaceQuote +'%"';
	}
	else
	{
		var fulldescriptionWhereString = '';
	}
    
	
	var enteredBrandlength = enteredBrand.length;
	//alert('brand length: ' + enteredBrandlength);
	if(enteredBrandlength > 0)
	{
	  var brandWhereString  = ' AND  IMCIMCCatgy.Brand_InvtyCat LIKE  "%' + enteredBrand +'%"';
	}
	else
	{
		var brandWhereString = '';
	}
		
	var enteredCataloguelength = enteredCatalogue.length;
	//alert('Catalogue length: ' + enteredCataloguelength);

	if(enteredCataloguelength > 0)
	{
	  var CatalogueWhereString  = ' AND  CM.SysPk_CatMstr =  "' + enteredCatalogue +'"';
	}
	else
	{
		var CatalogueWhereString = '';
	}
	
	var enteredCategorylength = enteredCategory.length;
	//alert('Category length: ' + enteredCategorylength);
	if(enteredCategorylength > 0)
	{
	  var CategoryWhereString  = ' AND  IMCIMCCatgy.SysFk_CatgyMstr_InvtyCatCatgy =  "' + enteredCategory +'"';
	}
	else
	{
		var CategoryWhereString  = '';
	}
		
	
	
	
	//works//var finalqueryString = 'SELECT IMC.* , IMCCatgy.* FROM INVENTORY_MASTER_CATALOGUE AS IMC LEFT JOIN INVENTORY_MASTER_CATALOGUE_CATEGORY AS IMCCatgy ON IMC.SysPk_InvtyCat=IMCCatgy.SysFk_InvtyCat_InvtyCatCatgy  WHERE'+ barcodeWhereString + promonameWhereString + fulldescriptionWhereString + brandWhereString + CategoryWhereString +' GROUP BY IMC.SysPk_InvtyCat';
	//error//var finalqueryString = 'SELECT * FROM CATEGORY_MASTER AS CM RIGHT JOIN(SELECT IMC.* , IMCCatgy.* FROM INVENTORY_MASTER_CATALOGUE AS IMC LEFT JOIN INVENTORY_MASTER_CATALOGUE_CATEGORY AS IMCCatgy ON IMC.SysPk_InvtyCat=IMCCatgy.SysFk_InvtyCat_InvtyCatCatgy  WHERE'+ barcodeWhereString + promonameWhereString + fulldescriptionWhereString + brandWhereString + CategoryWhereString +' GROUP BY IMC.SysPk_InvtyCat)AS IMC_IMCCatgy ON IMC_IMCCatgy.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr ';
   //works//var finalqueryString = 'SELECT IMCCatgy.*,CM.* FROM CATALOGUE_MASTER AS CM  INNER JOIN(SELECT IMC.* , IMCCatgy.* FROM INVENTORY_MASTER_CATALOGUE AS IMC LEFT JOIN INVENTORY_MASTER_CATALOGUE_CATEGORY AS IMCCatgy ON IMC.SysPk_InvtyCat=IMCCatgy.SysFk_InvtyCat_InvtyCatCatgy)AS IMCCatgy ON IMCCatgy.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr';
    //works//var finalqueryString = 'SELECT IMCIMCCatgy.*,CM.* FROM CATALOGUE_MASTER AS CM  INNER JOIN(SELECT IMC.* , IMCCatgy.* FROM INVENTORY_MASTER_CATALOGUE AS IMC LEFT JOIN INVENTORY_MASTER_CATALOGUE_CATEGORY AS IMCCatgy ON IMC.SysPk_InvtyCat=IMCCatgy.SysFk_InvtyCat_InvtyCatCatgy  WHERE'+ barcodeWhereString + promonameWhereString + fulldescriptionWhereString + brandWhereString + CategoryWhereString +' GROUP BY IMC.SysPk_InvtyCat)AS IMCIMCCatgy ON IMCIMCCatgy.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr ';
    var finalqueryString = 'SELECT IMCIMCCatgy.*,CM.* FROM CATALOGUE_MASTER AS CM  INNER JOIN(SELECT IMC.* , IMCCatgy.* FROM INVENTORY_MASTER_CATALOGUE AS IMC LEFT JOIN INVENTORY_MASTER_CATALOGUE_CATEGORY AS IMCCatgy ON IMC.SysPk_InvtyCat=IMCCatgy.SysFk_InvtyCat_InvtyCatCatgy)AS IMCIMCCatgy ON IMCIMCCatgy.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr  WHERE'+ barcodeWhereString + promonameWhereString + fulldescriptionWhereString + brandWhereString + CatalogueWhereString + CategoryWhereString +' GROUP BY IMCIMCCatgy.SysPk_InvtyCat';


	
	
	finalqueryString = checkForWhereAnd(finalqueryString);
    
    if(enteredBarcodelength <= 0 && enteredPromonamelength <= 0 && enteredfulldescriptionlength <= 0 && enteredBrandlength <= 0 &&  enteredCataloguelength <= 0 && enteredCategorylength <= 0)
    {
        finalqueryString = finalqueryString.replace("WHERE", ""); 
    }

    alert(finalqueryString);
	tx.executeSql(finalqueryString, [], renderSearchResults, errorCB);

	globalorderFromSwitch = 1;
	
}




function renderSearchResults(tx,results)
{
	//alert('RENDERING SEARCH RESULTS');
    var htmlstring = "";
    var len = results.rows.length;
    
  
    for(var ind=0; ind < len; ind++)
    {
        
        htmlstring += '<div class="col-md-4 col-sm-4 col-xs-12"><img src="'+ results.rows.item(ind).PictureFileName_InvtyCat +'" class="responsiveImage"></div><div class="col-md-8 col-sm-8 col-xs-12"><h1>'+results.rows.item(ind).PromoName_InvtyCat+'</h1><h4>'+results.rows.item(ind).Brand_InvtyCat+'</h4><p>'+results.rows.item(ind).FullDescription_InvtyCat+'</p><br><small>Valid from:<br>' + results.rows.item(ind).PromoStartDate_CatMstr + ' to ' + results.rows.item(ind).PromoEndDate_CatMstr +'</small><br><a href="#" class="btn btn-success btn-large viewItem" data-itemid="'+ results.rows.item(ind).RowNumber_InvtyCat +'">View</a></div><div class="clearfix"><hr></div>';
   		

         
    }
	
        $('#itemsList').append(htmlstring);
   
}


function startSearch()
{
    
    $("#searchForm").on('submit', function()
    {   $('#itemsList').empty();
     
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
        { 
            db.transaction(queryForSearch, errorCB);
        }
        
        //var searchedValue = $(this).children('[name="search-barcode"]').val();

      //  localStorage.searchedValueStorage = searchedValue;
       // $('.lastsearched').empty().append(localStorage.searchedValueStorage);

        return false;//prevents refresh on submit
    });
        
        
            // $('.lastsearched').append(localStorage.searchedValueStorage);
}






function queryCartSettings(tx)
{
	  
    tx.executeSql('SELECT * FROM SETTINGS' , [], renderCartList, errorCB);

}



function renderCartList(tx,results)
{
	/*valid items  data that wil be passed to order all button*/
	var validSKUArr = [];
	var validpicturefilenameArr = [];
	var validbarcodeArr = [];
	var validbrandArr = [];
	var validfulldescriptionArr = [];
	var validpromonameArr = [];
	var validpromoPriceArr = [];
	var validpromoEndDateArr = [];
	var validpromoStartDateArr = [];
	var validQuantityArr = [];
	var validsubtotalArr = [];
	var validorderedFromArr = [];
	
	
    var orderAllTotal = 0;
    var SKUForArr = localStorage.sku.replace(/,\s*$/,'');
	var picturefilenameForArr = localStorage.picturefilename.replace(/,\s*$/,'');
	var BarcodeInvtyCatForArr = localStorage.BarcodeInvtyCat.replace(/,\s*$/,'');
	var BrandInvtyCatForArr = localStorage.BrandInvtyCat.replace(/,\s*$/,'');
	var fulldescriptionForArr = localStorage.fulldescription.replace(/,\s*$/,'');
	var promoPriceForArr = localStorage.promoPrice.replace(/,\s*$/,'');
	var promoEndDateForArr = localStorage.promoenddate.replace(/,\s*$/,'');
	var promoStartDateForArr = localStorage.promostartdate.replace(/,\s*$/,'');
	var promonameForArr = localStorage.promoname.replace(/,\s*$/,'');
	var quantityForArr = localStorage.quantity.replace(/,\s*$/,'');
	var subtotalForArr = localStorage.subtotal.replace(/,\s*$/,'');
	var orderedFromArr = localStorage.orderedfrom.replace(/,\s*$/,'');
	
    
	
	
    cartSKUArr = SKUForArr.split(',');
	cartpicturefilenameArr =  picturefilenameForArr.split(',');
	cartbarcodeArr =  BarcodeInvtyCatForArr.split(',');
	cartbrandArr =  BrandInvtyCatForArr.split(',');
	cartfulldescriptionArr =  fulldescriptionForArr.split(',');
	cartpromoPriceArr =  promoPriceForArr.split(',');
	cartpromoEndDateArr = promoEndDateForArr.split(',');
	cartpromoStartDateArr = promoStartDateForArr.split(',');
	cartpromonameArr =  promonameForArr.split(',');
	cartQuantityArr =  quantityForArr.split(',');
	cartsubtotalArr = subtotalForArr.split(',');
	cartorderedFromArr = orderedFromArr.split(',');
	
	
		
    
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


			if((getDateTimeNow() >= cartpromoStartDateArr[ind]) && (getDateTimeNow()<= cartpromoEndDateArr[ind]))
			{
				orderAllTotal += parseFloat(cartsubtotalArr[ind]);//only valid items are totaled
				
                
                
                htmlstringcart += '<div class="row cartItemCont"><div class="col-md-3 col-sm-3 col-xs-12"><img src="'+ cartpicturefilenameArr[ind]+'" class="responsiveImage" alt="no image available"></div><div class="col-md-9 col-sm-9 col-xs-12"><div class="row"><div class="col-md-11 col-sm-11 col-xs-11">';
				
                //commas are toNormal because this is for display
				toNormalString(cartpromonameArr[ind]);
				htmlstringcart +=  '<h2>'+ returnedNormal +'</h2>';
                
                toNormalString(cartbrandArr[ind]);
				htmlstringcart +=  '<h4>'+ returnedNormal +'</h4>';
				
				toNormalString(cartfulldescriptionArr[ind]);
				htmlstringcart +='<p>'+returnedNormal+'</p></div><div class="col-md-1 col-sm-1 col-xs-1"><a href="#" class="edit-order" data-orderid="'+ ind +'">edit</a></div></div></div><div class="col-md-12 col-sm-12 col-xs-12"><p class="pull-left">quantity: <span>'+cartQuantityArr[ind]+'</span></p><p class="pull-right">$<span>'+ cartsubtotalArr[ind] +'</span></p></div></div>' ;


				

				validSKUArr.push(cartSKUArr[ind]);
				validpicturefilenameArr.push(cartpicturefilenameArr[ind]);
				validbarcodeArr.push(cartbarcodeArr[ind]);
				validbrandArr.push(cartbrandArr[ind]);
				validfulldescriptionArr.push(cartfulldescriptionArr[ind]);
				validpromonameArr.push(cartpromonameArr[ind]);
				validpromoPriceArr.push(cartpromoPriceArr[ind]);
				validpromoEndDateArr.push(cartpromoEndDateArr[ind]);
				validpromoStartDateArr.push(cartpromoStartDateArr[ind]);
				validQuantityArr.push(cartQuantityArr[ind]);
				validsubtotalArr.push(cartsubtotalArr[ind]);
				validorderedFromArr.push(cartorderedFromArr[ind]);



			}
			else
			{
				htmlstringcart +=  '<div class="row cartItemCont invalid"><div class="col-md-3 col-sm-3 col-xs-12"><img src="'+ cartpicturefilenameArr[ind]+'" class="responsiveImage" alt="no image available"></div><div class="col-md-9 col-sm-9 col-xs-12"><div class="row"><div class="col-md-11 col-sm-11 col-xs-11">';
                
                toNormalString(cartpromonameArr[ind]);
                htmlstringcart += '<h2>'+returnedNormal+ '</h2>';
                
                toNormalString(cartbrandArr[ind]);
                htmlstringcart += '<h4>'+returnedNormal+'</h4>';
                
                htmlstringcart += '<small class="warning"> - This Item is only valid from '+ cartpromoStartDateArr[ind] + ' to ' +  cartpromoEndDateArr[ind] +'</small><br>';
                
                toNormalString(cartfulldescriptionArr[ind]);
                htmlstringcart +='<p>'+ returnedNormal +'</p></div><div class="col-md-1 col-sm-1 col-xs-1"><a href="#" class="edit-order" data-orderid="'+ ind +'">edit</a></div></div></div><div class="col-md-12 col-sm-12 col-xs-12"><p class="pull-left">quantity: <span>'+cartQuantityArr[ind]+'</span></p><p class="pull-right">$<span>'+ cartsubtotalArr[ind] +'</span></p></div></div>' ;

			}


			 
  		}//end of for loop
		
		
			/*alert(validSKUArr);
			alert(validpicturefilenameArr);
			alert(validbarcodeArr);
			alert(validfulldescriptionArr);
			alert(validpromonameArr);
			alert(validpromoPriceArr);
			alert(validpromoEndDateArr);
			alert(validpromoStartDateArr);
			alert(validQuantityArr);
			alert(validsubtotalArr);*/
        
    }

    
    localStorage.orderid = orderid;
    $('#cartListCont').empty();
    $('#cartListCont').append(htmlstringcart);
  
    
    


    //commas are not using toNormal so that string won't be interpreted as different array indexes.
    if((orderAllTotal >= results.rows.item(0).MinimumPrice_Settings))
    {

		
		$('.orderAll-cont').empty();
		//change to validArrs later
		$('.orderAll-cont').append('<a href="#" class="btn btn-success btn-large orderAll" data-sku="'+ validSKUArr.toString() +'" data-picturefilename="'+ validpicturefilenameArr.toString() +'" data-barcode="'+validbarcodeArr.toString()+'" data-brand="'+validbrandArr.toString()+'" data-fulldescription="'+ validfulldescriptionArr.toString() +'" data-promoname="' + validpromonameArr.toString() +'"  data-promoPrice="'+ validpromoPriceArr.toString()+'" data-promoEndDate="'+validpromoEndDateArr.toString()+'" data-promoStartDate="'+validpromoStartDateArr.toString()+'"  data-quantity= "'+validQuantityArr.toString() +'"  data-subtotal="'+ validsubtotalArr.toString()+'" data-orderedfrom="'+validorderedFromArr.toString()+'">Order All</a>');
   
		
	
	}
    else
    {
		$('.orderAll-cont').empty();
       $('.orderAll-cont').append('<a href="#" class="btn btn-large orderAllDisabledLook">Order All</a><br><small class="minimumPurchaseNote">-A minimum of P1000 worth of items is required to checkout.</small>');
    
		
	}
    
    
    $('body').off('click','.orderAll').on('click','.orderAll' , function()
    {
        alert($(this).attr('data-sku'));
        alert($(this).attr('data-picturefilename'));
        alert($(this).attr('data-barcode'));
        alert($(this).attr('data-brand'));
        alert($(this).attr('data-fulldescription'));
        alert($(this).attr('data-promoname'));
        alert($(this).attr('data-promoPrice'));
        alert($(this).attr('data-promoEndDate'));
        alert($(this).attr('data-promoStartDate'));
        alert($(this).attr('data-quantity'));
        alert($(this).attr('data-subtotal'));
        alert('ordered from: ' + $(this).attr('data-orderedfrom'));

        alert('TOTAL:' + orderAllTotal);
        
        
    });
	
}








function getjsonForINVENTORY_MASTER_CATALOGUE()
{



		$.getJSON( "http://viveg.net/glogapitest/", function( data )
		{

			  $.each( data, function( index, value ) 
			  {

					$.each(value, function(inde, valu)
					{
						$.each(valu, function(ind, val)
						{
							$.each( val, function( i, v )
							{

									if(i == "RowNumber_InvtyCat")
									{
										RowNumber_InvtyCatARR.push(val['RowNumber_InvtyCat']);
										$('.getjsontest').append(val['RowNumber_InvtyCat'] + " inserted to array RowNumber_InvtyCatARR<br>");
									}
									else if(i == "SysPk_InvtyCat")
									{
										SysPk_InvtyCatARR.push(val['SysPk_InvtyCat']);
										$('.getjsontest').append(val['SysPk_InvtyCat'] + " inserted to array SysPk_InvtyCatARR<br>");
									}
									else if(i == "SysFk_CatMstr_InvtyCat")
									{
										SysFk_CatMstr_InvtyCatARR.push(val['SysFk_CatMstr_InvtyCat']);
										$('.getjsontest').append(val['SysFk_CatMstr_InvtyCat'] + " inserted to array SysFk_CatMstr_InvtyCatARR<br>");
									}
									else if(i == "SKU_InvtyCat")
									{
										SKU_InvtyCatARR.push(val['SKU_InvtyCat']);
										$('.getjsontest').append(val['SKU_InvtyCat'] + " inserted to array SKU_InvtyCatARR<br>");
									}
									else if(i == "PictureFileName_InvtyCat")
									{
										PictureFileName_InvtyCatARR.push(val['PictureFileName_InvtyCat']);
										$('.getjsontest').append(val['PictureFileName_InvtyCat'] + " inserted to array PictureFileName_InvtyCatARR<br>");
									}
									else if(i == "Barcode_InvtyCat")
									{
										Barcode_InvtyCatARR.push(val['Barcode_InvtyCat']);
										$('.getjsontest').append(val['Barcode_InvtyCat'] + " inserted to array Barcode_InvtyCatARR<br>");
								
									}
									else if(i == "Brand_InvtyCat")
									{
										Brand_InvtyCatARR.push(val['Brand_InvtyCat']);
										$('.getjsontest').append(val['Brand_InvtyCat'] + " inserted to array Brand_InvtyCatARR<br>");
								
									}
									else if(i == "FullDescription_InvtyCat")
									{
										FullDescription_InvtyCatARR.push(val['FullDescription_InvtyCat']);
										$('.getjsontest').append(val['FullDescription_InvtyCat'] + " inserted to array FullDescription_InvtyCatARR<br>");
								
									}
									else if(i == "PromoName_InvtyCat")
									{
										PromoName_InvtyCatARR.push(val['PromoName_InvtyCat']);
										$('.getjsontest').append(val['PromoName_InvtyCat'] + " inserted to array PromoName_InvtyCatARR<br>");
								
									}
									else if(i == "PromoPrice_InvtyCat")
									{
										PromoPrice_InvtyCatARR.push(val['PromoPrice_InvtyCat']);
										$('.getjsontest').append(val['PromoPrice_InvtyCat'] + " inserted to array PromoPrice_InvtyCatARR<br>");
								
									}
								


							});	

						});	

					});
			  });

				InventoryMasterCataloguedataLength =  SysPk_InvtyCatARR.length;
				$('.getjsontest').append("<br><br><b>there are " + SysPk_InvtyCatARR.length + " promos <b>");

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
    
  tx.executeSql('SELECT IMC.*,CM.* FROM INVENTORY_MASTER_CATALOGUE AS IMC INNER JOIN CATALOGUE_MASTER AS CM ON IMC.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr  WHERE IMC.RowNumber_InvtyCat=' + idForSinglePage , [], renderSinglePage, errorCB);  

	if(globalorderFromSwitch == 1)
	{
		globalorderedFrom = 'search';
	}
	else
	{
		globalorderedFrom = 'catalogue';
	}
	
	globalorderFromSwitch = 0;//set back to zero for next time.
	
}

function renderSinglePage(tx,results)
{
    
    var doesThisExist = results.rows.length;
    
    
    
    if(doesThisExist > 0)
    {
        $('.content-cont').load('single-item.html',null,function(){
        
         $('.singleitemPictureFileName').attr('src',results.rows.item(0).PictureFileName_InvtyCat);
         $('.singleitempromoname').append(results.rows.item(0).PromoName_InvtyCat);
         $('.singleitembrand').append(results.rows.item(0).Brand_InvtyCat);
         $('.singleitemfulldescription').append(results.rows.item(0).FullDescription_InvtyCat);
         $('.singleitempromoprice').append(results.rows.item(0).PromoPrice_InvtyCat);
         $('.singleitemsubtotal').append(results.rows.item(0).PromoPrice_InvtyCat);//temporary. value will change on quantity input
			
		//STOPPED HERE
			//alert('date now: ' + getDateTimeNow());
			//alert('end date: ' + results.rows.item(0).PromoEndDate_CatMstr);
			//alert('start date: ' + results.rows.item(0).PromoStartDate_CatMstr);
			
		if((getDateTimeNow() >= results.rows.item(0).PromoStartDate_CatMstr)&&(getDateTimeNow() <= results.rows.item(0).PromoEndDate_CatMstr))
		{
			$('.InvalidNote').hide();
			
		}
		else
		{
			$('.InvalidNote').append('-This item is only valid from ' + results.rows.item(0).PromoStartDate_CatMstr + ' to ' + results.rows.item(0).PromoEndDate_CatMstr +'.<br>');

		}
			
			
			//alert('RESULT ROW PROMO NAME: ' + results.rows.item(0).PromoName_InvtyCat);
			//alert('RESULT ROW FULL DESCRIPTION: ' + results.rows.item(0).FullDescription_InvtyCat);
			
			var placeorderbtnstring =  '<a href="#" class="btn btn-success btn-large placeOrder" data-sku="'+ results.rows.item(0).SKU_InvtyCat +'" data-promoPrice="'+ results.rows.item(0).PromoPrice_InvtyCat +'" data-promoEndDate="'+ results.rows.item(0).PromoEndDate_CatMstr +'" data-promoStartDate="'+ results.rows.item(0).PromoStartDate_CatMstr +'" ';
				
			toCustomString(results.rows.item(0).PromoName_InvtyCat);
			placeorderbtnstring	+=' data-promoname="'+ returnedCustom +'" ';
				
			toCustomString(results.rows.item(0).FullDescription_InvtyCat);
			placeorderbtnstring += ' data-picturefilename="'+ results.rows.item(0).PictureFileName_InvtyCat +'" data-fulldescription="'+ returnedCustom +'" data-BarcodeInvtyCat="'+results.rows.item(0).Barcode_InvtyCat+'" data-BrandInvtyCat="'+results.rows.item(0).Brand_InvtyCat+'" data-quantity="1" data-subtotal="'+ results.rows.item(0).PromoPrice_InvtyCat +'" data-orderedfrom="'+ globalorderedFrom +'">Place Order</a>';
			
			
			//alert(placeorderbtnstring);
			$( '.singleitemtable' ).after(placeorderbtnstring);
		
        });
       
        
        /*PROBABLY NEED TO MOVE TESE TO HTML IN THE FUTURE AND load each data per element
            var htmlstringSingle ='';
            htmlstringSingle += '<div class="row single-cont"><div class="col-md-6 col-sm-12 col-xs-12"><div class="img-container">';   
            htmlstringSingle += '<img src="'+ results.rows.item(0).PictureFileName_InvtyCat +'" class="responsiveImage">';
            htmlstringSingle += '</div></div>';
            htmlstringSingle += '<div class="col-md-6 col-sm-12 col-xs-12"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringSingle += '<h1>'+ results.rows.item(0).PromoName_InvtyCat +'</h1>';
            htmlstringSingle += '<p>'+ results.rows.item(0).FullDescription_InvtyCat +'</p>';
            htmlstringSingle += '<h3 class="pull-right">$<span class="glogprice">'+ results.rows.item(0).PromoPrice_InvtyCat +'</span></h3>';
            htmlstringSingle += '</div> </div>';
            htmlstringSingle += '<div class="row"><div class="col-md-12 col-sm-12 col-xs-12">';
            htmlstringSingle += '<table class="totalcounter"><tr><td>';
            htmlstringSingle += '<label for="quantity">Quantity</label>';
            htmlstringSingle += '</td><td class="pull-right">';
            htmlstringSingle += '<input type="text" name="glogquantity" id="glogquantity" value="1">';
            htmlstringSingle += '</td></tr><tr><td>';
            htmlstringSingle += '<label for="quantity">Subtotal</label>';
            htmlstringSingle += '</td><td class="pull-right">';
            htmlstringSingle += '<div><p><span>$</span><span class="glogtotal">'+ results.rows.item(0).PromoPrice_InvtyCat +'</span></p></div>';
            htmlstringSingle += '</td></tr></table>';
            htmlstringSingle += '<a href="#" class="btn btn-success btn-large placeOrder" data-promoPrice="'+ results.rows.item(0).PromoPrice_InvtyCat +'" data-promoname="'+ results.rows.item(0).PromoName_InvtyCat +'" data-picturefilename="'+ results.rows.item(0).PictureFileName_InvtyCat +'" data-fulldescription="'+ results.rows.item(0).FullDescription_InvtyCat +'" data-BarcodeInvtyCat="'+results.rows.item(0).Barcode_InvtyCat+'" data-quantity="1" data-subtotal="'+ results.rows.item(0).PromoPrice_InvtyCat +'">Place Order</a>';
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
  tx.executeSql('SELECT IMC.*, CM.* FROM INVENTORY_MASTER_CATALOGUE AS IMC INNER JOIN CATALOGUE_MASTER AS CM  ON IMC.SysFk_CatMstr_InvtyCat = CM.SysPk_CatMstr WHERE IMC.Barcode_InvtyCat="' + scanResult +'"', [], renderSinglePage, errorCB); 
  //alert('queryItemDetailsByBarcode done');
	globalorderedFrom = 'scan';
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
    var SKU = $(this).attr('data-sku');
    var picturefilename = $(this).attr('data-picturefilename');
	var BarcodeInvtyCat = $(this).attr('data-BarcodeInvtyCat');
	var BrandInvtyCat = $(this).attr('data-BrandInvtyCat');
	var fulldescription = $(this).attr('data-fulldescription');
    var promoname = $(this).attr('data-promoname');
    var promoPrice = $(this).attr('data-promoPrice'); 
	var promoEndDate = $(this).attr('data-promoEndDate'); 
	var promoStartDate = $(this).attr('data-promoStartDate'); 
    var quantity = $(this).attr('data-quantity');
    var subtotal = $(this).attr('data-subtotal');
    var orderedFrom = $(this).attr('data-orderedfrom');
	
    //this prevents commas from promonames from being interpreted as , when localstorage string is turned into an array
		//SKU = toCustomString(SKU.toString());
		// picturefilename = toCustomString(picturefilename.toString());
		// BarcodeInvtyCat = toCustomString(BarcodeInvtyCat.toString());
		//fulldescription = toCustomString(fulldescription);
		//promoname = toCustomString(promoname);
		//promoPrice = toCustomString(promoPrice.toString());
		//promoEndDate = toCustomString(promoEndDate.toString());
		//promoStartDate = toCustomString(promoStartDate.toString());
		// quantity = toCustomString(quantity.toString());
		// subtotal = toCustomString(subtotal.toString());
		//orderedFrom = toCustomString(orderedFrom.toString());


	
	
	localStorage.sku += SKU.toString()+',';

	localStorage.picturefilename += picturefilename.toString()+',';
	
	localStorage.BarcodeInvtyCat += BarcodeInvtyCat.toString()+',';
    
    toCustomString(BrandInvtyCat);
	localStorage.BrandInvtyCat += returnedCustom+',';

	
	toCustomString(fulldescription);
    localStorage.fulldescription += returnedCustom+',';
	
	toCustomString(promoname);
	localStorage.promoname += returnedCustom +',';
	
    localStorage.promoPrice += promoPrice+',';
	localStorage.promoenddate += promoEndDate.toString()+',';
	localStorage.promostartdate += promoStartDate.toString()+',';
    localStorage.quantity += quantity.toString()+',';
    localStorage.subtotal += subtotal.toString()+',';
	localStorage.orderedfrom += orderedFrom.toString()+',';
    
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
        var editorderpromoprice = $('.edit-order-promoPrice').html(); 
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
          
            var glogtotaltemp = qval *  editorderpromoprice;   
            var glogtotal = glogtotaltemp.toFixed(2);
          
            $('.edit-order-subtotal').empty();
            $('.edit-order-subtotal').append(glogtotal);

    });
}
/*-------------------------------//editorder.html----------------------------*/

function toNormalString(stringWithCustomString)
{

	
	if((stringWithCustomString.indexOf('(xxxGLogCommaxxx)') != -1) || (stringWithCustomString.indexOf('(xxxGLogDQxxx)') != -1))
	{
		stringWithCustomString = stringWithCustomString.replace('(xxxGLogCommaxxx)',',');
		stringWithCustomString = stringWithCustomString.replace('(xxxGLogDQxxx)','"');//double quote
 		
		
		
		toNormalString(stringWithCustomString)
	}
	else
	{
		
		returnedNormal = stringWithCustomString;
		
    	
	}
}

function toCustomString(stringWithNormalString)
{
	

	
	if((stringWithNormalString.indexOf(',') != -1) || (stringWithNormalString.indexOf('"') != -1))
	{
		stringWithNormalString = stringWithNormalString.replace(',','(xxxGLogCommaxxx)');
		stringWithNormalString = stringWithNormalString.replace('"','(xxxGLogDQxxx)');//Double Quote

		
		toCustomString(stringWithNormalString)
	}
    else
	{
		returnedCustom = stringWithNormalString;
	 	

	}
}


function getDateTimeNow()
{
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	var output = d.getFullYear() + '-' +
		(month<10 ? '0' : '') + month + '-' +
		(day<10 ? '0' : '') + day + ' ' +
		(hours<10 ? '0' : '')+hours +':'+(minutes<10 ? '0' : '')+minutes+':'+(seconds<10 ? '0' : '')+seconds;

	return output;
}

function checkForWhereAnd(str)//replace all WHERE AND with WHERE
{	
	//alert('Initial String: ' + str);
	//alert('Index: ' + str.indexOf("WHERE AND"));
	if(str.indexOf("WHERE AND") != -1)
	{
		str = str.replace("WHERE AND", "WHERE"); 
		//alert('New String: ' + str);
		checkForWhereAnd(str);
	}

	
	return str;
}

function replaceQuotes(str)
{
	alert('before replace: '+str);
	if(str.indexOf('"') != -1)
	{
		str=str.replace('"','%');
		alert('after replace: ' + str);
		replaceQuotes(str);
	}
	else
	{
		returnedReplaceQuote = str;alert('return: ' +str);
	
	}
}

/*removed addslashes for single quote because it's not needed*/
function addslashes(str)
{
	//str=str.replace(/\\/g,'\\\\');
	//str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	//str=str.replace(/\0/g,'\\0');
	return str;
}
function stripslashes(str)
{
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}