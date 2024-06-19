preloadedImages = {};

(function () {
  "use strict";

  // === Helper functions ===============================================
  function getIconData(className) {
    var iconMeta = iconClassToMeta(className);
    if (!iconMeta.type || !faIconsMeta[iconMeta.name] || !faIconsMeta[iconMeta.name].svg[iconMeta.type]) return null;
    return faIconsMeta[iconMeta.name].svg[iconMeta.type];
  }

  function loadIconImg(className, color, cb) {
    var imgHash = className + color;
    var iconData = getIconData(className);
    if (!iconData) return cb(null);

    var bitmap;

    if (preloadedImages[imgHash]) {
      bitmap = preloadedImages[imgHash].clone();
      setTimeout(function () {
        return cb(bitmap);
      });
    } else {
      // Parse svg text as DOM element, customize color, bake back into string.
      var parser = new DOMParser();
      var svgText = iconData.raw;
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
      // Discusting synchronous image loading

      img.onload = function () {
        bitmap = new createjs.Bitmap(img);

        createjs.Bitmap.prototype.width = function () {
          return this.getBounds().width * this.scaleX;
        };
        createjs.Bitmap.prototype.setWidth = function (width, keepAspect) {
          this.scaleX = width / this.getBounds().width;
          if (keepAspect) this.scaleY = this.scaleX;
        };
        createjs.Bitmap.prototype.height = function () {
          return this.getBounds().height * this.scaleY;
        };
        createjs.Bitmap.prototype.setHeight = function (height, keepAspect) {
          this.scaleY = height / this.getBounds().height;
          if (keepAspect) this.scaleX = this.scaleY;
        };

        preloadedImages[imgHash] = bitmap.clone();

        return cb(bitmap);
      };

      img.src = url;
    }
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

  function shortifyBlockTitle(str) {
    // Author: ChatGPT
    // Use a regular expression to find a word inside brackets and remove it
    var result = str.replace(/\[.*?\]/g, '');
    // Trim leading and trailing spaces
    result = result.trim();
    return result;
  }
  // ==================================================================================



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

  var propToShort = {
    randomStart: "..⮣..",
    shuffle: "🔀",
    avoidRepeats: "↻X"
  };

  function isShortableProp(prop) {
    return !!propToShort[prop];
  }


  b3e.draw.textSymbol = function (block, settings) {
    // Initialize text with the node title
    var titleContent = shortifyBlockTitle(block.getTitle());
    var propertiesContent = "";

    // Append field-value pairs from block.properties
    for (var prop in block.properties) {
      if (block.properties.hasOwnProperty(prop)) {
        if (block.node.category == b3e.COMPOSITE && isShortableProp(prop)) {
          if (block.properties[prop] == true || block.properties[prop] == 'true') {
            propertiesContent += propToShort[prop] + '\n';
          }
        } else {
          propertiesContent += prop + ': ' + block.properties[prop] + '\n';
        }
      }
    }

    // Define font sizes
    // Maybe do text wrapping as well for the title
    var titleFontSize = '16px'; // Font size for the title

    var fieldValueFontSize = '12px'; // Font size for the field-value pairs
    var color = settings.get('block_symbol_color');
    var bgIconAlpha = 0.15;
    if (block.node.isStealthy) {
      color = settings.get('interrupt_symbol_color');
      bgIconAlpha = 0.1;
    }
    if (block.node.category == b3e.COMPOSITE) {
      bgIconAlpha = 0;
    }

    // Main container
    var container = new createjs.Container();

    // Handling the title
    var titleTextContainer = new createjs.Container();


    // Create text object for title
    var titleText = new createjs.Text(
      titleContent,
      'bold ' + titleFontSize + ' Arial',
      color
    );
    titleText.textAlign = 'center';
    titleText.maxWidth = 120;

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

    container.addChild(titleTextContainer, fieldValueText);

    // Why dont we simply use font awesome font? Because it wasnt working on the canvas and i only figured how to make it work later,
    // this will work
    // var titleText = new createjs.Text(
    //   '\uf0ac',
    //   'bold ' + titleFontSize + ' "Font Awesome 5 Free"',
    //   color
    // );

    // Add svg icons
    if (block.node.icon && block.node.icon.className) {
      loadIconImg(block.node.icon.className, color, function (imgEl) {
        if (!imgEl) return;
        //Bg image
        imgEl.setHeight(block._height, true);

        imgEl.x = 0;
        imgEl.y = 0;

        imgEl.alpha = bgIconAlpha;

        imgEl.y = -imgEl.height() / 2; // Center height

        imgEl.x = -block._width * 0.9 / 2; // Move to the left side

        container.addChildAt(imgEl, 0);

        // Text image
        imgEl = imgEl.clone();

        imgEl.alpha = 1;
        imgEl.setHeight(18, true);

        imgEl.x = 0;
        imgEl.x = -imgEl.width();
        var titleStart = Math.min(titleText.getMeasuredWidth(), 120) / 2;
        imgEl.x -= titleStart;  // place at the beginning of title
        if (titleStart != 0) imgEl.x -= 5;
        imgEl.y = -imgEl.height() / 2 + titleText.getMeasuredHeight() / 2;

        titleTextContainer.addChildAt(imgEl, 0);
        titleTextContainer.x += imgEl.width() / 2;
      });
    }

    return container;
  };


  b3e.draw.SYMBOLS = {
    'Root': b3e.draw.rootSymbol
  };

}());
