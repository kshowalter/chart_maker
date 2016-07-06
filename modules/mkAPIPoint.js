var _ = require('lodash');

module.exports = function(point){
  if( ! point.label ){
    point.label = point.name.split('_').map(function(word){
      return _.capitalize(word);
    }).join(' ');
  }
  var labelWords = point.label.split(' ');
  var longestWord = labelWords.reduce(function(previousValue,currentValue){
    return Math.max(previousValue,currentValue.length);
  },1);
  var labelLineNum = labelWords.length;

  point.connectionPoints = {};
  if( point.type === 'api' ){
    point.connectionPoints = {
      in: {
        x: 0,
        y: -4
      },
      out: {
        x: 0,
        y: 4
      }
    };
  } else if( point.type === 'module' ){
    point.connectionPoints = {
      in: {
        x: 0,
        y: -(20*labelLineNum+5)/2
      },
      out: {
        x: 0,
        y: (20*labelLineNum+5)/2
      },
      right: {
        x: 0,
        y: 4
      }
    };
  } else {
    console.warn('unknown point type');
  }




  var pointConfig = {
    tag: 'g',
    props: {
      x: point.x,
      y: point.y,
      onclick: function(){
        console.log(point.url);
        //window.location.href = url;
        //window.location.href = 'https://github.com/kshowalter/SimpleDOM';
        if( point.url ){
          window.open(point.url);
        }
      }
    },
    children: []
  };

  if( point.type === 'api'){
    pointConfig.children.push(
      {
        tag: 'circle',
        props: {
          x: 0,
          y: 0,
          r: 8
        },
        meta: {
          layerName: point.type+'Point'
        }
      }
    );

    var layerName;
    if( point.url ){
      layerName = 'apiPointTitleLink';
    } else {
      layerName = 'apiPointTitle';
    }

    var startY = 5 - (labelLineNum-1) * 7;
    labelWords.forEach(function(labelWord, i){
      pointConfig.children.push(
        {
          tag: 'text',
          props: {
            x: 15,
            y: startY + (16*i)
          },
          meta: {
            layerName: layerName,
            fontName: point.type+'Title'
          },
          text: labelWord
        }
      );
    });
  } else  if(point.type === 'module'){
    var rect = {
      width: longestWord * 11,
      height: 20*labelLineNum+5
    };
    rect.x = 0 - rect.width/2;
    rect.y = 0 - rect.height/2;

    pointConfig.children.push(
      {
        tag: 'rect',
        props: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          onclick: function(){
            if( point.url ){
              window.open(point.url);
            }
          }
        },
        meta: {
          layerName: point.type+'TitleBackground'
        }
      }
    );

    var layerName;
    if( point.url ){
      layerName = 'modulePointTitleLink';
    } else {
      layerName = 'modulePointTitle';
    }

    var startY = 4 - (labelLineNum-1) * 7;
    labelWords.forEach(function(labelWord, i){
      pointConfig.children.push(
        {
          tag: 'text',
          props: {
            x: 0,
            y: startY + (16*i)
          },
          meta: {
            layerName: layerName,
            fontName: point.type+'Title'
          },
          text: labelWord
        }
      );
    });


  } else {
    console.warn('point not defined');
  }

  return pointConfig;
};
