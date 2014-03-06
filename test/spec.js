
describe('sbPopover directive', function () {
  var $document, init, scope, elem, sendKey;

  beforeEach(module('sbPopover'));

  beforeEach(inject(function (_$document_, _$timeout_) {
    $document = _$document_;
    $timeout = _$timeout_;
  }));

  beforeEach(inject(function($rootScope, $compile) {
    init = function (options) {
      elem = angular.element(options.template);
      scope = $rootScope;
      for (var key in options.scope) { scope[key] = options.scope[key]; }
      $compile(elem)(scope);
      scope.$digest();
      $document.find('body').append(elem);

      sendKey = function (key) {
        var code = {
          tab: 9,
          esc: 27,
        }[key];
        if (!code) throw new Error('Unknown key: '+key);
        $document.trigger($.Event('keydown', { which: code }));
      };
    };
  }));

  describe('basic operation', function () {
    var popover;

    beforeEach(function () {
      init({
        template: [
          '<div>',
            '<span sb-popover-show="show"></span>',
            '<a href="#">any old link</a>',
          '</div>'
        ].join(''),
        scope: {}
      });
      popover = elem.find('span');
    });

    it('should initiate', function() {
      expect(popover).toHaveClass('ng-hide');
    });

    it('should show', function() {
      scope.show = true;
      scope.$digest();
      expect(popover).not.toHaveClass('ng-hide');
    });
  });

  describe('closing', function () {
    var popover;

    beforeEach(function () {
      init({
        template: [
          '<div>',
            '<span sb-popover-show="show"></span>',
            '<a href="#">any old link</a>',
          '</div>'
        ].join(''),
        scope: { 
          show: true 
        }
      });
      $timeout.flush();
      popover = elem.find('span');
    });

    it('should hide on esc key press', function() {
      sendKey('esc');
      expect(popover).toHaveClass('ng-hide');
      expect(scope.show).toBe(false);
    });

    it('should hide on tab key press', function() {
      sendKey('tab');
      expect(popover).toHaveClass('ng-hide');
      expect(scope.show).toBe(false);
    });

    it('should hide on click outside', function() {
      elem.find('a').click();
      expect(popover).toHaveClass('ng-hide');
      expect(scope.show).toBe(false);
    });

    it('shouldnt hide on click inside', function() {
      popover.click();
      expect(popover).not.toHaveClass('ng-hide');
      expect(scope.show).toBe(true);
    });
  });
});
