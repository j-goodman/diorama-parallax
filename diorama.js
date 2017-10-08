window.onload = initialize;

function initialize () {
  var canvas;
  var ctx;
  var diorama;
  var image;

  window.sidescroll = 0;
  onkeydown = function (event) {
    switch (event.keyCode) {
      case 37: // left
        window.sidescroll -= 50;
        break;
      case 39: // right
        window.sidescroll += 50;
        break;
      case 65: // a
        window.sidescroll = -2000;
        break;
      case 68: // d
        window.sidescroll = 2000;
        break;
      case 83: // d
        window.sidescroll = 0;
        break;
    }
  };

  diorama = new Diorama ({
    canvasId: 'canvas',
    cutouts: [
      new Cutout ({
        name: 'manhattan',
        anchor: {
          x: -700,
          y: 620,
          z: 100,
        },
        imageSource: 'images/manhattan.png',
        width: 4500,
        height: 'auto',
      }),
      new Cutout ({
        name: 'brooklyn',
        anchor: {
          x: -598,
          y: 1172,
          z: 0,
        },
        imageSource: 'images/brooklyn.png',
        width: 4500,
        height: 'auto',
      }),
      new Cutout ({
        name: 'boathouse',
        anchor: {
          x: -1700,
          y: 1324,
          z: 25,
        },
        imageSource: 'images/boathouse.png',
        width: 2400,
        height: 'auto',
      }),
      new Cutout ({
        name: 'tunnel',
        anchor: {
          x: -1400,
          y: 890,
          z: 60,
        },
        imageSource: 'images/tunnel.png',
        width: 2200,
        height: 'auto',
      }),
    ],
  });

  diorama.draw();
  window.addEventListener("scroll", diorama.draw.bind(diorama));
  window.addEventListener("keydown", diorama.draw.bind(diorama));
}

function Diorama (obj) {
  this.cutouts = obj.cutouts.sort(function (x, y) {
    return x.anchor.z > y.anchor.z ? -1 : 1;
  });
  this.canvas = document.getElementById(obj.canvasId);
  this.ctx = this.canvas.getContext('2d');
}

Diorama.prototype.draw = function () {
  var cutout;
  var i;
  var scroll = {
    x: window.sidescroll,
    y: window.pageYOffset,
  };
  var offset = {
    x: scroll.x / 2000,
    y: scroll.y / (document.body.scrollHeight - window.innerHeight),
  };
  // scroll.
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (i=0 ; i<this.cutouts.length ; i++) {
    cutout = this.cutouts[i];
    if (cutout.height === 'auto') {
      cutout.height = cutout.width * (cutout.image.height / cutout.image.width);
    } else if (cutout.width === 'auto') {
      cutout.width = cutout.height * (cutout.image.width / cutout.image.height);
    }
    this.ctx.drawImage(
      cutout.image,
      cutout.anchor.x - scroll.x + cutout.anchor.z * offset.x * 14,
      cutout.anchor.y - scroll.y + cutout.anchor.z * offset.y * 4,
      cutout.width,
      cutout.height
    );
  }
};

function Cutout (obj) {
  this.anchor = obj.anchor;
  this.image = document.createElement('img');
  this.image.src = obj.imageSource;
  this.width = obj.width;
  this.height = obj.height;
}
