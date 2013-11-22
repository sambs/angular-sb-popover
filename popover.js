/* jshint es3: true */
/* global angular: true */

angular.module('ivPopover', [])
  
  .directive('ivPopover', ['$document', function (document) {

    return {
      restrict: 'A',

      link: function(scope, elem, attrs) {
        elem.addClass('iv-popover');

        scope.$watch(attrs.ivPopoverShow, function (val) {
          if (val) show();
          else hide();
        });

        function show () {
          elem.removeClass('ng-hide');
          setTimeout(function () {
            angular.element('html').on('click', clickHandler);
            angular.element('html').on('keydown', keyHandler );
          }, 500);
        }

        function hide () {
          scope[attrs.ivPopoverShow] = false;
          elem.addClass('ng-hide');
          angular.element('html').off('click', clickHandler);
          angular.element('html').off('keydown', keyHandler );
        }

        // Close on click anywhere outside of the popover
        function clickHandler (event) {
          if (!angular.element(event.target).closest('.iv-popover').length) {
            scope.$apply(function () {
              hide();
            });
          }
        }
        
        // Close on escape or tab key press
        function keyHandler (event) {
          if (~[27, 9].indexOf(event.keyCode)) {
            scope.$apply(function () {
              hide();
            });
          }
        }
      }
    };
  }]); 