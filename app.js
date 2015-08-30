var WDApp = angular.module("WDApp", ["ui.router", "pascalprecht.translate", "mgcrea.ngStrap", "ngDialog",
    "ngCart", "ui.bootstrap", "ngResource", "ui-rangeSlider", "cgBusy", "seo", "angularFileUpload"]);


WDApp.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider) {
    $stateProvider
        .state("Home", {
             url: "/Home",
           templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/Home.html"

         })
        .state("CompletePlans", {
            url: "/CompletePlans",
            templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/CompletePlans.html"
            
        }) 
     .state('WorkoutDetails', {
         
         url: '/WorkoutDetails/:workoutID/:planTypeID ',
         templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/WorkoutDetails.html",
         cache:true
         
     })
         .state('WorkoutDetails.mian', {

             url: '/workoutMain ',
             templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/WorkoutDetails-main.html" 

         })
        .state('WorkoutDetails.list', {

            url: '/WorkoutDetailsList/:weekID ',
            templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/WorkoutDetailsList.html"

        })
    //.state('WorkoutDetailsList', {
    //    url: '/WorkoutDetailsList/:weekID ',
    //    templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/WorkoutDetailsList.html"
         

    //})
    .state('cartDetails', {
        url: '/cartDetails',
        templateUrl:"DesktopModules/FYWorkoutDirectory/app/views/CartDetails.html"
    })
    .state('billing', {
        url: '/billing',
        templateUrl:"DesktopModules/FYWorkoutDirectory/app/views/BillingForm.html"
    })
    .state('PaymentStatus', {
        url: '/paymentStatus/:Token',
        templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/PaymentStatus.html"
    })
    .state('purchaseItems', {
        url: '/purchaseItems',
        templateUrl: "DesktopModules/FYWorkoutDirectory/app/views/PurchaseItems.html"
    })
    ;

    // catch all route
    // send users to the transformMe page 
    $urlRouterProvider.otherwise("/Home");
     
     

    //translation
    $translateProvider.translations("en-US", {
        home: "Home",
        back:"BACK TO LIST",
        cartSummary: "Cart summary",
        searchForWorkout: "Search for Workout :",
        byLevel: "By Level",
        byPlanType: "By Plan Type",
        objectives: "objectives",
        freeOrPaid: "free Or Paid",
        completePlans: "full Plans or day Workouts",
        bodyParts: "Body Parts",
        cardView: "Card View",
        listView: "List View",
        chooseWorkout: "Choose Workout",
        addToCart: " add to cart ",
        buy: "Buy",
        name: "Name",
        price: "Price",
        addToAccount: "Add Workout",
        resetPlan:"Rest Plan",
        noWorkouts: "No Workouts",
        foundForSearch: "Found For your search ",
        week: "Week",
        numberDaysWeek: "Number Of Days Per Week:",
        numberWorkoutDay: "Number Of Workouts Per Day:",
        numberWeek: "Number Of  Weeks:",
        howTo: "How To",
        sets: "Sets",
        reps: "Reps",
        rest: "Rest",
        day: "Day",
        workoutnum: "Workout ",
        Cardio: "Cardio Exercise {{value}}",
        Circuit: "Circuit Exercise {{value}}",
        HIIT: "HIIT: ",
        Warmup: "Warmup  {{value}}",
        Low: "Low 3 {{value}}",
        High: "High {{value}}",
        CoolDown: "Cool Down {{value}}",
        Weight: "Weight Exercise  {{value}}",
        Exercise: "Exercise",
        time: "time",
        cartDetails: "Cart Details",
        cartEmpty: "Your cart is empty",
        price: "Price",
        checkout: "Checkout",
        clearCart: "Clear Cart?",
        emptyCart: "now all the cart are empty ",
        undo: "Undo ?",
        paymentStatus: "Payment status page",
        Success: "Success ",
        workoutsAdded: "your workouts have been added , an Email sent to your Account.",
        Error: "Error! ",
        transactionNotCompleted: " The transaction is not Completed.",
        PurchasedItems: "Purchased Items .",
        clickToReset: "Reset",
        areYouSureToReapply: " Are you sure to reapply this plan to your plans?",
        addWorkout: "Add Workout",
        youBoughtItem: "you are allready bought this item"
        , clearFilters: "Clear Search Fiters ?"
        , PaymentTerms: "Our General Terms and Conditions are applied, which you can find at fitnessyard.com website. Your subscription will be automatically renewed. Any membership fees will be automatically charged from your credit card or through your bank account. You can cancel your subscription at any time by visiting billing information page or send us an e-mail tosupport@fitnessyard.com. Your membership will then automatically end after the contract period, so you will never be charged again."
, intensityLevel: "Intensity Level",
mainGoal: "Main Goal",
duration: "Duration",
Specification: "Specification"
    });
    $translateProvider.translations("ar-JO", {
        home: "الرئيسية",
        back:"رجوع",
        cartSummary: "مجموع السلة",
        searchForWorkout: "ابحث عن تمرين",
        byLevel: " المستوى",
        byPlanType: "نوع الخطة",
        objectives: "الاهداف",
        freeOrPaid: "مجانا او للبيع",
        completePlans: "خطة كاملة او ليوم واحد",
        bodyParts: "اجزاء الجسم",
        cardView: " بطاقات",
        listView: "لائحة",
        chooseWorkout: "اختر تمرين",
        addToCart: "(اضف لسلة الشراء)",
        buy: "شراء",
        name: "الاسم",
        price: "السعر",
        addToAccount: "اضف الى حسابي",
        resetPlan:"محو الاعدادات",
        noWorkouts: "لايوجد تمارين تطابق بحثك",
        foundForSearch: "",
        week: "الاسبوع",
        numberDaysWeek: "عدد الايام في الاسبوع",
        numberWorkoutDay: "عدد التمارين في اليوم",
        numberWeek: "عدد الاسابيع",
        howTo: "كيف ؟",
        sets: "دورة",
        reps: "مرة",
        rest: "راحة",
        day: "اليوم",
        workoutnum: "التمرين  ",
        Cardio: "{{value}}  تمرين كارديو ",
        Circuit: "  {{value}}تمرين دائري ",
        HIIT: "هيت: ",
        Warmup: "{{value}} التسخين رقم",
        Low: "{{value}} منخفظ رقم",
        High: "{{value}}  عالي رقم",
        CoolDown: "{{value}} الاستراحه",
        Weight: "  {{value}}تمرين الوزن",
        Exercise: "تدريب",
        time: "الوقت",
        cartDetails: "تفاصيل سلة الشراء",
        cartEmpty: "سلة شرائك فارغة",
        price: "السعر",
        checkout: "دفع",
        clearCart: "تفريغ السلة ؟",
        emptyCart: "سلة الشراءالان اصبحت فارغة",
        undo: "تراجع ؟",
        paymentStatus: "حالة الشراء",
        Success: "تم بنجاح",
        workoutsAdded: "اضافة التمارين الى حسابك الشخصي ,تم ارسال ايميل لحسابك ",
        Error: "!خطأ",
        transactionNotCompleted: "عملية الشراء لم تكتمل ",
        PurchasedItems: "مشتراياتك",
        clickToReset: "اضغط لمحو اعداداتك",
        areYouSureToReapply: "هل انت متاكد لمحو كل اعداداتك لهذا الجدول ؟ ",
        addWorkout: "اضف تدريب",
        youBoughtItem: "لقد اشتريت هذا المنتج من قبل",
        clearFilters:"ازاله كل خيارات البحث ؟"
        , PaymentTerms: ""
        , intensityLevel: " درجة الشدة",
        mainGoal: "الهدف الرئيسي"
        , duration: "المدة",
        Specification: "المواصفات"

    });
   $translateProvider.preferredLanguage($("#hdn_tm_culture").val());
      
   
});
WDApp.config(function ($locationProvider, $httpProvider)
{
    //Add Prefix to the URL Hash for Search Engines
    $locationProvider.hashPrefix('!');

    var $http,
              interceptor = ['$q', '$injector', function ($q, $injector) {
                  var error;
                  function success(response) {
                      $http = $http || $injector.get('$http');
                      var $timeout = $injector.get('$timeout');
                      var $rootScope = $injector.get('$rootScope');
                      if ($http.pendingRequests.length < 1)
                      {
                          $timeout(function () {
                              if ($http.pendingRequests.length < 1)
                              {
                                  $rootScope.htmlReady();
                              }
                          }, 700);//an 0.7 seconds safety interval, if there are no requests for 0.7 seconds, it means that the app is through rendering
                      }
                      return response;
                  }

                  function error(response) {
                      $http = $http || $injector.get('$http');

                      return $q.reject(response);
                  }

                  return function (promise) {
                      return promise.then(success, error);
                  }
              }];


    $httpProvider.interceptors.push(interceptor);
}
);

