/* jshint es3: true */
/* global angular: true */

angular.module('sbPopover', [])
  
  .directive('sbPopoverShow', ['$timeout', '$document', '$animate', function ($timeout, $document, $animate) {

    return {
      restrict: 'A',

      link: function(scope, elem, attrs) {

        scope.$watch(attrs.sbPopoverShow, function (val) {
          if (val) show();
          else hide();
        });

        function show () {
          $animate.removeClass(elem, 'ng-hide');
          $timeout(function () {
            $document.on('click', clickHandler);
            $document.on('keypress', keyHandler );
          }, 500);
        }

        function hide () {
          scope[attrs.sbPopoverShow] = false;
          $animate.addClass(elem, 'ng-hide');
          $document.off('click', clickHandler);
          $document.off('keypress', keyHandler );
        }

        // Close on click anywhere outside of the popover
        function clickHandler (event) {
          var node = event.target;
          while (node) {
            if (node === elem[0]) return;
            node = node.parentNode;
          }
          hide();
        }
        
        // Close on escape or tab key press
        function keyHandler (event) {
          if (~[27, 9].indexOf(event.which)) {
            scope.$apply(function () {
              hide();
            });
          }
        }
      }
    };
  }]); 
