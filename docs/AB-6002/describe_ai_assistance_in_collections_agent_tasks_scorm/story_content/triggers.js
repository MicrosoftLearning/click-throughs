function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6oRAqR3ZDJ0":
        Script1();
        break;
      case "5hi6X6kd9O1":
        Script2();
        break;
      case "6csxYi2gqVv":
        Script3();
        break;
      case "6GGR5GwgmvV":
        Script4();
        break;
      case "6m1LSCrCwqt":
        Script5();
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
const target = object('5iyKXZ2S7OH');
const duration = 750;
const easing = 'ease-out';
const id = '5wet4pjoxK2';
const pulseAmount = 0.07;
const delay = 2000;
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
const target = object('5blCza842wu');
const duration = 1000;
const easing = 'ease-out';
const id = '6j9nFd5vfGO';
const pulseAmount = 0.07;
const delay = 8750;
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
const target = object('5rOpLtm3MnX');
const duration = 1000;
const easing = 'ease-out';
const id = '6hhRezWtCiW';
const pulseAmount = 0.07;
const delay = 8750;
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

window.Script4 = function()
{
  player.once(() => {
const target = object('6ZfDY9HpkFb');
const duration = 1000;
const easing = 'ease-out';
const id = '5tIriidG9bN';
const pulseAmount = 0.07;
const delay = 8750;
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

window.Script5 = function()
{
  player.once(() => {
const target = object('6lnQKxBBNL0');
const duration = 1000;
const easing = 'ease-out';
const id = '6PfT7hip3oD';
const pulseAmount = 0.07;
const delay = 8750;
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
