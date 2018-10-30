/*
 * author Mercury root
 * all rights reserved
 */

let max_digits = 12;
let val_1;
let val_2;
let operation;
let op_pressed = false;
let to_clear = false;
let tmp;
let board = document.getElementById("board");
let watch = document.getElementById("watch");

let pi_btn = document.getElementById("pi");
let expo_btn = document.getElementById("expo");
let dot_btn = document.getElementById("dot");
let last_results = new Array();

let nums = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operation");

let clear_btn= document.getElementById("clear-btn");
let del_btn = document.getElementById("del-btn");
let equal_btn = document.getElementById("equal");
let btn_sign = document.getElementById("btn-sign");
let save_in_memory= document.getElementById("memory-save");
let get_in_memory = document.getElementById("memory-value");

let sqrt_function = document.getElementById("sqrt");
let sin_function = document.getElementById("sin");
let cos_function = document.getElementById("cos");
let tan_function = document.getElementById("tan");
let ln_function = document.getElementById("ln");

let result_tag = document.getElementById("last-results");

// use to retrieve last rsults in the database and insert them in the last_results variable
function init_last_results(){
  if(typeof(Storage)!="undefined"){
    if(localStorage.getItem("last_results")!=null){
      last_results = localStorage.getItem("last_results").split("|");
      result_tag.innerHTML = "";
      for(rs in last_results){
        let tag = document.createElement('div');
        tag.innerHTML = last_results[rs];
        tag.className="border-bottom pt-1 pb-2";
        result_tag.appendChild(tag);
      }
    }
    else{
      localStorage.setItem("last_results", last_results);

    }
  }
  else{
    result_tag.innerHTML = "votre navigateur n'inntègre pas de stockage interne";
  }
}

function update_watch(){
   let now = new Date();
   let hours = now.getHours();
   let mins = now.getMinutes();
   let seconds = now.getSeconds();

   if(hours<10){
     hours = "0"+hours;
   }
   if(mins<10){
     mins = "0"+mins;
   }
   if(seconds<10){
     seconds = "0"+seconds;
   }

    watch.innerHTML = hours+":"+mins+":"+seconds;

}

init_last_results();
setInterval(update_watch, 1000);

function insert_last_result(val_1, val_2, op, result){
  let tmp_1 = ""+val_1+op+val_2+"="+result;
  last_results.unshift(tmp_1);
  localStorage.setItem("last_results", last_results.join("|"));

  if(last_results.length > 10){
    let rest = last_results.length - 10;

    for( var i=0; i<rest; i++){
      delete last_results.pop();
    }
    localStorage.setItem("last_results", last_results.join("|"));
  }
  init_last_results();

}

for(var i=0; i<nums.length; i++){
  nums[i].addEventListener('click', function(){
        tmp = this.getAttribute('data-value');
        let tmp_2 = board.innerHTML;

       if(tmp_2.length < max_digits || parseInt(tmp_2)==0){
         if(tmp_2.charAt(tmp_2.length-1)=="."){
           printMessage(tmp_2+tmp);
         }
         else if(parseFloat(tmp_2)==0){
           printMessage(tmp);
         }
         else {
           if(op_pressed == true){
             printMessage(tmp);
             op_pressed = false;
           }
           else {
             printMessage(tmp_2 + tmp);
           }

         }
       }
       else if(op_pressed == true){
         printMessage(tmp);
         op_pressed = false;
       }
      }, false);
}

for(let i=0; i<operators.length; i++){
  let operator = operators[i];
  operator.addEventListener('click', function(){
    operation = this.getAttribute("data-sign");
    op_pressed = true;
    val_1 = parseFloat(board.innerHTML);
   }, false);
}

//use to clear the history of computed values
document.getElementById("clear-history").addEventListener("click", function(){
  if(typeof(Storage)!="undefined"){
    localStorage.setItem("last_results", '');
    init_last_results();
  }
 }, false);

// use to clear clear the board and init new operation
clear_btn.addEventListener('click', function(){
       board.innerHTML = "0";
       op_pressed = false;
       to_clear = false;
       val_1 = 0;
       val_2 = 0;

    }, false);

// use to delete the last number printed on the board
del_btn.addEventListener('click', function(){
      tmp = board.innerHTML;
      if(parseFloat(tmp)!=0){
        tmp = board.innerHTML;
        if(tmp.length>1){
          printMessage(tmp.substring(0, tmp.length-1));
        }
        else {
          printMessage(0);
        }
      }
    }, false);

