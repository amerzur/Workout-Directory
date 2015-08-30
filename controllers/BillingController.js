WDApp.controller("BillingController", ["$scope", "$sce", "workoutService",
    function ($scope,  $sce,workoutService) {
         
        $scope.tocken= workoutService.getTocken();
        $scope.paymentUrl = $sce.trustAsResourceUrl("DesktopModules/FYWorkoutDirectory/app/views/CreditCardForm.html?token=" + $scope.tocken + "&Lang=" + "en-us" );
    }]);