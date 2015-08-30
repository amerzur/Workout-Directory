WDApp.controller('paymentStatusController', ["$scope", "$http" , "$stateParams","$rootScope","ngCart" ,"$q",

    function ($scope, $http, $stateParams, $rootScope, ngCart,$q) {
        
        $scope.tocken = $stateParams.Token;
        $scope.statusPromise;
        var cartItems = ngCart.getCart().items;
        var prodcutIDs = cartItems.map(function (item) { 
            return item._id;
        }).join(",");
        var FK_ItemIDs = cartItems.map(function (item) {
            return item._data.FK_ItemId;
        }).join(",");
        var  ItemTypes = cartItems.map(function (item) {
            return item._data.ItemType;
        }).join(",");
        //  ngCart.empty(1);

        $scope. generatePromise = $http.get('/DesktopModules/FYworkoutplan/API/ExercisePlan/ReapplyWorkoutList?WorkoutIDs=' + FK_ItemIDs + '&ItemTypes=' + ItemTypes + '&ProductIDs=' + prodcutIDs);

        $q.all([$scope.generatePromise]).then(function (arrayOfResults) {
            
            /// ... This callback would be called when all promised would be resolved
            var FK_ItemIDs = Object.keys(arrayOfResults[0].data).map(function (key) { return arrayOfResults[0].data[key] }).join(",");//Object.keys(arrayOfResults[0].data).join(",");
         $scope.statusPromise=  $http.get('/DesktopModules/FYWorkoutDirectory/API/WorkoutDirectory/PaymentStatus?tocken=' + $scope.tocken + '&ProductIDs=' + prodcutIDs + '&PurchasedItemIDs=' + FK_ItemIDs + '&ItemTypes=' + ItemTypes)
           .success(function (data) {

               $scope.paymentStatus = data;
               $scope.currentlanguage = $rootScope.currentLanguage();
               ngCart.empty(1);
           });
        });
       

}]);