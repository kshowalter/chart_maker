module.exports = function(from, to, options){

  var direction = options.direction;
  var half = options.half;
  var flow = options.flow || 'forward';

  var aL = 15; // Arrow length
  var aW = 5; // Arrow length / 2
  var s = 20; // strait part of connector line
  var cPo = s*2; //Control point offset
  //var cPoH = half.y - from.y - s*1;

  var arrowHeadPoints;
  var connectorPath;
  if( direction === 'y+' ){
    connectorPath = `M ${from.x},${from.y}
                     C ${from.x},${from.y+cPo} ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                     L ${to.x},${to.y}`;
  } else if( direction === 'y-' ){
    connectorPath = `M ${from.x},${from.y}
                     L ${from.x},${from.y+s}
                     C ${from.x},${ from.y+cPo } ${half.x},${from.y+cPo} ${half.x},${from.y}
                     L ${half.x},${to.y-s}
                     C ${half.x},${ to.y-cPo } ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                     L ${to.x},${to.y}`;
  } else if( direction === 'x+' || direction === 'x-' ){
    //if( direction === 'x-') cPo = -cPo;
    connectorPath = `M ${from.x},${from.y}
                     C ${from.x},${ from.y+cPo } ${half.x},${from.y+cPo} ${half.x},${half.y}
                     C ${half.x},${ to.y-cPo } ${to.x},${to.y-cPo} ${to.x},${to.y-s}
                     L ${to.x},${to.y}`;
  }

  if( flow === 'forward' || flow === 'both' ){
    arrowHeadPoints = `${to.x},${to.y} ${to.x-aW},${to.y-aL} ${to.x+aW},${to.y-aL}`;
  } else if( flow === 'reverse' || flow === 'both' ){
    arrowHeadPoints = `${from.x},${from.y} ${from.x+aW},${from.y+aL} ${from.x-aW},${from.y+aL}`;
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
      {
        tag: 'polygon',
        props: {
          points: arrowHeadPoints
        },
        meta: {
          layerName: 'arrowHead'
        }
      }
    ]
  };

  return connectorConfig;
};
