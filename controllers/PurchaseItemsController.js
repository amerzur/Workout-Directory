 
angular.module('WDApp.PurchaseItems', [])
.controller('PurchaseItemsController', ["$scope", "PurchaseItemsREST", "workoutService", "$state", "$modal", "$location", "$window",

    function ($scope, PurchaseItemsREST, workoutService, $state, $modal, $location, $window) {
        $window.document.title = "FitnessYard.com Cart Details";

        
        $scope.PurchaseItems = PurchaseItemsREST.query();
        $scope.PurchaseItems.$promise.then(function (result) {
           
            if (result.length != 0)
            {
                $scope.PurchaseItems = result;
                workoutService.setPurchasedItems($scope.PurchaseItems);
            }
        });
        $scope.goDetails = function (item) { 

            $state.go("WorkoutDetails", { "workoutID": item.FK_ItemId, "planTypeID": item.ItemType });

        };

        $scope.openModal = function (selectedItem) {
           
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return selectedItem;
                    }
                }
            });
        };




    }]);

angular.module('WDApp.ModalInstance', [])
.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "item", "$http",
    
    function ($scope, $modalInstance, item ,$http ) {
    
        $scope.currentItem = item;
        $scope.cancel = function () {
           
            $modalInstance.dismiss('cancel');
        };
        $scope.ok=function()
        { 
            $http.get('/DesktopModules/FYWorkoutPlan/API/ExercisePlan/ReapplyExercisePlan?planID=' + $scope.currentItem.FK_ItemId)
              .success(function (data) {
                
                  toastr.success("your plan reset Successfully ");
                  $scope.cancel();
              })
            .error(function () {
                toastr.warning("you don't own the item");
            })
            ;
        }
    
    }]);