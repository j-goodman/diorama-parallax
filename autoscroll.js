// var autoScrollTo = function (targetElementClass, scrollSpeed = 4) {
//   // Scroll vertically to the given target element.
//   // targetElement should not be a React Component, use container element if scrolling to React Component.
//   var targetElement = document.getElementsByClassName(targetElementClass)[0];
//   var targetY = targetElement.getBoundingClientRect().top + window.pageYOffset - 40;
//   var direction = targetY > window.pageYOffset ? 1 : -1;
//   var controller = {
//       accel: 0, index: 0, interval: null,
//       midpoint: (targetY + pageYOffset) / 2, speed: 0, target: targetY,
//   };
//
//   controller.interval = window.setInterval(function () {
//       this.accel = (
//           (direction === 1 && window.pageYOffset < this.midpoint) ||
//           (direction === -1 && window.pageYOffset > this.midpoint)
//       ) ? scrollSpeed : -scrollSpeed;
//
//       if (
//           ((direction === 1 && window.pageYOffset + this.speed > this.target) ||
//           (direction === -1 && window.pageYOffset + this.speed < this.target)) || this.index > 120
//       ) {
//           window.clearInterval(this.interval);
//       }
//
//       this.index ++;
//       this.speed += this.accel;
//       this.speed = this.speed < 4 ? 4 : this.speed;
//       window.scrollTo(0, window.pageYOffset + this.speed * direction);
//   }.bind(controller), 12);
// };
console.log('Ready.');
window.onkeydown = function () {
  console.log('Go!');
  var targetY = window.innerHeight + 200;
  var direction = targetY > window.pageYOffset ? 1 : -1;
  var controller = {
      accel: 0, index: 0, interval: null,
      midpoint: (targetY + pageYOffset) / 2, speed: 0, target: targetY,
  };

  controller.interval = window.setInterval(function () {
      this.accel = (
          (direction === 1 && window.pageYOffset < this.midpoint) ||
          (direction === -1 && window.pageYOffset > this.midpoint)
      ) ? 0.1 : -0.1;

      if (
          ((direction === 1 && window.pageYOffset + this.speed > this.target) ||
          (direction === -1 && window.pageYOffset + this.speed < this.target)) || this.index > 120
      ) {
          window.clearInterval(this.interval);
      }

      this.index ++;
      this.speed += this.accel;
      this.speed = this.speed < 4 ? 4 : this.speed;
      window.scrollTo(0, window.pageYOffset + this.speed * direction);
  }.bind(controller), 12);
};
