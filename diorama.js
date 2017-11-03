window.onload = initialize;
var diorama;

function initialize () {
  var canvas;
  var ctx;
  var image;

  window.sidescroll = 0;
  onkeydown = function (event) {
    switch (event.keyCode) {
      case 37: // left
        if (window.sidescroll > -1960) {
          window.sidescroll -= 40;
        }
        break;
      case 39: // right
        if (window.sidescroll < 1740) {
          window.sidescroll += 40;
        }
        break;
      case 65: // a
        window.sidescroll = -1960;
        break;
      case 68: // d
        window.sidescroll = 1760;
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
          x: -1300,
          y: 760,
          z: 120,
        },
        imageSource: 'images/background/manhattan.png',
        width: 4500,
        height: 'auto',
      }),
      new Cutout ({
        name: 'greenwood',
        anchor: {
          x: -760,
          y: 1310,
          z: 90,
        },
        imageSource: 'images/background/greenwood.png',
        width: 1600,
        height: 'auto',
      }),
      new Cutout ({
        name: 'bayridge',
        anchor: {
          x: -820,
          y: 1000,
          z: 100,
        },
        imageSource: 'images/background/bayridge.png',
        width: 1160,
        height: 'auto',
      }),
      new Cutout ({
        name: 'brooklyn',
        anchor: {
          x: -598,
          y: 1226,
          z: 0,
        },
        imageSource: 'images/background/brooklyn.png',
        width: 4500,
        height: 'auto',
      }),
      new Cutout ({
        name: 'williamsburg',
        anchor: {
          x: 480,
          y: 1400,
          z: 60,
        },
        imageSource: 'images/background/williamsburg.png',
        width: 1100,
        height: 'auto',
      }),
      new Cutout ({
        name: 'warehouse',
        anchor: {
          x: 2240,
          y: 1550,
          z: 40,
        },
        imageSource: 'images/background/warehouse.png',
        width: 1300,
        height: 'auto',
      }),
      new Cutout ({
        name: 'ridgewood',
        anchor: {
          x: 1650,
          y: 1180,
          z: 70,
        },
        imageSource: 'images/background/ridgewood.png',
        width: 1450,
        height: 'auto',
      }),
      new Cutout ({
        name: 'boathouse',
        anchor: {
          x: -1700,
          y: 1450,
          z: 30,
        },
        imageSource: 'images/background/boathouse.png',
        width: 2400,
        height: 'auto',
      }),
      new Cutout ({
        name: 'tunnel',
        anchor: {
          x: -1420,
          y: 950,
          z: 60,
        },
        imageSource: 'images/background/tunnel.png',
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
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (i=0 ; i<this.cutouts.length ; i++) {
    cutout = this.cutouts[i];
    if (cutout.height === 'auto' && cutout.image.height !== 0) {
      cutout.height = cutout.width * (cutout.image.height / cutout.image.width);
    } else if (cutout.width === 'auto' && cutout.image.width !== 0) {
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
  document.getElementsByClassName('subtitle')[0].style.transform =
  'translateY(' + (offset.y * 70) + 'px)';
};

function Cutout (obj) {
  this.anchor = obj.anchor;
  this.name = obj.name;
  this.image = document.createElement('img');
  this.image.onload = function () {
    diorama.draw();
  }.bind(this);
  this.image.src = obj.imageSource;
  this.width = obj.width;
  this.height = obj.height;
}
