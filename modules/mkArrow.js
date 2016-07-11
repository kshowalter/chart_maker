var mkArrowHead = require('./mkArrowHead');

module.exports = function(from, to, options){

  var direction = options.direction;
  var half = options.half;
  var flow = options.flow || 'forward';
  var type = options.type || 'down';

  var aL = 15; // Arrow length
  var aW = 5; // Arrow length / 2
  var s = 20; // strait part of connector line
  var cPo = s*2; //Control point offset
  //var cPoH = half.y - from.y - s*1;

  var startArrowHead;
  var connectorPath;
  if( direction === 'y+' ){
    connectorPath = `M ${from.x},${from.y}
                     C ${from.x},${from.y+cPo} ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                     L ${to.x},${to.y}`;
    startArrowHead = {
      x: to.x,
      y: to.y-s
    };
  } else if( direction === 'y-' ){
    connectorPath = `M ${from.x},${from.y}
                     L ${from.x},${from.y+s}
                     C ${from.x},${ from.y+cPo } ${half.x},${from.y+cPo} ${half.x},${from.y}
                     L ${half.x},${to.y-s}
                     C ${half.x},${ to.y-cPo } ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                     L ${to.x},${to.y}`;
    startArrowHead = {
      x: to.x,
      y: to.y-s
    };
  } else if( direction === 'x+' || direction === 'x-' ){
    //if( direction === 'x-') cPo = -cPo;
    if( options.type === 'down' ){
      connectorPath = `M ${from.x},${from.y}
                       C ${from.x},${ from.y+cPo } ${half.x},${from.y+cPo} ${half.x},${half.y}
                       C ${half.x},${ to.y-cPo } ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                       L ${to.x},${to.y}`;
      startArrowHead = {
        x: to.x,
        y: to.y-s
      };

    } else {
      connectorPath = `M ${from.x},${from.y}
                       L ${to.x},${to.y}`;
      startArrowHead = {
        x: from.x,
        y: from.y
      };
    }
  }

  //if( options.type === 'down' ){

  var arrowHeadConfig;
  if( flow === 'forward' || flow === 'both' ){
    arrowHeadConfig = mkArrowHead( startArrowHead, to );
  } else if( flow === 'reverse' || flow === 'both' ){
    arrowHeadConfig = mkArrowHead( startArrowHead, from );
  }

  var connectorConfig = {
    tag: 'g',
    children: [
      {
        tag: 'path',
        props: {
          d: connectorPath
        }
      },
      arrowHeadConfig
    ]
  };

  return connectorConfig;
};
