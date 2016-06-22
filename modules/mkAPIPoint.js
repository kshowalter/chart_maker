module.exports = function(point){
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

    pointConfig.children.push(
      {
        tag: 'text',
        props: {
          x: 15,
          y: 5
        },
        meta: {
          layerName: layerName,
          fontName: point.type+'Title'
        },
        text: point.label
      }
    );
  } else  if(point.type === 'module'){

    var rect = {
      width: point.label.length * 10,
      height: 25
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

    pointConfig.children.push(
      {
        tag: 'text',
        props: {
          x: 0,
          y: 6
        },
        meta: {
          layerName: layerName,
          fontName: point.type+'Title'
        },
        text: point.label
      }
    );
  } else {
    console.warn('point not defined');
  }

  return pointConfig;
};
