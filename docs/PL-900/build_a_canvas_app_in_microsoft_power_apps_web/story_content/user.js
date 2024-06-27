function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6HX8IbKRd4a":
        Script1();
        break;
      case "5yjmt70byOp":
        Script2();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  player.once(() => {
const target = object('6rUC9bpJ0m8');
const duration = 500;
const easing = 'ease-out';
const id = '5fYuBwjoVIr';
const growAmount = 0.3;
const delay = 24292;
addToTimeline(
target.animate([
{ scale: `${1 + growAmount}` }
],
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  player.once(() => {
const target = object('5p1VTmfvhn5');
const duration = 500;
const easing = 'ease-out';
const id = '6rDQryWyKeb';
const growAmount = 0.3;
const delay = 25988;
addToTimeline(
target.animate([
{ scale: `${1 + growAmount}` }
],
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

};
