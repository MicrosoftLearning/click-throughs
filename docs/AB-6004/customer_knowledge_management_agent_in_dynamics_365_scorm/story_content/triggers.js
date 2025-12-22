function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6Q0MNBWuMI1":
        Script1();
        break;
      case "6jV0wJIfDe7":
        Script2();
        break;
      case "65uqGQmtc53":
        Script3();
        break;
      case "6QDBD4v6kfL":
        Script4();
        break;
      case "5qfpJIRWEYA":
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
const target = object('6gr8XJRgvsr');
const duration = 10000;
const easing = 'ease-out';
const id = '6ayc6Mq3qBT';
const delay = 0;
addToTimeline(
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  player.once(() => {
const target = object('6P79BP1HNsV');
const duration = 10000;
const easing = 'ease-out';
const id = '6iGwe01ZeSY';
const delay = 0;
addToTimeline(
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script3 = function()
{
  player.once(() => {
const target = object('5vbUIhyV010');
const duration = 10000;
const easing = 'ease-out';
const id = '6iGwe01ZeSY';
const delay = 0;
addToTimeline(
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script4 = function()
{
  player.once(() => {
const target = object('66Qtx9BIh9n');
const duration = 10000;
const easing = 'ease-out';
const id = '6iGwe01ZeSY';
const delay = 0;
addToTimeline(
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script5 = function()
{
  player.once(() => {
const target = object('63y2XzsHble');
const duration = 10000;
const easing = 'ease-out';
const id = '6iGwe01ZeSY';
const delay = 0;
addToTimeline(
target.animate(
[ {opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 }, 
{opacity: 0 }, 
{opacity: 1 } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

};
