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
    else if(filename == "test-getjson.html")
    {
            $.getJSON( "http://localhost/dummyPrestashop/", function( data )
            {/*
                {"PEOPLE":[{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}},{"PERSON":{"id":"2","name":"ong","city":"iligan","street":"kjkjljkj","homenum":"9809009","mobilenum":"9090909"}},{"PERSON":{"id":"3","name":"eu","city":"kjkjkj","street":"kjkjkjk","homenum":"909090","mobilenum":"8989"}},{"PERSON":{"id":"4","name":"james","city":"kjkjjk","street":"jkjk","homenum":"3333333","mobilenum":"444444444"}},{"PERSON":{"id":"5","name":"jerome","city":"kjkjkj","street":"kjkjkjk","homenum":"90090","mobilenum":"909090"}},{"PERSON":{"id":"6","name":"keyki","city":"jjkj","street":"kjkjk","homenum":"2147483647","mobilenum":"2147483647"}},{"PERSON":{"id":"7","name":"p-seven","city":"jhjhjhj","street":"hjh","homenum":"909090","mobilenum":"9090"}},{"PERSON":{"id":"8","name":"p-eight","city":"kjkjkjk","street":"jkjkj","homenum":"9090909","mobilenum":"90909"}}]}
            */

                    var items = [];

                  $.each( data, function( index, value ) 
                  {//key PEOPLE/[{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}},{"PERSON":{"id":"2","name":"ong","city":"iligan","street":"kjkjljkj","homenum":"9809009","mobilenum":"9090909"}},{"PERSON":{"id":"3","name":"eu","city":"kjkjkj","street":"kjkjkjk","homenum":"909090","mobilenum":"8989"}},{"PERSON":{"id":"4","name":"james","city":"kjkjjk","street":"jkjk","homenum":"3333333","mobilenum":"444444444"}},{"PERSON":{"id":"5","name":"jerome","city":"kjkjkj","street":"kjkjkjk","homenum":"90090","mobilenum":"909090"}},{"PERSON":{"id":"6","name":"keyki","city":"jjkj","street":"kjkjk","homenum":"2147483647","mobilenum":"2147483647"}},{"PERSON":{"id":"7","name":"p-seven","city":"jhjhjhj","street":"hjh","homenum":"909090","mobilenum":"9090"}},{"PERSON":{"id":"8","name":"p-eight","city":"kjkjkjk","street":"jkjkj","homenum":"9090909","mobilenum":"90909"}}]

                            /*var obj = JSON.stringify(value);
                            alert(obj);*/

                        $.each(value, function(inde, valu)
                        {
                            //{"PERSON":{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}}
                            $.each(valu, function(ind, val)
                            {//{"id":"1","name":"johanna","city":"iligan","street":"sadasdasd","homenum":"8998908","mobilenum":"989089080"}

                                var ids = [];
                                ids.push(val['SysPk_InvtyCat'][0]);




                                $.each( val, function( i, v )
                                {

                                       $('.getjsontest').append(i+'_'+ val['SysPk_InvtyCat'][0]+'<br>');

                                        

                                });	

                            });	
                        });
                  });


            }); 
    }
   
});