WDApp.run(function ($rootScope) {
    $('head').append('<meta name="fragment" content="!" />');
    $rootScope.Level = [{ text: "Beginner",textAR:"مبتدأ", ID: "1" }, { text: "Intermediate",textAR:"متوسط", ID: "2" }, { text: "Advance",textAR:"متقدم", ID: "3" }];
    $rootScope.PlanTypes = [{ text: "Body Weight", textAR: "وزن الجسم", ID: "1" }, { text: "Machines and Free Wieght", textAR: "الات و بدون وزن", ID: "2" }, { text: "Machines Only ", textAR: "فقط الات", ID: "3" }, { text: "Cardio Only", textAR: "فقط كارديو", ID: "4" }];
    $rootScope.CompleteOrDay = [ { text: "Day Workouts ", textAR: "تمرين ليوم واحد", ID: "1" },{ text: "Complete Plans", textAR: "خطة كاملة", ID: "2" }];
    $rootScope.FreeOrPaid = [{ text: "Free", textAR: "مجانا", ID: "1" }, { text: "Paid", textAR: "للشراء", ID: "0" }];
    $rootScope.currentLanguage = function () { return $("#hdn_tm_culture").val(); }
    $rootScope.UserID = function () { return $("#hdn_tm_usrid").val(); }
    $rootScope.FacebookUrl = function () { return $("#hdn_tm_Url").val(); }
})

