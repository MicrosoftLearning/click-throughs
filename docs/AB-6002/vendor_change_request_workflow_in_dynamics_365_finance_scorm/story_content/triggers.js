function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6LjfLdlCWJc":
        Script1();
        break;
      case "6nUouJvWVaf":
        Script2();
        break;
      case "5tfdycBEUdt":
        Script3();
        break;
      case "5Wzyt8XluPJ":
        Script4();
        break;
      case "5dNRVsU4S4v":
        Script5();
        break;
      case "5VfJgV13eWv":
        Script6();
        break;
      case "5xFU8BHDcKA":
        Script7();
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
const target = object('6lwQZSAZoxQ');
const duration = 750;
const easing = 'ease-out';
const id = '6c95GAzTaKg';
const shakeAmount = 2;
const delay = 11500;
addToTimeline(
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script2 = function()
{
  player.once(() => {
const target = object('6nfmk9jJBLx');
const duration = 750;
const easing = 'ease-out';
const id = '5YlhomaBPWs';
const shakeAmount = 2;
const delay = 11500;
addToTimeline(
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script3 = function()
{
  player.once(() => {
const target = object('5t4WTZkgbOa');
const duration = 750;
const easing = 'ease-out';
const id = '6bNBZHK6CYp';
const shakeAmount = 2;
const delay = 11500;
addToTimeline(
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script4 = function()
{
  player.once(() => {
const target = object('6kOpX05T4i2');
const duration = 750;
const easing = 'ease-out';
const id = '5upDyZVMH3R';
const shakeAmount = 2;
const delay = 11500;
addToTimeline(
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script5 = function()
{
  player.once(() => {
const target = object('5dj0OtZHKnN');
const duration = 750;
const easing = 'ease-out';
const id = '6J0wOzBCT6M';
const shakeAmount = 2;
const delay = 11500;
addToTimeline(
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

window.Script6 = function()
{
  const target = object('5xAJMfmZhuV');
const duration = 500;
const easing = 'ease-out';
const id = '6Uji2vj5D8D';
const shakeAmount = 5;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script7 = function()
{
  const target = object('66MgeEWpMJr');
const duration = 500;
const easing = 'ease-out';
const id = '6heyk6YOI0X';
const shakeAmount = 5;
player.addForTriggers(
id,
target.animate(
[ {translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `${shakeAmount}px 0` }, 
{translate: '0 0' }, 
{translate: `-${shakeAmount}px 0` }, 
{translate: '0 0' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
