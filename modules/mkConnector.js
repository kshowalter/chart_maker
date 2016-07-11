var findDirection = require('./findDirection');
var mkArrow = require('./mkArrow');

module.exports = function(p1, p2, type){
  if( ! p1 || ! p2 ){
    console.warn('connection destination missing', p1, p2);
    return false;
  }

  var from = {
    x: p1.x + p1.connectionPoints.out.x,
    y: p1.y + p1.connectionPoints.out.y
  };
  var to = {
    x: p2.x + p2.connectionPoints.in.x,
    y: p2.y + p2.connectionPoints.in.y
  };

  var direction = findDirection(from, to);

  var half;
  if( direction === 'y-' && from.x === to.x ){
    half = {
      x: to.x - 100,
      y: to.y - 100
    };
  } else {
    half = {
      x: (from.x + to.x )/2,
      y: (from.y + to.y )/2
    };
  }

  var connectorConfig = mkArrow(from, to, {
    direction: direction,
    half: half
  });

  return connectorConfig;
};
