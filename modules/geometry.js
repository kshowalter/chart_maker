var geometry = {};

geometry.fixPoint = function(point){
  if( point.constructor === Array ){
    return {
      x: point[0],
      y: point[1]
    };
  } else {
    return point;
  }
};

geometry.center = function(point1, point2){
  point1 = this.fixPoint(point1);
  point2 = this.fixPoint(point2);
  return {
    x: point1.x + ( point2.x - point1.x ) / 2,
    y: point1.y + ( point2.y - point1.y ) / 2
  };
};

geometry.distance_between = function(point1, point2){
  point1 = this.fixPoint(point1);
  point2 = this.fixPoint(point2);
  return Math.sqrt( Math.pow((point2.x-point1.x),2) + Math.pow((point2.y-point1.y),2) );
};

geometry.move_toward = function( point1, point2, distance ){
  point1 = this.fixPoint(point1);
  point2 = this.fixPoint(point2);
  var total_distance_between = this.distance_between(point1, point2);
  var fraction = distance / total_distance_between;
  var dx = ( point2.x - point1.x ) * fraction;
  var dy = ( point2.y - point1.y ) * fraction;
  var point2b = {
    x: point1.x + dx,
    y: point1.y + dy
  };
  return point2b;
};

geometry.rotate = function( point, pivot_point, angle ){
  point = this.fixPoint(point);
  pivot_point = this.fixPoint(pivot_point);
  /*
  var dx = pivot_point.x - point.x;
  var dy = pivot_point.y - point.y;
  var start_angle_rad = Math.atan(Math.abs(dy/dx));
  var rotate_angle_rad = angle * Math.PI/180;
  var angle = start_angle_rad + rotate_angle_rad;
  if( dx < 0 && dy > 0 ){ // Quad 2
    angle = Math.PI - angle;
  } else if( dx < 0 && dy < 0 ){ // Quad 3
    angle = Math.PI + angle;
  } else if( dx < 0 && dy < 0 ){ // Quad 4
    angle = 2*Math.PI - angle;
  }

  Math.tan(angle) *
  //*/

  angle = (angle) * (Math.PI/180); // Convert to radians
  var rotatedX = Math.cos(angle) * (point.x - pivot_point.x) - Math.sin(angle) * (point.y - pivot_point.y) + pivot_point.x;
  var rotatedY = Math.sin(angle) * (point.x - pivot_point.x) + Math.cos(angle) * (point.y - pivot_point.y) + pivot_point.y;

  return {
    x: rotatedX,
    y: rotatedY
  };
};

geometry.angle = function( point1, point2 ){
  point1 = this.fixPoint(point1);
  point2 = this.fixPoint(point2);

  var point = {
    x: point2.x - point1.x,
    y: point2.y - point1.y
  };

  var rad = Math.atan2( point.y, point.x );
  if( rad <= 0 ){
    rad = Math.PI*2 + rad;
  }

  var deg = rad * (180/Math.PI);

  return deg;
};

module.exports = geometry;
