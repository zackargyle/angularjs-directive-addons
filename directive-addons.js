angular.module('angularProject.directives', [])

/*

enterNext: enter-next
  - Use in inputs to defer default submit
  - When enter is pressed, focus is moved to next input

highlight: highlight="<event>,<color>"
  - Element toggles to color on event

clickToHide: click-to-hide
  - Element disappears on click

checkbox: checkbox="<color-unchecked>,<color-checked>"
  - On click, checkbox toggles color

toDoList: to-do-list
  - Basic to do list with add and remove functionality

*/

.directive('enterNext', function() {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {
      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
          e.preventDefault();
          elem.nextAll('input').first().focus();
        }
      });
    }
  }
})
.directive('highlight', function() {
  return function($scope, elem, attrs) {
    var highlight = attrs.highlight.split(","),
        toggle = false;
    elem.bind(highlight[0], function() {
      if (toggle) {
        toggle = false;
        elem.css('background-color', "");
      }
      else 
        toggle = true;
        elem.css('background-color', highlight[1]);
      }
    });
  }
})
.directive('clickToHide', function() {
  return function($scope, elem, attrs) {

    elem.bind('click', function() {
      elem.hide();
    });

  }
})
.directive('checkbox', function() {
  return {
    restrict: 'A',
    replace: true,
    template: "<div>" +
                "<input type='checkbox' id='custom-checkbox' ng-model='checked'>" +
                "<label for='custom-checkbox'></label>" +
              "</div>",
    link: function(scope,elem,attrs) {

      $("#custom-checkbox").css("display", "none");
      $("label[for='custom-checkbox']").css({
        display: 'block', cursor: 'pointer', height: '12px',
        width: '12px', border: '1px solid black'
      });

      var checkbox = attrs.checkbox.split(",");

      scope.$watch('checked', function() {
        if (scope.checked) $("label[for='custom-checkbox']").css("background-color", checkbox[1]);
        else $("label[for='custom-checkbox']").css("background-color", checkbox[0]);
      });

    }
  }
})
.directive('toDoList', function() {
  return {
    restrict: "A",
    template: "<form id='to-do-list'>" +
                "<input ng-model='item'>" + "<br>" +
                "<button ng-click='add()'>Add</button>" +
                "<button ng-click='remove()''>Remove</button>" +
                "<br>" +
                "<div id='append-to-do-list'></div>" +
              "</form>",
    scope: {},
    link: function($scope,elem,attrs) {

      $scope.add = function() {
          var p = "<div><input type='checkbox'><p>" + $scope.item + "</p></div>";
          $('#append-to-do-list').append(p);
          $scope.item = "";
      };

      $scope.remove = function() {
        $("#append-to-do-list > div").each(function() {
          if ($(this).children()[0].checked) {
            $(this).remove();
          }
        });
      }
    }
  }
});

/*

POSSIBLE DIRECTIVES

text-overflow
currency
click-select
animations
auto-complete
type-ahead

*/