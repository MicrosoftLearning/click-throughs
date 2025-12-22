function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6C7PYyN5Va7":
        Script1();
        break;
      case "5q1q0nFtJRm":
        Script2();
        break;
      case "67mMfyJSETW":
        Script3();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  player.once(() => {
const target = object('5hx0Zdd0lUv');
const duration = 10000;
const easing = 'ease-out';
const id = '67JKC2I4Vvn';
const pulseAmount = 0.07;
const delay = 8417;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  player.once(() => {
const target = object('5qt8ee0CnBL');
const duration = 10000;
const easing = 'ease-out';
const id = '6JeZUHxOtgP';
const pulseAmount = 0.07;
const delay = 8417;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script3 = function()
{
  player.once(() => {
const target = object('5Z6Uwy2d1jE');
const duration = 10000;
const easing = 'ease-out';
const id = '5gJU8RwuXyX';
const pulseAmount = 0.07;
const delay = 8417;
addToTimeline(
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

};
