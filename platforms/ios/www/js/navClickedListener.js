$(document).on('navClicked',function(event,filename)
{

      
      
      
      if(filename == "test-localstorage.html")
      {
        
        //var LS1 = "testing1";  
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
   
});
