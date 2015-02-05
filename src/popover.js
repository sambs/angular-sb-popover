/* jshint es3: true */
/* global angular: true */

angular.module('sbPopover', [])
  
  .directive('sbPopoverShow', ['$timeout', '$document', '$animate', function ($timeout, $document, $animate) {

    return {
      restrict: 'A',
      scope: {
        show: '=sbPopoverShow'
      },
      template: '<div ng-show="show" ng-transclude></div>',
      transclude: true,
      replace: true,

      link: function(scope, elem, attrs) {

        scope.$watch('show', function (val) {
          console.log(val);
          if (val) {
            // Dont add handlers straight away else the event
            // that opened the popover may close it as well
            $timeout(function () {
              $document.on('click', clickHandler);
              $document.on('keydown', keyHandler );
            }, 500);
          } else {
            $document.off('click', clickHandler);
            $document.off('keydown', keyHandler );
          }
        });

        // Close on click anywhere outside of the popover
        function clickHandler (event) {
          var node = event.target;
          while (node) {
            if (node === elem[0]) return;
            node = node.parentNode;
          }
          scope.$apply(function () {
            scope.show = false;
          });
        }
        
        // Close on escape or tab key press
        function keyHandler (event) {
          if (!~[27, 9].indexOf(event.which)) return;
          scope.$apply(function () {
            scope.show = false;
          });
        }
      }
    };
  }]); 
