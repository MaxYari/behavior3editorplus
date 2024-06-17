(function () {
  "use strict";

  var continuousDrawer = function (x, y, shape) {
    var start = null;
    var lastPoint = null;

    start = { x: x, y: y };
    shape.graphics.moveTo(x, y);
    lastPoint = start;

    return {
      draw: function (x, y) {
        var newPoint = { x: lastPoint.x + x, y: lastPoint.y + y };
        shape.graphics.lineTo(newPoint.x, newPoint.y);
        lastPoint = newPoint;
      },
      close: function () {
        shape.graphics.lineTo(start.x, start.y);
      }
    };
  };

  var makeAnchor = function (shape, x, y, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.drawCircle(x, y, radius);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  };

  var makeRect = function (shape, w, h, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.drawRoundRect(-w / 2, -h / 2, w, h, radius);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  };

  var makeTree = function (shape, w, h, radius, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.moveTo(-w / 2, 0);
    shape.graphics.lineTo(-w / 2 + 10, -h / 2);
    shape.graphics.lineTo(w / 2 - 10, -h / 2);
    shape.graphics.lineTo(w / 2, 0);
    shape.graphics.lineTo(w / 2 - 10, h / 2);
    shape.graphics.lineTo(-w / 2 + 10, h / 2);
    shape.graphics.lineTo(-w / 2, 0);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  };

  var makeEllipse = function (shape, w, h, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.drawEllipse(-w / 2, -h / 2, w, h);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  };

  var makeRhombus = function (shape, w, h, bg_color, border_width, border_color) {
    shape.graphics.beginFill(bg_color);
    shape.graphics.setStrokeStyle(border_width, 'round');
    shape.graphics.beginStroke(border_color);
    shape.graphics.moveTo(0, h / 2);
    shape.graphics.lineTo(w / 2, 0);
    shape.graphics.lineTo(0, -h / 2);
    shape.graphics.lineTo(-w / 2, 0);
    shape.graphics.lineTo(0, h / 2);
    shape.graphics.endStroke();
    shape.graphics.endFill();
  };


  b3e.draw.rootShape = function (block, settings) {
    var w = block._width;
    var h = block._height;
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }

    makeAnchor(shape, x, y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeRect(shape, w, h, 15,
      settings.get('root_color'),
      settings.get('block_border_width'),
      settings.get('block_border_color')
    );
    return shape;
  };


  b3e.draw.compositeShape = function (block, settings) {
    var bounds = block._displaySymbol.getBounds();
    var _width = 0;

    if (bounds) { _width = bounds.width + 60; }

    var w = Math.max(_width, block._width);
    var h = block._height;
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }
    makeAnchor(shape, x, y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeAnchor(shape, -x, -y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeRect(shape, w, h, 10,
      settings.get('composite_color'),
      settings.get('block_border_width'),
      settings.get('block_border_color')
    );
    return shape;
  };


  b3e.draw.decoratorShape = function (block, settings) {
    var bounds = block._displaySymbol.getBounds();

    var w = Math.max(bounds.width + 80, block._width); // Keeping the original width calculation
    var h = Math.max(bounds.height + 25, block._height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }
    makeAnchor(shape, x, y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeAnchor(shape, -x, -y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );

    // Fixed width for right and left sides of the hexagon
    var fixedSideWidth = Math.min(25, w / 3);
    var centralWidth = w - 2 * fixedSideWidth; // width of the central part of the hexagon
    var halfHeight = h / 2; // half of the height of the hexagon

    shape.graphics.beginFill(settings.get('decorator_color'));
    shape.graphics.setStrokeStyle(settings.get('block_border_width'), 'round');
    shape.graphics.beginStroke(settings.get('block_border_color'));

    // Drawing the hexagon with fixed sides
    shape.graphics.moveTo(-centralWidth / 2 - fixedSideWidth, 0);
    shape.graphics.lineTo(-centralWidth / 2, -halfHeight);
    shape.graphics.lineTo(centralWidth / 2, -halfHeight);
    shape.graphics.lineTo(centralWidth / 2 + fixedSideWidth, 0);
    shape.graphics.lineTo(centralWidth / 2, halfHeight);
    shape.graphics.lineTo(-centralWidth / 2, halfHeight);
    shape.graphics.lineTo(-centralWidth / 2 - fixedSideWidth, 0);

    shape.graphics.endStroke();
    shape.graphics.endFill();

    return shape;
  };


  b3e.draw.interruptShape = function (block, settings) {
    var bounds = block._displaySymbol.getBounds();

    var w = Math.max(bounds.width + 80, block._width); // Keeping the original width calculation
    var h = Math.max(bounds.height + 25, block._height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }

    var color = settings.get('decorator_color');
    if (block.node.isStealthy) color = settings.get('interrupt_color');

    makeAnchor(shape, x, y,
      settings.get('anchor_radius'),
      color,
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeAnchor(shape, -x, -y,
      settings.get('anchor_radius'),
      color,
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );

    // Fixed width for right and left sides of the hexagon
    var fixedSideWidth = Math.min(25, w / 3);
    var centralWidth = w - 2 * fixedSideWidth; // width of the central part of the hexagon
    var halfHeight = h / 2; // half of the height of the hexagon
    var dipHeight = halfHeight / 2;
    var predipWidth = fixedSideWidth * 0.33;
    var postdipWidth = fixedSideWidth - predipWidth;

    shape.graphics.beginFill(color);
    shape.graphics.setStrokeStyle(settings.get('block_border_width'), 'round');
    shape.graphics.beginStroke(settings.get('block_border_color'));

    var drawer = continuousDrawer(-centralWidth / 2 - fixedSideWidth, 0, shape);

    // Drawing the hexagon with fixed sides

    drawer.draw(postdipWidth, dipHeight);
    drawer.draw(predipWidth, dipHeight);
    drawer.draw(centralWidth, 0);
    drawer.draw(predipWidth, -dipHeight);
    drawer.draw(postdipWidth, -dipHeight);
    drawer.draw(-postdipWidth, -dipHeight);
    drawer.draw(-predipWidth, -dipHeight);
    drawer.draw(-centralWidth, 0);
    drawer.draw(-predipWidth, dipHeight);
    drawer.close();


    shape.graphics.endStroke();
    shape.graphics.endFill();

    return shape;
  };


  b3e.draw.actionShape = function (block, settings) {

    var bounds = block._displaySymbol.getBounds();
    var w = Math.max(bounds.width + 60, block._width);
    var h = Math.max(bounds.height + 15, block._height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }
    makeAnchor(shape, -x, -y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeRect(shape, w, h, Math.min(w / 2, h / 2),
      settings.get('action_color'),
      settings.get('block_border_width'),
      settings.get('block_border_color')
    );
    return shape;
  };

  b3e.draw.conditionShape = function (block, settings) {
    var bounds = block._displaySymbol.getBounds();

    var w = Math.max(bounds.width + 15, block._width);
    var h = Math.max(bounds.height + 15, block._height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    makeAnchor(shape, -w / 2 - anchorOffsetX, 0,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeEllipse(shape, w, h,
      settings.get('condition_color'),
      settings.get('block_border_width'),
      settings.get('block_border_color')
    );
    return shape;
  };

  b3e.draw.treeShape = function (block, settings) {
    var bounds = block._displaySymbol.getBounds();
    var w = Math.max(bounds.width + 15, block._width);
    var h = Math.max(bounds.height + 15, block._height);
    var anchorOffsetX = settings.get('anchor_offset_x');
    var shape = block._displayShape;
    block._width = w;
    block._height = h;

    var x = 0;
    var y = 0;
    if (settings.get('layout') === 'horizontal') {
      x = w / 2 + anchorOffsetX;
    } else {
      y = h / 2 + anchorOffsetX;
    }
    makeAnchor(shape, -x, -y,
      settings.get('anchor_radius'),
      settings.get('anchor_background_color'),
      settings.get('anchor_border_width'),
      settings.get('block_border_color')
    );
    makeTree(shape, w, h, 15,
      settings.get('tree_color'),
      settings.get('block_border_width'),
      settings.get('block_border_color')
    );
    return shape;
  };

  b3e.draw.SHAPES = {
    'root': b3e.draw.rootShape,
    'tree': b3e.draw.treeShape,
    'composite': b3e.draw.compositeShape,
    'decorator': b3e.draw.decoratorShape,
    'interrupt': b3e.draw.interruptShape,
    'action': b3e.draw.actionShape,
    'condition': b3e.draw.conditionShape,
  };

}());
