var findDirection = require('./findDirection');
var mkArrow = require('./mkArrow');

module.exports = function(p1, p2, options){
  if( ! p1 || ! p2 ){
    console.warn('connection destination missing', p1, p2);
    return false;
  }

  var direction = findDirection(p1, p2);

  var from, to;
  if( options.type === 'side' && direction === 'x+'){
    from = {
      x: p1.x + p1.connectionPoints.right.x,
      y: p1.y + p1.connectionPoints.right.y
    };
    to = {
      x: p2.x + p2.connectionPoints.left.x,
      y: p2.y + p2.connectionPoints.left.y
    };
  } else if( options.type === 'side' && direction === 'x-'){
    from = {
      x: p1.x + p1.connectionPoints.left.x,
      y: p1.y + p1.connectionPoints.left.y
    };
    to = {
      x: p2.x + p2.connectionPoints.right.x,
      y: p2.y + p2.connectionPoints.right.y
    };
  } else {
    from = {
      x: p1.x + p1.connectionPoints.out.x,
      y: p1.y + p1.connectionPoints.out.y
    };
    to = {
      x: p2.x + p2.connectionPoints.in.x,
      y: p2.y + p2.connectionPoints.in.y
    };
  }


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

  options = Object.assign({
    direction: direction,
    half: half,
    flow: 'forward',
    type: 'down'
  }, options);


  var connectorConfig = mkArrow(from, to, options);

  return connectorConfig;
};
