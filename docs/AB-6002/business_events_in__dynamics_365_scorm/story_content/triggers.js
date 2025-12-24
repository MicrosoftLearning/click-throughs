function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6WwNjX8pEVQ":
        Script1();
        break;
      case "5u8tlZ3xcYq":
        Script2();
        break;
      case "6S9bURyjBmU":
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
const target = object('6o613dopKeH');
const duration = 10000;
const easing = 'ease-out';
const id = '6IYhTAeBIKx';
const delay = 44000;
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
const target = object('6QPGvil1LnM');
const duration = 10000;
const easing = 'ease-out';
const id = '5bdrpg3182f';
const delay = 29021;
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
const target = object('6qT6FQPekOx');
const duration = 5500;
const easing = 'ease-out';
const id = '6MBq64ghM8W';
const delay = 15729;
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
