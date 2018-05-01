window.addEventListener(
  "load", assignScroll
);

function assignScroll () {
  document.getElementsByClassName('enter')[0].addEventListener(
    "click", scrollToBottom
  );
}

function scrollToBottom () {
    var distance; var increment; var interval; var staticIncrement; var target;
    var frames = 70;
    var frame = 0;
    target = document.body.getBoundingClientRect().height - window.innerHeight + 60;
    distance = target - window.pageYOffset;
    staticIncrement = distance / frames;
    interval = window.setInterval(function () {
        increment = staticIncrement * 2 * ((frames / 2 - Math.abs(frames / 2 - frame)) / (frames / 2));
        frame += 1;
        if (frame > frames) {
            window.clearInterval(interval);
        }
        window.scrollTo(0, window.pageYOffset + increment);
    }, 25);
    window.addEventListener('wheel', window.clearInterval.bind(null, interval));
}
//
// function scrollToSide (direction/* 1 or -1 */, drawFunction) {
//   var distance; var increment; var interval; var staticIncrement; var target;
//   var frames = 70;
//   var frame = 0;
//   target = direction;
//   distance = 1;
//   staticIncrement = distance / frames;
//   interval = window.setInterval(function () {
//     increment = staticIncrement * 2 * ((frames / 2 - Math.abs(frames / 2 - frame)) / (frames / 2));
//     frame += 1;
//     if (frame > frames) {
//       window.clearInterval(interval);
//     }
//     // window.scrollTo(0, window.pageYOffset + increment);
//   }, 25);
//   window.addEventListener('wheel', window.clearInterval.bind(null, interval));
// }
