angular.module('WDApp.Billing', [])
.controller("BillingController", ["$scope", "$sce", "workoutService", "$rootScope",
    function ($scope,  $sce,workoutService,$rootScope) {
         
        $scope.tocken= workoutService.getTocken();
        $scope.paymentUrl = $sce.trustAsResourceUrl($rootScope.BaseUrl() + "/DesktopModules/FYWorkoutDirectory/app/views/CreditCardForm.html?token=" + $scope.tocken + "&Lang=" + $('#hdn_tm_culture').val() + '&BaseUrl=' + $('#hdn_tm_Url').val());
    }]);