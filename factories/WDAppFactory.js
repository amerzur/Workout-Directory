angular.module('WDApp.Factory', [])

    .factory("WDFactory", function ($http, $q, $resource) {
    return {
       
         
        getStoreItems: function (Criteria) {
             debugger;
            return $http.get('/desktopmodules/FYWorkoutDirectory/api/WorkoutDirectory/GetStoreItems'  , {
                params: { LevelIDs: Criteria.LevelIDs,
                    PlanTypeIDs: Criteria.PlanTypeIDs,
                    ObjectiveIDs: Criteria.ObjectiveIDs,
                    BodyParts: Criteria.BodyParts
                    , PlanName: Criteria.PlanName
                    , Isfree: Criteria.FreeOrPaid
                    , DirectoryTypes: Criteria.CompleteOrDay
                    , page: Criteria.Page,
                    Culture: $('#hdn_tm_culture').val()

                    
                }
                }
            );
        },
         
       
        GetFiltersList: function () {
            return $http({
                method: 'GET',
                url: '/desktopmodules/FYWorkoutDirectory/api/WorkoutDirectory/GetFiltersList?Culture=' + $('#hdn_tm_culture').val()
            });
        },

        getTocken:function(totalAmount,Currency){
            $http.get('/DesktopModules/FYWorkoutDirectory/API/WorkoutDirectory/GenerateUserTocken?Currency=' + Currency+'&totalAmount='+totalAmount
           )
        },
        addWorkoutToAccount: function (itemID,newPrductID) {
            return $http.get('/desktopmodules/FYWorkoutDirectory/api/WorkoutDirectory/AddItemToPurchaseHistory?ItemID=' + itemID.ItemID + '&NewProductID=' +itemID. NewProductID);
        },
        reapplyExercisePlan: function (planID) {
            return $http.get('/DesktopModules/FYWorkoutPlan/API/ExercisePlan/ReapplyExercisePlan?planID='+ planID.planID) 

        },
        reapplyWorkout: function (workoutID) {
            return $http.get('/DesktopModules/FYWorkoutPlan/API/ExercisePlan/ReapplyWorkout?workoutID=' + workoutID.workoutID)
        },
        getUsersPlan:function(page,itemType){
            return $http.get('/DesktopModules/FYWorkoutDirectory/api/WorkoutDirectory/GetUsersPlans?page='+page.page+'&ItemType='+page.itemType);
        }
        , checkifPurchased: function (productID) {
            return $http.get('/DesktopModules/FYWorkoutDirectory/api/WorkoutDirectory/CheckIfPurchased?ProductID=' + productID.productID);
        }

        , removeStoreItem: function (productID) {

            return $http.get('/DesktopModules/FyworkoutDirectory/api/workoutdirectory/DeleteStoreItem?ProductID=' + productID.productID);
        }
    }
});
angular.module('WDApp.RESTStoreItems', []).factory("RESTStoreItems", function ($resource) {
    return $resource('/desktopmodules/FYWorkoutDirectory/api/WorkoutDirectory/GetStoreItems',
        {
            LevelIDs: "@LevelIDs",
            PlanTypeIDs: "@PlanTypeIDs",
            ObjectiveIDs: "@ObjectiveIDs",
            BodyParts: "@BodyParts"
         , PlanName: "@PlanName"
         , Isfree: "@FreeOrPaid"
         , DirectoryTypes: "@CompleteOrDay"
          , page: "@Page"
            , minWeek: "@minWeek"
            , maxWeek: "@maxWeek"
            , Culture: "@culture"

        }
    );
     
});
angular.module('WDApp.PurchaseItemsREST', []).factory("PurchaseItemsREST", function ($resource) {

    return $resource('/DesktopModules/FYWorkoutDirectory/API/WorkoutDirectory/GetPurchaseItems');
});

 

angular.module('WDApp.WorkoutDetailsREST', []).factory("WorkoutDetailsREST", function ($resource) {
  
    return $resource('/DesktopModules/FYWorkoutPlan/API/ExercisePlan/GetWorkoutsListForStore', {
        planID: "@workoutID"
        });
    
})

angular.module('WDApp.OneDayWorkoutREST', []).factory("OneDayWorkoutREST", function ($resource) {

    return $resource('/DesktopModules/FYWorkoutPlan/API/ExercisePlan/GetWorkoutModelForStore', {
        workoutID: "@workoutID"
    });

})



 