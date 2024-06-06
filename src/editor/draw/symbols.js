(function () {
  "use strict";

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
    var titleFontSize = '16px'; // Font size for the title
    var fieldValueFontSize = '12px'; // Font size for the field-value pairs

    // Create text object for title
    var titleText = new createjs.Text(
      titleContent,
      'bold ' + titleFontSize + ' Arial',
      settings.get('block_symbol_color')
    );
    titleText.textAlign = 'center';
    titleText.y = 0;

    // Adjust position of title text
    // titleText.regY = titleText.getBounds() / 2;

    // Set position and font size for field-value pairs
    var fieldValueText = new createjs.Text(
      propertiesContent,
      fieldValueFontSize + ' Arial',
      settings.get('block_symbol_color')
    );
    fieldValueText.textAlign = 'center';
    fieldValueText.y = titleText.getMeasuredHeight(); // Position below the title

    // Vertical align
    var totalHeight = titleText.getMeasuredHeight() + fieldValueText.getMeasuredHeight();
    titleText.y -= (totalHeight / 2 - 5);
    fieldValueText.y -= (totalHeight / 2 - 5);

    // Create a container to hold both title and field-value texts
    var container = new createjs.Container();
    container.addChild(titleText, fieldValueText);

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
