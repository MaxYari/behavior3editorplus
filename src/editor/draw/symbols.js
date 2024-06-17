(function () {
  "use strict";

  function svgToImage(svgText, color, cb) {
    var parser = new DOMParser();

    var svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    var elements = svgDoc.querySelectorAll('path');
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('fill', color); // Change 'fill' color
    }
    var serializer = new XMLSerializer();
    svgText = serializer.serializeToString(svgDoc);

    var svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });

    // Generate a URL for the Blob
    var url = URL.createObjectURL(svgBlob);

    var img = new Image();
    img.src = url;

    img.onload = function () {
      var bitmap = new createjs.Bitmap(img);

      cb(bitmap);
    };
  }

  var shortToType = {
    "fas": "solid",
    "far": "regular",
    "fab": "brands"
  };

  function iconClassToMeta(className) {
    var shortType = className.split(" ")[0];
    var iconType = shortToType[shortType];
    var iconName = className.substr(className.lastIndexOf("fa-") + 3);

    return { type: iconType, name: iconName };
  }

  b3e.draw.rootSymbol = function (block, settings) {
    // var shape = block.displayObject;
    var shape = new createjs.Shape();

    var w = block._width;
    var h = block._height;
    var swidth = h / 20;
    var ssize = h / 5;
    var scolor = settings.get('block_symbol_color');

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.drawCircle(0, 0, ssize);
    shape.graphics.moveTo(-ssize, ssize);
    shape.graphics.lineTo(ssize, -ssize);
    shape.graphics.endStroke();

    return shape;
  };

  b3e.draw.sequenceSymbol = function (block, settings) {
    // var shape = block.displayObject;
    // var shape = block._shapeObject;

    var shape = new createjs.Shape();

    var w = block._width;
    var h = block._height;
    var swidth = h / 20;
    var ssize = h / 4;
    var scolor = settings.get('block_symbol_color');

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.beginFill(scolor);
    shape.graphics.moveTo(-ssize, 0);
    shape.graphics.lineTo(ssize, 0);
    shape.graphics.drawPolyStar(ssize / 2, 0, ssize / 2, 3, 0, 0);
    shape.graphics.endFill();
    shape.graphics.endStroke();

    return shape;
  };

  b3e.draw.memsequenceSymbol = function (block, settings) {
    var shape = new createjs.Shape();

    var w = block._width;
    var h = block._height;
    var swidth = h / 20;
    var ssize = h / 4;
    var scolor = settings.get('block_symbol_color');

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.beginFill(scolor);
    shape.graphics.drawPolyStar(0, -ssize * 0.75, ssize / 2, 6, ssize / 10, 0);

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.beginFill(scolor);
    shape.graphics.moveTo(-ssize, ssize / 2);
    shape.graphics.lineTo(ssize, ssize / 2);
    shape.graphics.drawPolyStar(ssize / 2, ssize / 2, ssize / 2, 3, 0, 0);
    shape.graphics.endFill();
    shape.graphics.endStroke();

    return shape;
  };

  b3e.draw.prioritySymbol = function (block, settings) {
    // var shape = block.displayObject;
    // var shape = block._shapeObject;
    var shape = new createjs.Shape();

    var w = block._width;
    var h = block._height;
    var swidth = h / 20;
    var ssize = h / 8;
    var scolor = settings.get('block_symbol_color');

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.arc(0, -ssize, ssize, 3.141561, 1.570796, false);
    shape.graphics.lineTo(0, ssize);
    shape.graphics.beginFill(scolor);
    shape.graphics.drawCircle(0, ssize * 2, swidth / 2);

    shape.graphics.endFill();
    shape.graphics.endStroke();

    return shape;
  };

  b3e.draw.memprioritySymbol = function (block, settings) {
    var shape = new createjs.Shape();

    var w = block._width;
    var h = block._height;
    var swidth = h / 20;
    var ssize = h / 8;
    var scolor = settings.get('block_symbol_color');

    shape.graphics.setStrokeStyle(swidth, 'round');
    shape.graphics.beginStroke(scolor);
    shape.graphics.arc(-ssize, -ssize, ssize, 3.141561, 1.570796, false);
    shape.graphics.lineTo(-ssize, ssize);
    shape.graphics.beginFill(scolor);
    shape.graphics.drawCircle(-ssize, ssize * 2, swidth / 2);
    shape.graphics.drawPolyStar(ssize * 1.5, 0, ssize / 2, 6, ssize / 10, 0);

    shape.graphics.endFill();
    shape.graphics.endStroke();

    return shape;
  };

  b3e.draw.textSymbol = function (block, settings) {
    // Initialize text with the node title
    var titleContent = block.getTitle();
    var propertiesContent = "";

    // Append field-value pairs from block.properties
    for (var prop in block.properties) {
      if (block.properties.hasOwnProperty(prop)) {
        propertiesContent += prop + ': ' + block.properties[prop] + '\n';
      }
    }

    // Define font sizes
    // Maybe do text wrapping as well for the title
    var titleFontSize = '16px'; // Font size for the title

    var fieldValueFontSize = '12px'; // Font size for the field-value pairs
    var color = settings.get('block_symbol_color');
    var bgIconAlpha = 0.2;
    if (block.node.category == b3e.INTERRUPT) {
      color = settings.get('interrupt_symbol_color');
      bgIconAlpha = 0.1;
    }


    // Add svg icon
    if (block.node.icon && block.node.icon.className) {
      var iconMeta = iconClassToMeta(block.node.icon.className);
      if (iconMeta.type && faIconsMeta[iconMeta.name] && faIconsMeta[iconMeta.name].svg[iconMeta.type]) {
        svgToImage(faIconsMeta[iconMeta.name].svg[iconMeta.type].raw, color, function (imgEl) {
          //Bg image
          var scale = block._height / imgEl.getBounds().height;
          imgEl.scaleX = imgEl.scaleY = scale;

          var height = imgEl.getBounds().height * scale;
          var width = imgEl.getBounds().width * scale;

          imgEl.x = 0;
          imgEl.y = 0;

          imgEl.alpha = bgIconAlpha;

          imgEl.y = -height / 2; // Center height

          imgEl.x = -block._width * 0.9 / 2; // Move to the left side

          container.addChildAt(imgEl, 0);

          // Text image
          imgEl = imgEl.clone();
          imgEl.alpha = 1;

          scale = 0.035;
          imgEl.scaleX = imgEl.scaleY = scale;
          height = imgEl.getBounds().height * scale;
          width = imgEl.getBounds().width * scale;

          imgEl.x = 0;
          imgEl.x = -width - 5; // place at the beginning of title
          imgEl.x -= Math.min(titleText.getMeasuredWidth(), 120) / 2;
          imgEl.y = -height / 2 + titleText.getMeasuredHeight() / 2;

          titleTextContainer.addChildAt(imgEl, 0);
          titleTextContainer.x += width / 2;
        });
      }
    }

    // Create text object for title
    var titleText = new createjs.Text(
      titleContent,
      'bold ' + titleFontSize + ' Arial',
      color
    );
    titleText.textAlign = 'center';
    titleText.maxWidth = 120;

    var titleTextContainer = new createjs.Container();
    titleTextContainer.addChild(titleText);
    titleTextContainer.y = 0;


    // Adjust position of title text
    // titleText.regY = titleText.getBounds() / 2;

    // Set position and font size for field-value pairs
    var fieldValueText = new createjs.Text(
      propertiesContent,
      fieldValueFontSize + ' Arial',
      color
    );
    fieldValueText.textAlign = 'center';
    fieldValueText.y = titleText.getMeasuredHeight(); // Position below the title

    // Vertical align
    var totalHeight = titleText.getMeasuredHeight() + fieldValueText.getMeasuredHeight();
    titleTextContainer.y -= (totalHeight / 2 - 5);
    fieldValueText.y -= (totalHeight / 2 - 5);

    // Create a container to hold both title and field-value texts
    var container = new createjs.Container();
    container.addChild(titleTextContainer, fieldValueText);

    return container;
  };


  b3e.draw.SYMBOLS = {
    'Root': b3e.draw.rootSymbol,
    'Sequence': b3e.draw.sequenceSymbol,
    'Priority': b3e.draw.prioritySymbol,
    'MemSequence': b3e.draw.memsequenceSymbol,
    'MemPriority': b3e.draw.memprioritySymbol,
  };

}());
