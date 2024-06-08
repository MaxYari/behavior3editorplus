(function () {
  'use strict';

  angular
    .module('app')
    .directive('b3FaIconPicker', faIconPicker);

  faIconPicker.$inject = [
    '$window'
  ];

  function faIconPicker($window) {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };
    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
      var el = $(element);
      el.iconpicker({
        placement: "bottomLeft",
        collision: true
      });

      el.on('iconpickerSelected', function (e) {
        console.log("Icon selected");
        console.log(e);

        // Update the ngModel value with the unicode value
        scope.$apply(function () {
          ngModelCtrl.$setViewValue({ className: e.iconpickerValue });
        });

      });

      // Set the initial state from ngModel
      ngModelCtrl.$render = function () {
        // Here you can set the initial icon if needed
        // e.g., el.iconpicker('setIcon', ngModelCtrl.$viewValue);
        // Note: You'll need to have a mapping from unicode to icon class if you want to set it back.
      };
    }
  }

})();
