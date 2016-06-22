var mkArrow = require('./mkArrow');

module.exports = function(p1, p2){
  if( ! p1 || ! p2 ){
    console.warn('connection destination missing', p1, p2);
    return false;
  }


  var from = {
    x: p1.x + p1.connect.out.x,
    y: p1.y + p1.connect.out.y
  };
  var to = {
    x: p2.x + p2.connect.in.x,
    y: p2.y + p2.connect.in.y
  };

  var connectorConfig = mkArrow(from,to);

  return connectorConfig;
};