equal_btn.addEventListener('click', function(){
      val_2 = parseFloat(board.innerHTML);
      let opera;
      if(operation=="plus"){
        tmp = val_1+val_2;
        printMessage(tmp);
        insert_last_result(val_1, val_2, "+", tmp );

      }
      else if(operation=="minus"){
        tmp = val_1-val_2;
        printMessage(tmp);
        insert_last_result(val_1, val_2, "-", tmp );

      }
      else if(operation == "divide"){
        if(val_2==0){
          board.innerHTML = "error";
        }
        else {
          tmp = val_1/val_2;
          printMessage(tmp);
          insert_last_result(val_1, val_2, "/", tmp );

        }
      }
      else if(operation =="time"){
        tmp = val_1*val_2;
        printMessage(tmp);
        insert_last_result(val_1, val_2, "*", tmp );

      }
      else if(operation =="power"){
        tmp = Math.pow(val_1, val_2);
        printMessage(tmp);
        insert_last_result(val_1, val_2, "^", tmp);
      }

      val_1= 0;
      val_2 = 0;
    }, false);

btn_sign.addEventListener('click', function(){
       tmp = board.innerHTML.charAt(0);

       if(tmp=="-"){
         tmp = board.innerHTML.substring(1, board.innerHTML.length);
         printMessage(tmp);
       }
       else{
         printMessage("-"+board.innerHTML);
       }
    }, false);

pi_btn.addEventListener('click', function(){
       printMessage(Math.PI);
    }, false);

expo_btn.addEventListener('click', function(){
       tmp = parseFloat(board.innerHTML);
       tmp = Math.pow(Math.E, tmp);
       printMessage(tmp);
    }, false);

dot_btn.addEventListener('click', function(){
      tmp = board.innerHTML;
      if(tmp.indexOf('.')<0){
        tmp = tmp + '.';
        printMessage(tmp);
      }

    }, false);

// save the value in the memory of the user
save_in_memory.addEventListener('click', function(){
      if(typeof(Storage)!="undefined"){
        localStorage.setItem("memory_value", parseFloat(board.innerHTML));
      }
      else{
        alert("nous ne pouvons pas stocker des données dans votre naviguateur");
      }
    }, false);

// get the value stored in the memory
get_in_memory.addEventListener('click', function(){
      if(typeof(Storage)!="undefined"){
        if(localStorage.getItem("memory_value")!=null){
          tmp = localStorage.getItem("memory_value");
          printMessage(tmp);
        }
      }
    }, false);

// get the cosinus of the value on the board
cos_function.addEventListener('click', function(){
       tmp = Math.cos(parseFloat(board.innerHTML));
       printMessage(tmp);
    }, false);

// get the sinus of the value on the board
sin_function.addEventListener('click', function(){
      tmp = Math.sin(parseFloat(board.innerHTML));
      printMessage(tmp);
    }, false);

// get the tangent of the value on the board
tan_function.addEventListener('click', function(){
      tmp = Math.tan(parseFloat(board.innerHTML));
      printMessage(tmp);
    }, false);

ln_function.addEventListener('click', function(){
      tmp = parseFloat(board.innerHTML);

      if(tmp > 0 ){
        tmp = Math.log(parseFloat(board.innerHTML));
        printMessage(tmp);
      }
      else if(tmp < 0){
        alert("on ne fait pas le logarithme d'un nombre négatif");
      }
      else {
        alert("on ne peut pas calculer le logarithme du nombre 0");
      }

   }, false);

sqrt_function.addEventListener('click', function(){
    tmp = parseFloat(board.innerHTML);

     if(tmp<0){
       board.innerHTML = "impossible";
       //printMessage("impossible");
     }
     else {
       printMessage(Math.sqrt(tmp));
     }
   }, false);

// print the square of the given value on the board
document.getElementById("x-square").addEventListener("click", function(){
     tmp = board.innerHTML;
     tmp = parseInt(tmp);
     printMessage(Math.pow(tmp,2));
   }, false);

 function printMessage(message){
   tmp = message.toString();
   let first = tmp.charAt(0);
   let e_pos = tmp.indexOf("e");
   let expo = 0;

   if(e_pos!=-1){
     expo = tmp.substring(e_pos, tmp.length);
     if(first="-"){
       if(tmp.length>max_digits){
         board.innerHTML = tmp.substring(0, max_digits-expo.length-1)+expo;
       }
       else{
         board.innerHTML = tmp.substring(0, max_digits-expo.length-1)+expo;
       }
     }
   }
   else {
     if(first=="-"){
       if(tmp.length>max_digits){
         board.innerHTML = tmp.substring(0, max_digits);
       }
       else{
         board.innerHTML = tmp.substring(0, max_digits);
       }
     }
     else {
       board.innerHTML =  tmp.substring(0, max_digits);
     }
   }

 }



//alert("the number of number is "+nums.length);
