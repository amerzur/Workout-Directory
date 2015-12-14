angular.module('WDApp.WorkoutDetails', [])
.controller("WorkoutDetailsController", ["$scope", "$rootScope", "$state", "$stateParams",
    "WorkoutDetailsREST", "OneDayWorkoutREST", "PurchaseItemsREST", "workoutService", "ngCart", "$window", "$location", "WDFactory","$timeout",
function ($scope, $rootScope, $state, $stateParams, WorkoutDetailsREST, OneDayWorkoutREST,
    PurchaseItemsREST, workoutService, ngCart, $window, $location, WDFactory, $timeout) {

    
    $window.document.title = "Fitnessyard Workout Details";

    $scope.WeekList = [];
    $scope.rate = 4;

    $scope.style = {};
    $scope.details = {};
    $scope.getLevelString = function (levelNum) {
        if (levelNum)
        {
            if ($scope.getCurrentCulture() == 'en-US')
                return $rootScope.Level[levelNum - 1].text;
            else
                return $rootScope.Level[levelNum - 1].textAR;
        }
        else
            return "";

    }
    $scope.getPlanTypeString = function (plantype) {
        if (plantype)
        {
            if ($scope.getCurrentCulture() == 'en-US')
                return $rootScope.CompleteOrDay[plantype - 1].text;
            else
                return $rootScope.CompleteOrDay[plantype - 1].textAR;

        }

        else
            return "";
    }
    $scope.getCurrentCulture = function () {
        return $rootScope.currentLanguage();
    }
    $scope.getNumberWeek = function (num) {

        return new Array(num);
    }
    $scope.FacebookUrl = $rootScope.FacebookUrl();
    $scope.getWeekText = function (index) {
        if ($scope.getCurrentCulture()=='en-US')
        {
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
        } else
        {
            switch (index)
            {
                case 1:
                    return "الاسبوع الاول";
                    break;
                case 2:
                    return "الاسبوع الثاني";
                    break;
                case 3:
                    return "الاسبوع الثالث";
                    break;
                case 4:
                    return "الاسبوع الرابع";
                    break;
                case 5:
                    return "الاسبوع الخامس";
                    break;
                case 6:
                    return "الاسبوع السادس";
                    break;
                case 7:
                    return "الاسبوع السابع";
                    break;
                case 8:
                    return "الاسبوع الثامن";
                    break;
                case 9:
                    return "الاسبوع التاسع";
                    break;
                case 10:
                    return "الاسبوع العاشر";
                    break;
                case 11:
                    return "الاسبوع الحادي عشر";
                case 12:
                    return "الاسبوع الثاني عشر";
                case 13:
                    return "الاسبوع الثالث عشر ";
                case 14:
                    return "الاسبوع الرابع عشر";
                case 15:
                    return "الاسبوع الخامس عشر";
                case 16:
                    return "الاسبوع السادس عشر";
                case 17:
                    return "الاسبوع السابع عشر";
                case 18:
                    return "الاسبوع الثامن عشر";
                case 19:
                    return "الاسبوع التاسع عشر";
                    break;

            }
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
                    $scope.assignRespondToWorkoutDetails(respond); 

               });
          
         
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

