// js / jquery / device_temp.js

(function($){

$.ajax({
  url: '../data/device_type.json',
  context: document.body
}).done(function(data){
  //$.ajax로 불러오는 모든 내용은 매개변수로 불러오게 된다.
  // console.log(data);
  //비동기식으로 처리되어서 시간이 걸린다.
  var importDevice = data;

// setTimeout(function(){
//   console.log(importDevide);
// },1000);

 
// jQuery
//1. 브라우저의 크기값을 파악
//2. 접속 브라우저 환경
//3. 각 디바이스 환경을 외부의 파일로 내보내서 처리 
var beforeWidth;
var win = $(window)

//2
var browerSetFn = function(){
  // var brower = ['chrome','safari','opr','firefox'];
  var browser = [
    {type:'Opara', check:'opr'},
    {type:'Edge', check:'edg'},
    {type:'Chrome', check:'chrome'},
    {type:'Safari', check:'safari'},
    {type:'Fire fox', check:'firefox'},
  ];

  var checkDevice = navigator.userAgent.toLowerCase;
  var n=0;
  var ckIndex;
  var useRwd = false;
  //ie 브라우저 체크(ms엔진이 있을 경우 ie브라우저):navigator.usetAgent.search('Trident')
  if(navigator.userAgent.search('Trident') !== -1){
    // 반응형 웹이 불가능한 브러우져
    useRwd = false;
    console.log('사용브라우저 : ', 'ie');
  }else{
    //ie 외에 다른 브라우저 기반체크 (위 변수 browser 변수의 순서를 잘 작성해야 
    // 해당 브라우져를 파악이 가능)
    for(;n < brower.length;n++){
      ckIndex = checkDevice.indexOf(browser[n].check);
      // var ckIndex = checkDevice.indexOf(brower[n]);
      if(ckIndex !== -1){
        console.log('사용브라우저:', browser[n].type);
        useRwd = true;
        break;
      }
    } // for
  } // if:IE 체크


  // console.log(useRwd);
  return useRwd;
}// browerSerFn
var rwdCheck = browerSetFn();
//가능형 웹 불가능할 경우
if(!rwdCheck){
  console.log('접속 브라우저가 반응형구현 또는 flex구조가 아니여서 사용불가');
  $('.device').hide();
  $('.old').show();
}else{
// ie가 아닌 반응형가능한 브라우저
// 범위는 하위 전부~~~resize까지

 // 1. 브라우저의 크기값 파악(실시간으로 사이즈 체크)
// 101. 브라우저의 가로값의 변경만 파악하여 처리
// 102. 모든 가로값을 파악해서 그때마다 수정 X, 지정된 디바이스 환경을 고려하여 환경자체가 변경되면 처리 -> 새로고침

var deviceWidth = function(){
  // [768, 1280, 1600] 기준으로 변경한다 ;
  //외부에서 불러와서 deviceType에 저장한다
  var deviceType = importDevice; 
  // var deviceType = [
  //   {type :'smartphone' , size: 767 },  
  //   {type :'tablet', size : 1279 },
  //   {type :'laptop', size : 1599 },
  //   {type :'desktop'}
  //   ];

var checkType;
var winWidth = win.outerWidth(true);
//1.
// if(winWidth >= deviceType[3].size){
//   checkType = deviceType[3].type;
// }else if(widWidth >= deviceType[2].size){
//   checkType = deviceType[2].type;
// }else if(widWidth >= deviceType[1].size){
//   checkType = devideType[1].type;
// }else {
//   checkType = deviceType[0].type;
// }
//2.
var intSize;
var i = deviceType.length-1;
for(; i >= 0 ; i-=1){
  intSize = parseInt(deviceType[i].size);
  if(winWidth >= intSize ){
    checkType = deviceType[i].type;
    //break를 사용하지 않는다면 for문 10000번 반복했을 경우
    // 조건이 100번쨰에 맞으면 100번까지만 하고 반복수행 끝내라 해야하지만 
    // break를 사용하지 않는다면 10000번 모두 반복수행하게됌 
    break;
  }else{ 
    checkType = deviceType[i].type;
  }
}
return checkType;
// var ck = ['small','big'];
//   if(winWidth < deviceType){
//     return ck[0];
//   }else{
//     return ck[1];
//   }
//   // return winWidth;
}; 

var beforeWidth = deviceWidth();
console.log('before:', beforeWidth);
$('.device').hide();
$('.' +beforWidth).show();

win.on('resize',function(){
  var afterWidth = deviceWidth();
  console.log('after:',afterWidth);

  if(beforeWidth !== afterWidth){
    // 디바이스 환경이 변경되면(같지 않으면) 새로고침
    location.reload(); 
  }
});

}
}); // $.ajax()
})(jQuery);