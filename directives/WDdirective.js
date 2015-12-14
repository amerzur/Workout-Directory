angular.module('WDApp.fancybox', [])
.directive('fancybox', ['$compile', '$http',
  function ($compile, $http) {
      return function ($scope) {

          $scope.openFancybox = function (url) {
           
            
              var str1 = "https://www.youtube.com/watch?v=";
              url = str1.concat(url)
                      $.fancybox({
                          'padding': 0,
                          'autoScale': false,
                          'transitionIn': 'none',
                          'transitionOut': 'none', 
                          'width': 640,
                          'height': 385,
                          'href': url.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                          'type': 'swf',
                          'swf': {
                              'wmode': 'transparent',
                              'allowfullscreen': 'true'
                          }
                      });

                    
          }

      };
  }
]);





angular.module('WDApp.ngThumb', []).directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);


 