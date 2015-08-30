WDApp.controller("WorkoutDetailsController", ["$scope", "$rootScope", "$state", "$stateParams",
    "WorkoutDetailsREST", "OneDayWorkoutREST", "PurchaseItemsREST", "workoutService", "ngCart", "$window", "$location", "WDFactory",
function ($scope, $rootScope, $state, $stateParams, WorkoutDetailsREST, OneDayWorkoutREST,
    PurchaseItemsREST, workoutService, ngCart, $window, $location, WDFactory) {

    //scroll to photo at open th e page 


    /// change the window title 
    $window.document.title = "FitnessYard.com  Workout Details";

    $scope.WeekList = [];
    $scope.rate = 4;

    $scope.style = {};
    $scope.details = {};
    $scope.getLevelString = function (levelNum) {
        if (levelNum)
            return $rootScope.Level[levelNum - 1].text;
        else
            return "";

    }
    $scope.getPlanTypeString = function (plantype) {
        if (plantype)
            return $rootScope.CompleteOrDay[plantype - 1].text;
        else
            return "";
    }

    $scope.getNumberWeek = function (num) {

        return new Array(num);
    }
    $scope.FacebookUrl = $rootScope.FacebookUrl();
    $scope.getWeekText = function (index) {
        switch (index)
        {
            case 1:
                return "WEEK ONE";
                break;
            case 2:
                return "WEEK TWO";
                break;
            case 3:
                return "WEEK THREE";
                break;
            case 4:
                return "WEEK FOUR";
                break;
            case 5:
                return "WEEK FIVE";
                break;
            case 6:
                return "WEEK SIX";
                break;
            case 7:
                return "WEEK SEVEN";
                break;
            case 8:
                return "WEEK EIGHT";
                break;
            case 9:
                return "WEEK NINE";
                break;
            case 10:
                return "WEEK TEN";
                break;
            case 11:
                return "WEEK ELEVEN";
            case 12:
                return "WEEK TWELVE";
            case 13:
                return "WEEK THIRTEEN ";
            case 14:
                return "WEEK FOURTEEN";
            case 15:
                return "WEEK FIFTEEN";
            case 16:
                return "WEEK SIXTEEN";
            case 17:
                return "WEEK SEVENTEEN";
            case 18:
                return "WEEK EIGHTTEEN";
            case 19:
                return "WEEK NINETEEN";
                break;

        }
    }

    $scope.ID = $stateParams.workoutID;

    $scope.GetDetails = function () {
       
        if ($stateParams.planTypeID == 2)
        {
            $scope.detailsPromise = WorkoutDetailsREST.get({ planID: $stateParams.workoutID }, function (respond) {
                $scope.getStyle(respond);
            });

        }
        else
        {
            $scope.detailsPromise = OneDayWorkoutREST.get({ workoutID: $stateParams.workoutID }, function (respond) {
                $scope.getStyle(respond);
            });

        }

    }

    $scope.getStyle = function (respond) {
      
            //if (respond.Price != 0)
            //{
                WDFactory.checkifPurchased({ productID: respond.ProductID })

               .success(function (checkPurchasedResponce) {
                   $scope.details.isPurchased = checkPurchasedResponce;
                   respond.isPurchased = checkPurchasedResponce;
                   if (checkPurchasedResponce || respond.Price==0)
                   {
                       $scope.style.opacity = "1";
                       $scope.style.cursor = "pointer";
                   }
                   else
                   {
                       $scope.style.opacity = "0.2";
                       $scope.style.cursor = "defualt";
                   }
                   $scope.weeksStyle = function () {
                       return {
                           cursor: $scope.style.cursor,
                           opacity: $scope.style.opacity
                       };
                   };
                   // set the details after request the priceing . 
                   $scope.assignRespondToWorkoutDetails(respond); 

               });
            //} else
            //{
            //  $scope.style.opacity = "1";
            //    $scope.style.cursor = "pointer";
            //    respond.isPurchased = true;
            //    $scope.details.isFree = true;
            //    $scope.weeksStyle = function () {
            //        return {
            //            cursor: $scope.style.cursor,
            //            opacity: $scope.style.opacity
            //        };
            //    };
            //    $scope.assignRespondToWorkoutDetails(respond);
            //}
         
    }

    $scope.assignRespondToWorkoutDetails = function (respond) {
        
        $scope.WorkoutDetails = respond;
        $scope.planTypeString = $scope.getPlanTypeString($scope.WorkoutDetails.ItemType);
        $scope.levelString = $scope.getLevelString($scope.WorkoutDetails.ExerciseLevel);

        workoutService.addWorkoutDetails($scope.WorkoutDetails);
        $location.hash('photos');

        if(respond.ItemType==2){
            $state.go("WorkoutDetails.mian");
        }  
        else
        {
             
            $state.go("WorkoutDetails.list", {"weekID":-1});
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

    /// for priceing list 
    $scope.addToCart = function (item) {

        ngCart.addItem(item.ProductID, item.DisplayName, item.Price)
    };

    $scope.showAddedToCart = function (id) {
        return ngCart.getItemById(id);
    }
    $scope.removeItemById = function (id) {
        ngCart.removeItemById(id);
    }
    $scope.checkout = function () {
        var Me = $scope.WorkoutDetails;
        ngCart.addItem(Me.ProductID, Me.DisplayName, Me.Price);
        $state.go("cartDetails");
    }

    $scope.backToList = function () {
        $scope.sliderOptions = {
            min: 0,
            max: 20,

        };
        var newCriteria = {
            LevelIDs: ""
         , PlanTypeIDs: "",
            ObjectiveIDs: "",
            BodyParts: ""
           , PlanName: ""
           , FreeOrPaid: ""
           , CompleteOrDay: ""
           , Page: "",
            minWeek: $scope.sliderOptions.min
           , maxWeek: $scope.sliderOptions.max
        };
        workoutService.setCriteria(newCriteria);
        $state.go("Home");
    }
}]
);

