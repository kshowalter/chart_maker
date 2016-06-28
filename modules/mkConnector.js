var mkArrow = require('./mkArrow');

module.exports = function(p1, p2){
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

  var connectorConfig = mkArrow(from,to);

  return connectorConfig;
};
