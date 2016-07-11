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
    cDown: function( point1name, point2name, options){
      var p1 = this.points.findOne({name: point1name });
      var p2 = this.points.findOne({name: point2name });
      options = Object.assign({
        type: 'down'
      }, options);
      this.svgSpec.children.push(
        //mkAPIPoint( this.point[point], text, url )
        mkConnector( p1, p2, options )
      );
    },
    cUp: function( point1name, point2name, options){
      var p1 = this.points.findOne({name: point1name });
      var p2 = this.points.findOne({name: point2name });
      options = Object.assign({
        type: 'up'
      }, options);
      this.svgSpec.children.push(
        //mkAPIPoint( this.point[point], text, url )
        mkConnector( p1, p2, options )
      );
    },
    cSide: function( point1name, point2name, options){
      var p1 = this.points.findOne({name: point1name });
      var p2 = this.points.findOne({name: point2name });
      options = Object.assign({
        type: 'side'
      }, options);
      this.svgSpec.children.push(
        //mkAPIPoint( this.point[point], text, url )
        mkConnector( p1, p2, options )
      );
    }
  };



  return plot;
};
