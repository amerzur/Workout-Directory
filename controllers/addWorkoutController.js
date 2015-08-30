/////////////////////////////////////////////////////////////
///////////////add workout modal Controller /////////////
///////////////////////////////////////////////////////////

WDApp.controller('addWorkoutCtrl', ["$scope", "$modalInstance", "$http", "WDFactory", "FileUploader","workoutService", "storeItem","scope",

    function ($scope, $modalInstance, $http, WDFactory, FileUploader, workoutService, storeItem, scope) {

      

        $scope.Pagination = {};
        $scope.Pagination.CurrentPage = 1;
        $scope.maxSize = 10;
        $scope.selectedFromList = {};
        $scope.selectedFromList.name = "";

        var addFormDatatoFile = function (fileItem) {
            fileItem.formData.push({ ProductID: $scope.selectedItem.ProductID });
            fileItem.formData.push({ Price: $scope.selectedItem.Price });
           
            fileItem.formData.push({ Video: $scope.selectedItem.Video });
            fileItem.formData.push({ DisplayName: $scope.selectedItem.DisplayName });
            fileItem.formData.push({ ApplicationID: $scope.selectedItem.ApplicationID });
            fileItem.formData.push({ FK_ItemId: $scope.selectedItem.FK_ItemId });
            fileItem.formData.push({ ItemType: $scope.itemType });
            fileItem.formData.push({ Android: $scope.selectedItem.Android });
            fileItem.formData.push({ IOS: $scope.selectedItem.IOS });
            fileItem.formData.push({ WindowsPhone: $scope.selectedItem.WindowsPhone });
            if( $scope.hasImage )
                fileItem.formData.push({ Picture: $scope.selectedItem.Picture });

        }
        //
        //angular uploader object 
        ///
        
        var uploader = $scope.uploader = new FileUploader({
            url: "/DesktopModules/FYWorkoutDirectory/api/WorkoutDirectory/SaveStoreItem",
            queueLimit :1
            
        });
        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        $scope.storeItem = storeItem;
        if (storeItem)
        {
            $scope.selectedItem = {
                ProductID: storeItem.ProductID,
                Price: storeItem.Price,
                Picture: storeItem.Picture,
                Video: storeItem.Video,
                DisplayName: storeItem.DisplayName,
                ApplicationID: storeItem.ApplicationID,
                FK_ItemId: storeItem.FK_ItemId,
                ItemType: storeItem.ItemType,
                Android: "",
                IOS: "",
                WindowsPhone: ""
            }
            $scope.hasImage = true;
            $scope.selectedFromList.name = $scope.selectedItem.ItemType == 1 ? storeItem.WorkoutName : storeItem.ExerciseName;

            
        } else
        {
              $scope.selectedItem = {
            ProductID: "",
            Price: "",
            Picture: "",
            Video: "",
            DisplayName: "",
            ApplicationID: "",
            FK_ItemId: "",
            ItemType: "",
            Android: "",
            IOS: "",
            WindowsPhone: ""

              }
              $scope.hasImage = false;

        }

       
        $scope.switchImage = function () {
           
            $scope.hasImage = !$scope.hasImage;
        }
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);

           
             
           
            
            
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            addFormDatatoFile(item);
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
           

            if ($scope.storeItem)
            {
                var indextToEdit = scope.Workouts.indexOf($scope.storeItem);
                if (indextToEdit > -1)
                    scope.Workouts[indextToEdit] = $scope.selectedItem;
                scope.$apply();
            }
            toastr.success("successfully added to Store !"); 
            $modalInstance.dismiss('cancel');

           
              
              

            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
          
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        // end angular uploader options 
        //
        //////

        $scope.itemType = 2; ///workout plan , 1 for day workout  

        $scope.numLimit = 10;
        $scope.$watch('[Pagination.CurrentPage,itemType]', function (newValues) {
           
            if ($scope.itemType != newValues[1])// check if item type changed .....
                $scope.Pagination.CurrentPage = 1;

            WDFactory.getUsersPlan({ page: $scope.Pagination.CurrentPage, itemType: $scope.itemType }).success(function (data) {
                if ($scope.itemType == 2)
                    $scope.usersPlansList = data;
                else
                    $scope.usersWorkoutsList = data;
                $scope.totalItems = data[0]['TotalCount'];
            })
               .error(function (data) {

                   $scope.errorMes = true;
               });

        });

         
        $scope.setSelectedItem = function (item) {
             
            if ($scope.itemType == 2)
            {
                $scope.selectedItem.FK_ItemId = item.ExercisePlanID;
                $scope.selectedItem.DisplayName = item.Name;
                $scope.selectedFromList.name = item.Name;
                $scope.selectedFromList.CreatedOnDate = item.CreatedOnDate;
                $scope.selectedFromList.Username = item.Username;
            } else if ($scope.itemType == 1)
            {
                $scope.selectedItem.FK_ItemId = item.WorkoutID;
                $scope.selectedItem.DisplayName = item.WorkoutName;
                $scope.selectedFromList.name = item.WorkoutName;
                $scope.selectedFromList.CreatedOnDate = item.CreatedOnDate;
                $scope.selectedFromList.Username = item.Username;
            }


        }
        $scope.removeSelected = function () {
            $scope.selectedFromList = {};
            $scope.selectedFromList.name = "";
            $scope.selectedItem.FK_ItemId = "";
        }
        $scope.cancel = function () {

            $modalInstance.dismiss('cancel');
        };
        $scope.save = function () {
            $scope.selectedItem.ItemType = $scope.itemType;
            
            if ($scope.uploader.queue.length==0)
            {
             $http.post('/DesktopModules/FYWorkoutDirectory/api/WorkoutDirectory/SaveStoreItem2', $scope.selectedItem)
               .success(function (data, status, headers, config) {

                   if ($scope.storeItem)
                   {
                       var indextToEdit = scope.Workouts.indexOf($scope.storeItem);
                       if (indextToEdit > -1)
                           scope.Workouts[indextToEdit] = data;
                       scope.$apply();
                   }
                   toastr.success("successfully added to Store !");
                   $modalInstance.dismiss('cancel');

                  
                 }).
               error(function (data, status, headers, config) {
                   
                });

            } else
            {
                 $scope.uploader.uploadAll();
            }
          
         

            
        }

     
    }]);
