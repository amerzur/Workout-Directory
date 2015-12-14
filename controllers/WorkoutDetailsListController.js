angular.module('WDApp.WorkoutDetailsList', [])
.controller("WorkoutDetailsListController", ["$scope", "workoutService", "$stateParams", "ngCart", "$state", "$modal", "$location",
    
    function ($scope, workoutService, $stateParams, $state, ngCart,$modal,$location) {

        $scope.WorkoutDetails = {}
        $scope.WeekNum = $stateParams.weekID;
        $scope.startDetailsList = function () {
          
            $scope.URL = $location.url();
            if($stateParams.weekID!=-1)
                $scope.WorkoutDetails.Workouts = workoutService.getWorkoutsbyWeeknum($stateParams.weekID);
            else
            {
                $scope.WorkoutDetails.Workouts = [];
                $scope.WorkoutDetails.Workouts[0]={};
                $scope.WorkoutDetails.Workouts[0].Workout = workoutService.getWorkoutDetails();
            }
            $scope.WorkoutID = workoutService.getWorkoutID();
          
            $scope.getStyle  ()  

           
        }
        $scope.StoreItem = {};
        $scope.getStyle = function () {
            
            $scope.StoreItem.isPurchased = workoutService.getWorkoutDetails().isPurchased;
            $scope.StoreItem.Price = workoutService.getWorkoutDetails().Price;
            if ($scope.StoreItem.Price == 0 || $scope.StoreItem.isPurchased )
             {
              
                $scope.priceClass = {}; 
             }
             else
             {
                 $scope.priceClass = "hidden-exercise"; 
             }

        }

        $scope.openModal = function () {
          
            $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.StoreItem;
                    }
                }
            });
        }
}])