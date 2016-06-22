console.log('script loaded');

var mkAPIPoint = require('./modules/mkAPIPoint');
var mkConnector = require('./modules/mkConnector');

module.exports = function(input){
  
  console.log('page loaded');

  var viewBox = input.viewBox || '0 0 ' + input.width +' '+ input.height;

  var svgSpec = {
    tag: 'svg',
    props: {
      viewBox: viewBox,
      height: input.height,
      width: input.width
    },
    children: []
  };

  var plot = {
    point: {},
    connector: {},
    svgSpec: svgSpec,
    addPoint: function(point){
      this.svgSpec.children.push(
        mkAPIPoint(point)
      );
    },
    connect: function( point1name, point2name){
      this.svgSpec.children.push(
        //mkAPIPoint( this.point[point], text, url )
        mkConnector( this.point[point1name], this.point[point2name] )
      );
    }
  };

  plot.point = input.points;

  for( var pointName in plot.point ){
    var point = plot.point[pointName];
    if( ! point.label ){
      point.label = pointName;
    }
    point.connect = {};
    if( point.type === 'api' ){
      point.connect.in = {
        x: 0,
        y: -4
      };
      point.connect.out = {
        x: 0,
        y: 4
      };
    } else if( point.type === 'module' ){
      point.connect.in = {
        x: 0,
        y: -12.5
      };
      point.connect.out = {
        x: 0,
        y: 12.5
      };
    }

    plot.addPoint(plot.point[pointName]);
  }

  return plot;
};
