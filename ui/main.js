console.log('Loaded!');


/*var element = document.getElementById('main-text');
element.innerHTML = 'New value Has been entered';*/


var globalObj = {};

function getFormData() {
            var elements = document.getElementById("productForm").elements;
            var obj = {};
            for(var i = 0 ; i < elements.length ; i++)
            {
                var item = elements.item(i);
                obj[item.name] = item.value;
            }
    
            globalObj = obj;
               // alert(JSON.stringify(obj));
            }
//move the image madi

/*var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight()
{
   marginLeft = marginLeft + 1;
  // img.style.marginLeft = marginLeft + 'px';
   img.style.marginRight = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight,50);
    //img.style.marginLeft = '100px';
};*/
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
