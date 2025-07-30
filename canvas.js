paper.install(window);

var SQRT_3 = Math.pow(3, 0.5);
var triangle, mousePos, position;
var count = 50;

window.onload = function () {
  paper.setup('triangle-lost-in-space');
  
  mousePos = paper.view.center.add([paper.view.bounds.width / 3, 100]);
  position = paper.view.center;

  // 注释掉这两行，让背景图片透过
  // var background = new Path.Rectangle(paper.view.bounds);
  // background.fillColor = '#0a0a1a';
  
  buildStars();
  triangle = new Triangle(50);
  
  paper.view.onFrame = function (event) {
    position = position.add((mousePos.subtract(position)).divide(10));
    var vector = (paper.view.center.subtract(position)).divide(10);
    moveStars(vector.multiply(3));
    triangle.update();
  };
};
// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
window.onresize = function () {
  if (paper && paper.project) {
    paper.project.clear();
    var background = new Path.Rectangle(paper.view.bounds);
    background.fillColor = '#0a0a1a';
    buildStars();
    triangle = new Triangle(50);
  }
};

var random = function (minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};
// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function (a) {
  this.group = new Group({
    position: paper.view.center
  });
};

Triangle.prototype.update = function () {
  // 暂时留空，后续可以添加三角形动画
};

Triangle.prototype.rotate = function () {
  // var angle = paper.view.center.subtract(mousePos).angle - paper.view.center.subtract(this.ship.segments[0].point)
  //   .angle;

  // this.group.rotate(angle, paper.view.center);
};
// ---------------------------------------------------
//  Stars (from paperjs.org examples section)
// ---------------------------------------------------
window.onmousemove = function (event) {
  if (!event || !mousePos) return;
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
};

var buildStars = function () {
  var path = new Path.Circle({
    center: [0, 0],
    radius: 3,
    fillColor: 'white'
  });

  var symbol = new Symbol(path);

  for (var i = 0; i < count; i++) {
    var center = Point.random().multiply(paper.view.size);
    var placed = symbol.place(center);
    placed.scale(Math.random() * 0.8 + 0.2);
    placed.data = {
      vector: new Point({
        angle: Math.random() * 360,
        length: Math.random() * 2
      })
    };
  }
};

var keepInView = function (item) {
  var position = item.position;
  var viewBounds = paper.view.bounds;
  
  if (position.x > viewBounds.width + 10) {
    position.x = -10;
  }
  if (position.x < -10) {
    position.x = viewBounds.width + 10;
  }
  if (position.y > viewBounds.height + 10) {
    position.y = -10;
  }
  if (position.y < -10) {
    position.y = viewBounds.height + 10;
  }
};

var moveStars = function (vector) {
  var layer = project.activeLayer;
  for (var i = 1; i < layer.children.length; i++) {
    var item = layer.children[i];
    if (item && item.data) {
      item.position = item.position.add(vector.add(item.data.vector));
      keepInView(item);
    }
  }
};


