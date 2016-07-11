module.exports = function(p1, p2){
  var diffH = p2.x - p1.x;
  var diffV = p2.y - p1.y;


  var axis;
  //if( Math.abs(diffH) > ( Math.abs(diffV)*2 ) ){
  if( Math.abs(diffH) > Math.abs(diffV)*3 ){
    axis = 'horizontal';
  } else {
    axis = 'vertical';
  }

  var direction;
  if( axis === 'vertical' && diffV > 0 ){
    direction = 'y+';
  } else if( axis === 'vertical' && diffV < 0 ){
    direction = 'y-';
  } else if( axis === 'horizontal' && diffH > 0 ){
    direction = 'x+';
  } else if( axis === 'horizontal' && diffH < 0 ){
    direction = 'x-';
  }

  return direction;
};
