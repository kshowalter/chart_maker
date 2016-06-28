console.log('script loaded');

var Kstore = require('kstore');

var mkAPIPoint = require('./modules/mkAPIPoint');
var mkConnector = require('./modules/mkConnector');

module.exports = function(input){

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
    point: input.points,
    connector: {},
    svgSpec: svgSpec,
    points: Kstore(),
    addPoint: function(point){
      this.points.insert(point);

      this.svgSpec.children.push(
        mkAPIPoint(point)
      );
    },
    cDown: function( point1name, point2name){
      var p1 = this.points.findOne({name: point1name });
      var p2 = this.points.findOne({name: point2name });
      this.svgSpec.children.push(
        //mkAPIPoint( this.point[point], text, url )
        mkConnector( p1, p2 )
      );
    }
  };



  return plot;
};
