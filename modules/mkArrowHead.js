var geometry = require('./geometry');

module.exports = function(from, to, options){
  var angle = geometry.angle( to, from );

  var aL = ( options && options.length ) || 15; // Arrow length
  var aW = ( options && options.width ) || 10; // Arrow length / 2

  var arrowPoint1 = {
    x: to.x + aL,
    y: to.y + aW/2
  };
  var arrowPoint2 = {
    x: to.x + aL,
    y: to.y - aW/2
  };
  arrowPoint1 = geometry.rotate( arrowPoint1, to, angle );
  arrowPoint2 = geometry.rotate( arrowPoint2, to, angle );

  var arrowHeadPoints = `${to.x},${to.y} ${arrowPoint1.x},${arrowPoint1.y} ${arrowPoint2.x},${arrowPoint2.y}`;

  var arrowHeadConfig = {
    tag: 'polygon',
    props: {
      points: arrowHeadPoints
    },
    meta: {
      layerName: 'arrowHead'
    }
  };

  return arrowHeadConfig;
};
