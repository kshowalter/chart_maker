var mkArrowHead = require('./mkArrowHead');

module.exports = function(from, to, options){

  var direction = options.direction;
  var half = options.half;
  var flow = options.flow || 'forward';
  var type = options.type || 'down';

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
        x: (from.x + to.x)/2,
        y: (from.y + to.y)/2
      };

    }
  }

  //if( options.type === 'down' ){

  var connectorConfig = {
    tag: 'g',
    children: [
      {
        tag: 'path',
        props: {
          d: connectorPath
        }
      }
    ]
  };

  if( flow === 'forward' || flow === 'both' ){
    var arrowHeadConfigF = mkArrowHead( startArrowHead, to );
    connectorConfig.children.push(arrowHeadConfigF);
  }
  if( flow === 'reverse' || flow === 'both' ){
    var arrowHeadConfigR = mkArrowHead( startArrowHead, from );
    connectorConfig.children.push(arrowHeadConfigR);
  }

  return connectorConfig;
};
