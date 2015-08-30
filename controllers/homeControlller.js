WDApp.controller("homeControlller", ["$state", "$rootScope", "$scope", "WDFactory",

    "workoutService", "RESTStoreItems", "ngCart", "PurchaseItemsREST", "$window",
function ($state, $rootScope, $scope, WDFactory, workoutService, RESTStoreItems, ngCart, PurchaseItemsREST,$window) {

       
       // $window.document.title = "fitnessYard.com w";
      
    $scope.totalItemsinCart = ngCart.getTotalItems();
    //$scope.$watch('ngCart.getTotalItems()', function (newValue) {
    
    //    $scope.totalItemsinCart = newValue;
    //})
    $scope.totalCost = ngCart.totalCost();

        $scope.sliderOptions = {
            min: 0,
            max: 20,

        };
        $scope.clearFitersShow = false;
        // initilaze of filters properties 
        //////////// 
   
        $scope.Criteria = workoutService.getCriteria() || {
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

        $scope.Pagination = {};

        $scope.LevelSelected = [];
        $scope.PlanTypesSelected = [];
        $scope.ObjectiveSelected = [];
        $scope.BodyPartsSelected = [];
        $scope.FreeOrPaidSelected = [];
        $scope.CompleteOrDaySelected = [];
      
        $scope.Collapse = {
            levelList: false,
            Objectives: false,
            BodyParts: false,
            PlanTypes: false,
            CompleteOrDay: true,
            FreeOrPaid:true


        }
        // finish initilazation of filters 
        /////////////////



        //get reviouse user purchased Item to not enable him purchase again 
        /////////////////////////////////////////////////

        $scope.PurchaseItems = PurchaseItemsREST.query();
        $scope.PurchaseItems.$promise.then(function (result) {
           
            if (result.length != 0)
            {
$scope.PurchaseItems = result;
            workoutService.setPurchasedItems($scope.PurchaseItems);
            }
            
        });
        ///////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////

        
        $scope.GetFiltersList = function () {
            
           
            WDFactory.GetFiltersList().success(function (data) {
               
                $scope.Objectives = data.objectives;
                $scope.BodyParts = data.BodyParts;
                $scope.levelList = $rootScope.Level;
                $scope.PlanTypes = $rootScope.PlanTypes;
                $scope.CompleteOrDay = $rootScope.CompleteOrDay;
                $scope.FreeOrPaid = $rootScope.FreeOrPaid;
                
                
               // $state.go("CompletePlans");
            })
              .error(function (data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
              }).then(function () {


              });
        }

        ////////////////////////
        //toggle check box functions 
        //////////////////////////////////

        $scope.toggleSelectedPlanType = function toggleSelectedPlanType(plantype) {

            var idx = $scope.PlanTypesSelected.indexOf(plantype);

            // is currently selected
            if (idx > -1)
            {
                $scope.PlanTypesSelected.splice(idx, 1);
            }

                // is newly selected
            else
            {
                $scope.PlanTypesSelected.push(plantype);
            }

            $scope.Criteria.PlanTypeIDs = $scope.PlanTypesSelected.map(function (elem) {
                return elem.ID;
            }).join(",");
            $scope.setToFirstPage();
        };
        $scope.toggleObjective = function toggleObjective(Objective) {

            var idx = $scope.ObjectiveSelected.indexOf(Objective);

            // is currently selected
            if (idx > -1)
            {
                $scope.ObjectiveSelected.splice(idx, 1);
            }

                // is newly selected
            else
            {
                $scope.ObjectiveSelected.push(Objective);
            }

            $scope.Criteria.ObjectiveIDs = $scope.ObjectiveSelected.map(function (elem) {
                return elem.ItemId;
            }).join(",");
            $scope.setToFirstPage();
        }
        $scope.toggleBodyPart = function toggleBodyPart(BodyPart) {

            var idx = $scope.BodyPartsSelected.indexOf(BodyPart);

            // is currently selected
            if (idx > -1)
            {
                $scope.BodyPartsSelected.splice(idx, 1);
            }

                // is newly selected
            else
            {
                $scope.BodyPartsSelected.push(BodyPart);
            }

            $scope.Criteria.BodyParts = $scope.BodyPartsSelected.map(function (elem) {
                return elem.ItemId;
            }).join(",");
            $scope.setToFirstPage();
        }
        $scope.toggleFree = function toggleFree(item) {

            var idx = $scope.FreeOrPaidSelected.indexOf(item);

            // is currently selected
            if (idx > -1)
            {
                $scope.FreeOrPaidSelected.splice(idx, 1);
            }

                // is newly selected
            else
            {
                $scope.FreeOrPaidSelected.push(item);
            }
            if ($scope.FreeOrPaidSelected.length === 2)
            {
                // $scope.FreeOrPaidSelected = [];
                $scope.FreeOrPaidSelected.splice(0, 1);
            }
            $scope.Criteria.FreeOrPaid = $scope.FreeOrPaidSelected.map(function (elem) {
                return elem.ID;
            }).join(",");
            $scope.setToFirstPage();
        }

        $scope.toggleCompleteOrDay = function toggleFree(item) {

            var idx = $scope.CompleteOrDaySelected.indexOf(item);

            // is currently selected
            if (idx > -1)
            {
                $scope.CompleteOrDaySelected.splice(idx, 1);
            }
                // is newly selected
            else
            {
                $scope.CompleteOrDaySelected.push(item);
            }

            $scope.Criteria.CompleteOrDay = $scope.CompleteOrDaySelected.map(function (elem) {
                return elem.ID;
            }).join(",");
            $scope.setToFirstPage();
        }
        $scope.SearchWorkoutName = function () {
            $scope.setToFirstPage();
        }
        $scope.toggleSelection = function toggleSelection(Level) {
            
            var idx = $scope.LevelSelected.indexOf(Level); 
            if (idx > -1)
            {
                $scope.LevelSelected.splice(idx, 1);
            }
                // is newly selected
            else
            {
                $scope.LevelSelected.push(Level);
            }

            $scope.Criteria.LevelIDs = $scope.LevelSelected.map(function (elem) {
                return elem.ID;
            }).join(",");
            $scope.setToFirstPage();
        };
        ///////////////////////////////////////////////
        //end toggle functions //////////////////////

        $scope.setToFirstPage = function () {

            $scope.Pagination.CurrentPage = 1;
            $scope.Criteria.Page = $scope.Pagination.CurrentPage;
            $scope.clearFitersShow = true;
            workoutService.setCriteria($scope.Criteria);
             
                
                $scope.SendStoreItemRequest();
            
        };
        $scope.SendStoreItemRequest = function () { 
          //$.blockUI({ message: '<h3>Loading Store Items...</h3>' });
            $scope.storePromise = RESTStoreItems.get({
                LevelIDs: $scope.Criteria.LevelIDs, PlanTypeIDs: $scope.Criteria.PlanTypeIDs
                , ObjectiveIDs: $scope.Criteria.ObjectiveIDs, BodyParts: $scope.Criteria.BodyParts
                , PlanName: $scope.Criteria.PlanName, Isfree: $scope.Criteria.FreeOrPaid
                , DirectoryTypes: $scope.Criteria.CompleteOrDay, page: $scope.Criteria.Page
                ,minWeek:$scope.Criteria.minWeek,maxWeek:$scope.Criteria.maxWeek

            }, function (respond) {
             
                $scope.Workouts = workoutService.ManageWorkouts(respond.storeList);
                workoutService.addWorkoutList($scope.Workouts);
               
                workoutService.addTotalItems(respond.TotalCount);
               $scope.CarObj= ngCart.getCart()
             ///  $.unblockUI();
            });

        }
        $scope.getFilterText = function (item) {
         
            if ($rootScope.currentLanguage() == "en-US")
            {
                return item.text;
            } else
            {
                return item.textAR;
            }
        }

      
        $scope.clearFilters = function () {
            
            $scope.LevelSelected = [];
            $scope.PlanTypesSelected = [];
            $scope.ObjectiveSelected = [];
            $scope.BodyPartsSelected = [];
            $scope.FreeOrPaidSelected = [];
            $scope.CompleteOrDaySelected = [];

            $scope.Criteria =  {
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
            $scope.setToFirstPage();
            $scope.clearFitersShow = false;
        };



    }
]);