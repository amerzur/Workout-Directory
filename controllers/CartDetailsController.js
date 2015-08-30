WDApp.controller("CartDetailsController", ["$scope", "$rootScope", "$state", "ngCart", "workoutService", "$http","$window",
function ($scope, $rootScope, $state, ngCart, workoutService, $http, $window) {
  
    $window.document.title = "FitnessYard.com Cart Details";
    $scope.cartList = ngCart.getItems();
    $scope.isUndo=false
    $scope.removeFromCart = function (itemID) {
        ngCart.removeItemById( itemID)
    }
    $scope.cleanCart = function () {
        
        $scope. undoList = ngCart.getItems();
        ngCart.empty(1);
        $scope.cartList = [];
        $scope.isUndo=true
       
    }
    $scope.UndoClean = function () {
        angular.forEach($scope.undoList, function (value, key) { 
            
            ngCart.addItem(value._id, value._name, value._price, value._quantity,value._data );
           

        });
        $scope.isUndo = false;
        $scope.cartList = ngCart.getItems();
    }
    $scope.checkout = function () {
        if ($rootScope.UserID() != "-1")
        {
        $.blockUI({ message: '<h3>Loading Credit Card Form...</h3>' });
              $http.get('/DesktopModules/FYWorkoutDirectory/API/WorkoutDirectory/GenerateUserTocken?Currency=' + 'USD' + '&totalAmount=' + ngCart.totalCost())
                   .success(function (data) {
                    
                    $scope.Token = data;
                    workoutService.setTocken($scope.Token);
                    $.unblockUI();
                    //$scope.cleanCart();
                    $state.go('billing');

        }); 
        } else
        {
            toastr.info("please login first");

        }
        
        

    }
}]);

