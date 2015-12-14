angular.module('WDApp.Service', [])
 .service('workoutService', function ($rootScope) {
    
    var workoutDetails = {};
    var storeItem = {};
    var workoutList = [];
    var totalWorkoutCount;
    var pageNum = 1;
    var currentTocken = {};
    this.purchsedList = [];
    var updatedStoreItem = {};
  
  var Criteria = {
        LevelIDs: ""
       , PlanTypeIDs: "",
        ObjectiveIDs: "",
        BodyParts: ""
       , PlanName: ""
       , FreeOrPaid: ""
       , CompleteOrDay: ""
       , Page: pageNum
       ,minWeek: 0
      ,maxWeek:20
    };
    var addWorkoutDetails = function (newObj) {
        workoutDetails = newObj;
       
    };
    
    var getWorkoutDetails = function () {
        return workoutDetails;
    }
    var getWorkoutID = function () {
        return workoutDetails.ExercisePlanID;
    }
    var getWorkoutsbyWeeknum = function (week) {
    
        var returnList = []; 
        var dateFrom = workoutDetails.ExpectedStartDateOnly;
        var dateTo = workoutDetails.ExpectedEndDateOnly; 

        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var startDate = new Date(d1[2], d1[0] - 1, d1[1]);   
        var endDate = new Date(d2[2], d2[0] - 1, d2[1]); 
    
        startDate.setDate(startDate.getDate() + (week - 1) * 7)
       var endWeekDate = new Date(startDate.getTime());
       endWeekDate.setDate(endWeekDate.getDate() + 7)
       if (endWeekDate <= endDate)
       {
        angular.forEach(workoutDetails.Workouts, function (value, key) {
            var dc = value.WorkoutDateOnly.split("/")
            var check = new Date(dc[2], dc[1] - 1, dc[0]);
            if (check >= startDate && check < endWeekDate)
            returnList.push(value);
             
        });
 
        returnList = addDaystoWorkouts(returnList);
       }
       

        return returnList;
    }

    var addDaystoWorkouts = function (workoutlist) {
        if (workoutlist.length && workoutlist[0].WorkoutDateOnly)
        {
 var fd = workoutlist[0].WorkoutDateOnly.split("/")
        var firstday = new Date(fd[2], fd[1] - 1, fd[0]);
        var Daynum=1;
        angular.forEach(workoutlist, function (value, key) { 
            var dc = value.WorkoutDateOnly.split("/")
            var check = new Date(dc[2], dc[1] - 1, dc[0]);
            if (check.valueOf() != firstday.valueOf())  
            {
                Daynum++;
                firstday = check;
            }
             workoutlist[key].DayNum = Daynum;   
        });
        return workoutlist;
        }else
        {
            return;
        }
       
    }

    var convertPurchaseItemsToInt = function (purchsedList) {

        var purchasedItems =  purchsedList.map(function (elem) {
            return elem.ProductID;
        }).join(",");  
        this.idsArray = purchasedItems.split(",");

        for (var i = 0; i < this.idsArray.length; i++) { this.idsArray[i] = parseInt(this.idsArray[i], 10); }

        return this.idsArray
    }


    var ManageWorkouts = function (workoutlist) {

        /*to remove redundant prudects with same Prudect id and convert
         the price from string to int
            to detirmin if the user buy any product before or not */


        
        if (this.purchsedList )
            this.idsArray = convertPurchaseItemsToInt(this.purchsedList);
        else 
            this.idsArray="";
            

        var UniqueWorkout = [];
       var temp=workoutlist[0];
       angular.forEach(workoutlist, function (value, key) {
           if (this.idsArray != "")
           {
             if ( this.idsArray.indexOf(value.ProductID) == -1)
                 value.isPurchased = false;
             else
                 value.isPurchased = true;
           } else
           {
               value.isPurchased = false;
           }
           
          

           value.Price = parseInt(value.Price, 10);
            if (value.ProductID != temp.ProductID ||key==0 ) 
                UniqueWorkout.push(value);
             
               temp = value;
        },this);
        return UniqueWorkout;
    }

    var createDaysworkoutList = function (workoutlist) {
        var daylist = [];
        var dayIndex = 0;
        prevday = 1;
        angular.forEach(workoutlist, function (value, key) {
            if (value.DayNum == dayIndex)
                daylist[dayIndex] = value;
        });
    }

    var addWorkoutList = function (workoutlist) {
        workoutList = workoutlist;
    }
    var addTotalItems = function (totalItems) { 
        totalWorkoutCount = totalItems; 
    }
    var getWorkoutList = function () {
        return workoutList;
    }
    var getTotalItems=function() 
    {
        return totalWorkoutCount;
    }
    var setCurrentPage = function (current) {
  
        Criteria.Page = current;
    }
    var getCurrentPage = function () {
        return Criteria.Page;
    }
    var getCriteria = function () {
        return Criteria;
    }
    var setCriteria = function (criteria) {
        Criteria = criteria;
    }
    var setTocken = function (tocken) {
        currentTocken = tocken;
    }
    var getTocken = function () {
        return currentTocken;
    }

   
    var getPurchasedItems = function ( ) {
      return  this.purchsedList  ;
    }
    var setPurchasedItems = function (items) {
        this.purchsedList = items;
    }
    

    return {
        createDaysworkoutList:createDaysworkoutList,
         getWorkoutDetails: getWorkoutDetails,
        addWorkoutDetails: addWorkoutDetails,
        getWorkoutsbyWeeknum: getWorkoutsbyWeeknum,
        getWorkoutID: getWorkoutID,
        ManageWorkouts: ManageWorkouts,
        
        addWorkoutList: addWorkoutList,
        addTotalItems: addTotalItems,
        getWorkoutList: getWorkoutList,
        getTotalItems: getTotalItems,
        getCurrentPage: getCurrentPage,
        setCurrentPage: setCurrentPage,
        getCriteria: getCriteria,
        setCriteria: setCriteria,
        setTocken: setTocken,
        getTocken: getTocken,
        getPurchasedItems: getPurchasedItems,
        setPurchasedItems: setPurchasedItems 
        


     
    };

});