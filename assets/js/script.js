    app = angular.module("newApp", ['ngMaterial','ngRoute','ngAria'])
    .config(function($routeProvider) {
      $routeProvider
      .when("/", {
        templateUrl: "./templates/authenticate.html"
      }) 
      .when("/view", {
        templateUrl: "./templates/home.html"
      }) 
      .when("/create", {
        templateUrl: "./templates/create.html"
      }) 
      .when("/updateAds/:id", {
        templateUrl: "./templates/updAds.html",
        controller: 'updateDoc'
      })
      .when("/archive", {
        templateUrl: "./templates/archive.html"
      });
    }).run(function(){
      console.log("your app is up to date!");
    });
 

 app.controller('PyJWT', function($scope, $http) {

    $scope.passData = function() {    

      var send_data = {
        "email" : $scope.email,
        "password" : $scope.pwd
      }
      
      $http({
        url: 'http://black-widow.remotestaff.com/falcon/auth/01/admin',
        method: 'POST',
        data: send_data
      })
      .then(function(response) {
        if (response.status == 200) {
          $scope.token = response.data.jwt;
          console.log($scope.token);
          // console.log(send_data);

          // Pass Token to falcon
          $http.post("/falcon/authData/",JSON.stringify($scope.token));

          // Get Decoded Data from falcon
          $http.post("/falcon/authData/",JSON.stringify($scope.token)).then(function(result){
            // console.log(result);
            $scope.dataToken = result;
            console.log($scope.dataToken.data.admin_email);
            console.log($scope.email);
            
            if($scope.dataToken.data.admin_email == $scope.email) {

              console.log("Success !!!!");
              // Change Route When Success
              window.location.href = '../jobspec/#!/view'
              alert("Login Success");
            } 

          });

        }
        // console.log("dsfdsfdgf");
      }).catch(function(error) {
        $scope.token = 'unauthorized'
        console.log(error);
        alert("Login Failed");
      });
    }

  });

   //------------------- Retrieve Data ----------------------
   // Display Active Documents
    app.controller('DisplayAllDocs', function($scope, $http, $mdDialog) {
      $http({
            url: "/falcon/viewActiveNew",
            method: "GET"
      })
      .then(function(data){
        $scope.details = data.data;
        console.log($scope.details);
      });

      // Get Choosen Doc ID
      $scope.showAdvanced = function(sent_ID) {
        // console.log(sent_ID);
        $scope.passNewID = {}
        $scope.passNewID.key = ""
        $scope.passNewID = sent_ID;

        $http.get('/falcon/getSelectedDatas/'+$scope.passNewID, JSON.stringify($scope.passNewID));
        $http.get('/falcon/getSelectedDatas/'+$scope.passNewID).then(function(result){
          $scope.selectedDoc = result;
          console.log($scope.passNewID);
          // console.log($scope.selectedDoc);

        $mdDialog.show({
          controller: DialogController,
          templateUrl: './templates/dialogContent.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

        function DialogController($scope, $mdDialog) {
          $scope.SelectedDoc = result.data;
          // console.log($scope.selectedDoc);
          // console.log(result);

          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }
        });
      };

    });

    // Archive
    // Displays Archive Documents
    app.controller('arcList', function($scope,$http,$mdDialog){

      $http({
          url: "/falcon/viewArchive",
          method: "GET"
      })
      .then(function(data){
        $scope.arcList = data.data;
      });

       $scope.showAdvanced = function(sent_ID) {
        // console.log(sent_ID);
        $scope.passNewID = {}
        $scope.passNewID.key = ""
        $scope.passNewID = sent_ID;

        $http.get('/falcon/getSelectedDatas/'+$scope.passNewID, JSON.stringify($scope.passNewID));
        $http.get('/falcon/getSelectedDatas/'+$scope.passNewID).then(function(result){
          $scope.selectedDoc = result;
          console.log($scope.passNewID);
          // console.log($scope.selectedDoc);

        $mdDialog.show({
          controller: DialogController,
          templateUrl: './templates/dialogContent.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });

        function DialogController($scope, $mdDialog) {
          $scope.SelectedDoc = result.data;
          // console.log($scope.selectedDoc);
          // console.log(result);

          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }
        });
      };

    });
    

    
  

  //----------- Create Jobspec ----------------- 
  app.controller('createDoc', function($scope, $http){
     // ------- Toggle Functions ---------
    // Create Jobspec Card
    $scope.toggleJobSpec = function () {
      $scope.jobSpec = !$scope.jobSpec;         
    };
    // Job Details Card
    $scope.toggleJobDetails = function () {
      $scope.jobDetails = !$scope.jobDetails;         
    };
    // Requirements Card
    $scope.toggleReq = function () {
      $scope.Req = !$scope.Req;         
    };
    // Requirements Must Have
    $scope.toggleReqMH = function () {
      $scope.reqMH = !$scope.reqMH;         
    };
    // Requirements Task
    $scope.toggleReqGH = function () {
      $scope.reqGH = !$scope.reqGH;         
    }; 
    // Requirements Task
    $scope.toggleReqTask = function () {
      $scope.reqTask = !$scope.reqTask;         
    };
    // Requirement Skill
    $scope.toggleReqSkill = function () {
      $scope.reqSkill = !$scope.reqSkill;         
    };
    // Responsibilities
    $scope.toggleResp = function () {
      $scope.resp = !$scope.resp;         
    };
    // Duties and Responsibilities
    $scope.toggleDutResp = function () {
      $scope.dutResp = !$scope.dutResp;         
    };
    // Other Desired Preferred Skill
    $scope.toggleOtherDPS = function () {
      $scope.otherDPS = !$scope.otherDPS;         
    };
    // Other Desired Preferred Skill
    $scope.toggleOtherRJInfo= function () {
      $scope.otherRJInfo = !$scope.otherRJInfo;         
    };
    // Manager Info
    $scope.toggleManagerInfo= function () {
      $scope.managerInfo = !$scope.managerInfo;         
    };
     $scope.data = {};
      // Values for Select Fields
      $scope.jobcat = [
        { category: 'A & B', name: 'MYOB' },
        { category: 'A & B', name: 'QuickBooks' },
        { category: 'A & B', name: 'Peachtree' },
        { category: 'A & B', name: 'Oracle' },
        { category: 'A & B', name: 'General Accounting' },
        { category: 'A & B', name: 'SAP' },
        { category: 'A & B', name: 'Bookkeping' },
        { category: 'A & B', name: 'Xero' },
        { category: 'Adm', name: 'Collections Proffesionals' },
        { category: 'Adm', name: 'Data Entry' },
        { category: 'Adm', name: 'Technical Support' },
        { category: 'Adm', name: 'Customer Support' },
        { category: 'Adm', name: 'Recruitment' },
        { category: 'Adm', name: 'Transcription' },
        { category: 'Adm', name: 'Back-Office Admin' },
        { category: 'Adm', name: 'Human Resources' },
        { category: 'Adm', name: 'Legal' },
        { category: 'B A', name: 'Business Analysis' },
        { category: 'B A', name: 'Business Plans' },
        { category: 'B A', name: 'Project Management' },
        { category: 'C S', name: 'Outboubd Surveyors' },
        { category: 'C S', name: 'Chat Support' },
        { category: 'C S', name: 'IT HelpDesk' },
        { category: 'C S', name: 'Technical Support' },
        { category: 'C S', name: 'Phone Support' },
        { category: 'C S', name: 'Email Support' },
        { category: 'D & M', name: 'Print Graphic Designers' },
        { category: 'D & M', name: 'Graphic Design' },
        { category: 'D & M', name: 'Web Design' },
        { category: 'D & M', name: '3D Modelling & CAD' },
        { category: 'D & M', name: 'Video Editing' },
        { category: 'D & M', name: 'Illustration' },
        { category: 'Eng', name: 'Electrical Engineering' },
        { category: 'Eng', name: 'Mechanical Engineering' },
        { category: 'Eng', name: 'Civil Engineering' },
        { category: 'Eng', name: 'Quantity Surveying' },
        { category: 'M D', name: 'iOS Development' },
        { category: 'M D', name: 'Android Development' },
        { category: 'M D', name: 'Windows-Based Platform Development' },
        { category: 'M D', name: 'Cross Platform Development' },
        { category: 'M C S', name: 'French Language Experts' },
        { category: 'M C S', name: 'German Language Experts' },
        { category: 'M C S', name: 'Italian Language Experts' },
        { category: 'M C S', name: 'Portuguese Language Experts' },
        { category: 'M C S', name: 'Spanish Language Experts' },
        { category: 'M C S', name: 'Russian Language Experts' },
        { category: 'M C S', name: 'Cantonese Language Experts' },
        { category: 'M C S', name: 'Hokkien Language Experts' },
        { category: 'M C S', name: 'Mandarin Language Experts' },
        { category: 'M C S', name: 'Nipponggo Language Experts' },
        { category: 'Net', name: 'Microsoft Certified' },
        { category: 'Net', name: 'Network Administration' },
        { category: 'Net', name: 'Cisco Certified ' },
        { category: 'Net', name: 'Database Administration' },
        { category: 'Net', name: 'Network Operations Centre Engineers ' },
        { category: 'Net', name: 'Server Administration' },
        { category: 'Net', name: 'Google Specialists' },
        { category: 'Net', name: 'System Administration' },
        { category: 'Net', name: 'Systems Analysis' },
        { category: 'O T', name: 'English Teachers' },
        { category: 'S & M', name: 'Search Engine Optimization Specialists' },
        { category: 'S & M', name: 'Search Engine Management Specialists' },
        { category: 'S & M', name: 'Inbound Sales' },
        { category: 'S & M', name: 'Outbound Sales ' },
        { category: 'S & M', name: 'Link Building' },
        { category: 'S & M', name: 'Lead Generation' },
        { category: 'S & M', name: 'Social Media Marketing' },
        { category: 'S & M', name: 'Telemarketing' },
        { category: 'S & M', name: 'Internet Marketing' },
        { category: 'S & M', name: 'Lead Mining' },
        { category: 'S & M', name: 'Appointment Setting' },
        { category: 'S & M', name: 'Purchasing Assistants' },
        { category: 'S D', name: '.NET Framework Developers and Programmers' },
        { category: 'S D', name: 'Game Development' },
        { category: 'S D', name: 'Software QA & Testing' },
        { category: 'S D', name: 'C++ Development' },
        { category: 'S D', name: 'C# Development' },
        { category: 'S D', name: 'Java Development' },
        { category: 'S D', name: 'Software Application Development' },
        { category: 'V A', name: 'Marketing Assistance' },
        { category: 'V A', name: 'Personal Assistance' },
        { category: 'V A', name: 'Technical Assistance' },
        { category: 'V A', name: 'Legal Assistance' },
        { category: 'V A', name: 'Financial Assistance' },
        { category: 'V A', name: 'Executive Assistance' },
        { category: 'W D', name: 'PHP Development' },
        { category: 'W D', name: 'Flash Development' },
        { category: 'W D', name: 'Front-End Development' },
        { category: 'W D', name: 'Web QA & Testing' },
        { category: 'W D', name: 'Java Development' },
        { category: 'W D', name: 'Ruby-On-Rails Development' },
        { category: 'W D', name: 'Magento Development' },
        { category: 'W D', name: 'ASP Development' },
        { category: 'W D', name: 'Python Development' },
        { category: 'W D', name: 'Node.JS Development' },
        { category: 'W D', name: 'WordPress Development' },
        { category: 'W D', name: 'Joomla Development' },
        { category: 'W D', name: 'User Interface Designs' },
        { category: 'W D', name: 'Drupal Development' },
        { category: 'Wri', name: 'Web Content and Articles' },
        { category: 'Wri', name: 'Technical and Manual Writing' },
        { category: 'Wri', name: 'Blogging' },
        { category: 'Wri', name: 'Sales and Business Marketing Writers' },
        { category: 'Wri', name: 'SEO Writing' }];

      $scope.jobClass = [
      { name: 'I.T.'},
      { name: 'Non I.T.'}
      ];

      $scope.OM = [
      { name : 'Home Office' },
      { name : 'Office Location' },
      { name : 'Project Based' }
      ];

      $scope.jobComp = [
      { name: 'RemoteStaff Inc.' },
      { name: 'RemoteStaff client' },
      { name: 'Realestate.ph' }
      ];

      $scope.jobStatus = [
      { name: 'New' },
      { name: 'Archive' },
      { name: 'Active' }
      ];

      $scope.jobShowStatus = [
      { name: 'Yes' },
      { name: 'No' }];

    // Job Order Select Tags
    $scope.job_order_level = [
      {name:'Full-Time 9 hrs w/1hr break'},
      {name:'Part Time 4hrs'}
    ];

    $scope.work_status = [
      {name:'Entry (1-3 years)'},
      {name:'Mid Level (3-5 years)'},
      {name:'Expert (More than 5 years)'}
    ];

    // Working Status Values 227 Lines
    $scope.working_time_zone = [
      {name: 'Africa/Johannesburg'},
      {name: 'America/Adak'},
      {name: 'America/Anchorage'},
      {name: 'America/Anguilla'},
      {name: 'America/Antigua'},
      {name: 'America/Araguaina'},
      {name: 'America/Argentina/Buenos_Aires'},
      {name: 'America/Argentina/Catamarca'},
      {name: 'America/Argentina/Cordoba'},
      {name: 'America/Argentina/Jujuy'},
      {name: 'America/Argentina/La_Rioja'},
      {name: 'America/Argentina/Mendoza'},
      {name: 'America/Argentina/Rio_Gallegos'},
      {name: 'America/Argentina/Salta'},
      {name: 'America/Argentina/San_Juan'},
      {name: 'America/Argentina/San_Luis'},
      {name: 'America/Argentina/Tucuman'},
      {name: 'America/Argentina/Ushuaia'},
      {name: 'America/Aruba'},
      {name: 'America/Asuncion'},
      {name: 'America/Atikokan'},
      {name: 'America/Bahia'},
      {name: 'America/Bahia_Banderas'},
      {name: 'America/Barbados'},
      {name: 'America/Belem'},
      {name: 'America/Belize'},
      {name: 'America/Blanc-Sablon'},
      {name: 'America/Boa_Vista'},
      {name: 'America/Bogota'},
      {name: 'America/Boise'},
      {name: 'America/Cambridge_Bay'},
      {name: 'America/Campo_Grande'},
      {name: 'America/Cancun'},
      {name: 'America/Caracas'},
      {name: 'America/Cayenne'},
      {name: 'America/Cayman'},
      {name: 'America/Chicago'},
      {name: 'America/Chihuahua'},
      {name: 'America/Costa_Rica'},
      {name: 'America/Creston'},
      {name: 'America/Cuiaba'},
      {name: 'America/Curacao'},
      {name: 'America/Danmarkshavn'},
      {name: 'America/Dawson'},
      {name: 'America/Dawson_Creek'},
      {name: 'America/Denver'},
      {name: 'America/Detroit'},
      {name: 'America/Dominica'},
      {name: 'America/Edmonton'},
      {name: 'America/Eirunepe'},
      {name: 'America/El_Salvador'},
      {name: 'America/Fortaleza'},
      {name: 'America/Glace_Bay'},
      {name: 'America/Godthab'},
      {name: 'America/Goose_Bay'},
      {name: 'America/Grand_Turk'},
      {name: 'America/Grenada'},
      {name: 'America/Guadeloupe'},
      {name: 'America/Guatemala'},
      {name: 'America/Guayaquil'},
      {name: 'America/Guyana'},
      {name: 'America/Halifax'},
      {name: 'America/Havana'},
      {name: 'America/Hermosillo'},
      {name: 'America/Indiana/Indianapolis'},
      {name: 'America/Indiana/Knox'},
      {name: 'America/Indiana/Marengo'},
      {name: 'America/Indiana/Petersburg'},
      {name: 'America/Indiana/Tell_City'},
      {name: 'America/Indiana/Vevay'},
      {name: 'America/Indiana/Vincennes'},
      {name: 'America/Indiana/Winamac'},
      {name: 'America/Inuvik'},
      {name: 'America/Iqaluit'},
      {name: 'America/Jamaica'},
      {name: 'America/Juneau'},
      {name: 'America/Kentucky/Louisville'},
      {name: 'America/Kentucky/Monticello'},
      {name: 'America/Kralendijk'},
      {name: 'America/La_Paz'},
      {name: 'America/Lima'},
      {name: 'America/Los_Angeles'},
      {name: 'America/Louisville'},
      {name: 'America/Lower_Princes'},
      {name: 'America/Maceio'},
      {name: 'America/Managua'},
      {name: 'America/Manaus'},
      {name: 'America/Marigot'},
      {name: 'America/Martinique'},
      {name: 'America/Matamoros'},
      {name: 'America/Mazatlan'},
      {name: 'America/Menominee'},
      {name: 'America/Merida'},
      {name: 'America/Metlakatla'},
      {name: 'America/Mexico_City'},
      {name: 'America/Miquelon'},
      {name: 'America/Moncton'},
      {name: 'America/Monterrey'},
      {name: 'America/Montevideo'},
      {name: 'America/Montreal'},
      {name: 'America/Montserrat'},
      {name: 'America/Nassau'},
      {name: 'America/New_York'},
      {name: 'America/Nipigon'},
      {name: 'America/Nome'},
      {name: 'America/Noronha'},
      {name: 'America/North_Dakota/Beulah'},
      {name: 'America/North_Dakota/Center'},
      {name: 'America/North_Dakota/New_Salem'},
      {name: 'America/Ojinaga'},
      {name: 'America/Panama'},
      {name: 'America/Pangnirtung'},
      {name: 'America/Paramaribo'},
      {name: 'America/Phoenix'},
      {name: 'America/Port_of_Spain'},
      {name: 'America/Port-au-Prince'},
      {name: 'America/Porto_Velho'},
      {name: 'America/Puerto_Rico'},
      {name: 'America/Rainy_River'},
      {name: 'America/Rankin_Inlet'},
      {name: 'America/Recife'},
      {name: 'America/Regina'},
      {name: 'America/Resolute'},
      {name: 'America/Rio_Branco'},
      {name: 'America/Santa_Isabel'},
      {name: 'America/Santarem'},
      {name: 'America/Santiago'},
      {name: 'America/Santo_Domingo'},
      {name: 'America/Sao_Paulo'},
      {name: 'America/Scoresbysund'},
      {name: 'America/Shiprock'},
      {name: 'America/Sitka'},
      {name: 'America/St_Barthelemy'},
      {name: 'America/St_Johns'},
      {name: 'America/St_Kitts'},
      {name: 'America/St_Lucia'},
      {name: 'America/St_Thomas'},
      {name: 'America/St_Vincent'},
      {name: 'America/Swift_Current'},
      {name: 'America/Tegucigalpa'},
      {name: 'America/Thule'},
      {name: 'America/Thunder_Bay'},
      {name: 'America/Tijuana'},
      {name: 'America/Toronto'},
      {name: 'America/Tortola'},
      {name: 'America/Vancouver'},
      {name: 'America/Whitehorse'},
      {name: 'America/Winnipeg'},
      {name: 'America/Yakutat'},
      {name: 'America/Yellowknife'},
      {name: 'Asia/Bangkok'},
      {name: 'Asia/Kolkata'},
      {name: 'Asia/Manila'},
      {name: 'Asia/Singapore'},
      {name: 'Australia/Adelaide'},
      {name: 'Australia/Brisbane'},
      {name: 'Australia/Broken_Hill'},
      {name: 'Australia/Currie'},
      {name: 'Australia/Darwin'},
      {name: 'Australia/Eucla'},
      {name: 'Australia/Hobart'},
      {name: 'Australia/Lindeman'},
      {name: 'Australia/Lord_Howe'},
      {name: 'Australia/Melbourne'},
      {name: 'Australia/Perth'},
      {name: 'Australia/Queensland'},
      {name: 'Australia/Sydney'},
      {name: 'Europe/Amsterdam'},
      {name: 'Europe/Andorra'},
      {name: 'Europe/Athens'},
      {name: 'Europe/Belgrade'},
      {name: 'Europe/Berlin'},
      {name: 'Europe/Bratislava'},
      {name: 'Europe/Brussels'},
      {name: 'Europe/Bucharest'},
      {name: 'Europe/Budapest'},
      {name: 'Europe/Busingen'},
      {name: 'Europe/Chisinau'},
      {name: 'Europe/Copenhagen'},
      {name: 'Europe/Dublin'},
      {name: 'Europe/Gibraltar'},
      {name: 'Europe/Guernsey'},
      {name: 'Europe/Helsinki'},
      {name: 'Europe/Isle_of_Man'},
      {name: 'Europe/Istanbul'},
      {name: 'Europe/Jersey'},
      {name: 'Europe/Kaliningrad'},
      {name: 'Europe/Kiev'},
      {name: 'Europe/Lisbon'},
      {name: 'Europe/Ljubljana'},
      {name: 'Europe/London'},
      {name: 'Europe/Luxembourg'},
      {name: 'Europe/Madrid'},
      {name: 'Europe/Malta'},
      {name: 'Europe/Mariehamn'},
      {name: 'Europe/Minsk'},
      {name: 'Europe/Monaco'},
      {name: 'Europe/Moscow'},
      {name: 'Europe/Nicosia'},
      {name: 'Europe/Oslo'},
      {name: 'Europe/Paris'},
      {name: 'Europe/Podgorica'},
      {name: 'Europe/Prague'},
      {name: 'Europe/Riga'},
      {name: 'Europe/Rome'},
      {name: 'Europe/Samara'},
      {name: 'Europe/San_Marino'},
      {name: 'Europe/Sarajevo'},
      {name: 'Europe/Simferopol'},
      {name: 'Europe/Skopje'},
      {name: 'Europe/Sofia'},
      {name: 'Europe/Stockholm'},
      {name: 'Europe/Tallinn'},
      {name: 'Europe/Tirane'},
      {name: 'Europe/Uzhgorod'},
      {name: 'Europe/Vaduz'},
      {name: 'Europe/Vatican'},
      {name: 'Europe/Vienna'},
      {name: 'Europe/Vilnius'},
      {name: 'Europe/Volgograd'},
      {name: 'Europe/Warsaw'},
      {name: 'Europe/Zagreb'},
      {name: 'Europe/Zaporozhye'},
      {name: 'Europe/Zurich'},
      {name: 'Pacific/Auckland'},
      {name: 'Pacific/Chatham'},
      {name: 'Pacific/Honolulu'}
    ];

    // Start Working Time Values 48 lines
    $scope.working_start_timeH = [
      {value:1, label:"1"},
      {value:2, label:"2"},
      {value:3, label:"3"},
      {value:4, label:"4"},
      {value:5, label:"5"},
      {value:6, label:"6"},
      {value:7, label:"7"},
      {value:8, label:"8"},
      {value:9, label:"9"},
      {value:10, label:"10"},
      {value:11, label:"11"},
      {value:12, label:"12"},
      {value:13, label: "1"},
      {value:14, label:"2"},
      {value:15, label:"3"},
      {value:16, label:"4"},
      {value:17, label:"5"},
      {value:18, label:"6"},
      {value:19, label:"7"},
      {value:20, label:"8"},
      {value:21, label:"9"},
      {value:22, label:"10"},
      {value:23, label:"11"},
      {value:24, label:"12"}
    ];
    $scope.working_start_timeM = [
      {value: "00AM", label:":00AM"},
      {value: "30AM", label:":30AM"},
      {value: "00PM", label:":00PM"},
      {value: "30PM", label:":30PM"}
      ];

    // End Working Time Values 48 lines
    $scope.working_end_timeH = [
      {value:1, label:"1"},
      {value:2, label:"2"},
      {value:3, label:"3"},
      {value:4, label:"4"},
      {value:5, label:"5"},
      {value:6, label:"6"},
      {value:7, label:"7"},
      {value:8, label:"8"},
      {value:9, label:"9"},
      {value:10, label:"10"},
      {value:11, label:"11"},
      {value:12, label:"12"},
      {value:13, label: "1"},
      {value:14, label:"2"},
      {value:15, label:"3"},
      {value:16, label:"4"},
      {value:17, label:"5"},
      {value:18, label:"6"},
      {value:19, label:"7"},
      {value:20, label:"8"},
      {value:21, label:"9"},
      {value:22, label:"10"},
      {value:23, label:"11"},
      {value:24, label:"12"}
      
    ];
     $scope.working_end_timeM = [
      {value: "00AM", label:":00AM"},
      {value: "30AM", label:":30AM"},
      {value: "00PM", label:":00PM"},
      {value: "30PM", label:":30PM"}
      ];

      $scope.currenZ = [
          "AUD",
          "GBP",
          "USD",
          "CAD",
          "NZD"
      ];
    //  ------ Add/Remove Requirements -------
  $scope.requirementSet = [];
  $scope.requirementSet.requirements = [];
  $scope.addNewRequirement = function() {
    if($scope.Req == true){
      $scope.Req = false;
    }
    $scope.requirementSet.requirements.push('');
  };
  $scope.removeRequirement = function(z) {
    $scope.requirementSet.requirements.splice(z, 1);
  };
  //  ------ Add/Remove Requirements Must Have -------
  $scope.requirementMHSet = [];
  $scope.requirementMHSet.requirementsMH = [];
  $scope.addNewRequirementMH = function() {
    if($scope.reqMH == true){
      $scope.reqMH = false;
    }
    $scope.requirementMHSet.requirementsMH.push('');
  };
  $scope.removeRequirementMH = function(z) {
    $scope.requirementMHSet.requirementsMH.splice(z, 1);
  };
  //  ------ Add/Remove Requirements Good to Have -------
  $scope.requirementGHSet = [];
  $scope.requirementGHSet.requirementsGH = [];
  $scope.addNewRequirementGH = function() {
    if($scope.reqGH == true){
      $scope.reqGH = false;
    }
    $scope.requirementGHSet.requirementsGH.push('');
  };
  $scope.removeRequirementGH = function(z) {
    $scope.requirementGHSet.requirementsGH.splice(z, 1);
  };
  //  ------ Add/Remove Task -------
  $scope.TaskSet = [];
  $scope.TaskSet.tasks = [];
  $scope.addNewTask = function() {
    if($scope.reqTask == true){
      $scope.reqTask = false;
    }
    $scope.TaskSet.tasks.push('');
  };
  $scope.removeTask = function(z) {
    $scope.TaskSet.tasks.splice(z, 1);
  };
  //  ------ Add/Remove Skill -------
  $scope.SkillSet = [];
  $scope.SkillSet.skills = [];
  $scope.addNewSkill = function() {
    if($scope.reqSkill == true){
      $scope.reqSkill = false;
    }
    $scope.SkillSet.skills.push('');
  };
  $scope.removeSkill = function(z) {
    $scope.SkillSet.skills.splice(z, 1);
  };
  //  ------ Add/Remove Responsibility -------
  $scope.ResponsibilitySet = [];
  $scope.ResponsibilitySet.responsibilities = [];
  $scope.addNewResponsibility = function() {
    if($scope.resp == true){
      $scope.resp = false;
    }
    $scope.ResponsibilitySet.responsibilities.push('');
  };
  $scope.removeResponsibility = function(z) {
    $scope.ResponsibilitySet.responsibilities.splice(z, 1);
  };
  //  ------ Add/Remove Duties&Responsibility -------
  $scope.DutySet = [];
  $scope.DutySet.duties = [];
  $scope.addNewDuty = function() {
    if($scope.dutResp == true){
      $scope.dutResp = false;
    }
    $scope.DutySet.duties.push('');
  };
  $scope.removeDuty = function(z) {
    $scope.DutySet.duties.splice(z, 1);
  };
  //  ------ Add/Remove Preferred Skill -------
  $scope.PreferredSkillSet = [];
  $scope.PreferredSkillSet.preferredskills = [];
  $scope.addNewPreferredSkill = function() {
    if($scope.otherDPS == true){
      $scope.otherDPS = false;
    }
    $scope.PreferredSkillSet.preferredskills.push('');
  };
  $scope.removePreferredSkill = function(z) {
    $scope.PreferredSkillSet.preferredskills.splice(z, 1);
  };
   // Start Date Picker
    $scope.startDate = new Date();

      // Job Role
    $scope.jobRoles = [
      { id:1, name: "This Role is required beacuse of increased product or service demand."},
      { id:2, name: "This role  will repelace a post that someone is leaving or has already left."},
      { id:3, name: "This role will support current work or business requirements."},
      { id:4, name: "This role is an experirement to see whether or not the company needs it."},
      { id:5, name: "This role will help the company meet the needs of new products, services, or capabilities."}
    ];

   
    

    // Get all Data Function
    $scope.AddDoc = function(){

    //Job Role Storing Data From Checkbox
      $scope.jobRoleNameArray = [];
      angular.forEach($scope.jobRoles, function(jr){
        if (jr.selected) $scope.jobRoleNameArray.push(jr.name);
      });
      $scope.data.manager_info={};
      $scope.data.questions_to_be_asked={}; 
      $scope.data.work_end_time=[];
      $scope.data.work_start_time=[];
      $scope.data.work_end_time.push($scope.work_endH,$scope.work_endM);
      $scope.data.work_start_time.push($scope.work_startH,$scope.work_startM);
      $scope.data.requirements = $scope.requirementSet.requirements;
      $scope.data.requirements_must_have = $scope.requirementMHSet.requirementsMH;
      $scope.data.requirements_good_to_have = $scope.requirementGHSet.requirementsGH;
      $scope.data.required_tasks = $scope.TaskSet.tasks;
      $scope.data.required_skills = $scope.SkillSet.skills;
      $scope.data.responsibilities = $scope.ResponsibilitySet.responsibilities;
      $scope.data.duties_and_responsibilities = $scope.DutySet.duties;
      $scope.data.ad_job_or_title = $scope.job_title;
      $scope.data.category = $scope.cat;
      $scope.data.classification = $scope.class;
      $scope.data.classification_DESC = "if category is IT or Non-IT";
      $scope.data.company = $scope.comp;
      $scope.data.currency = $scope.currency;
      $scope.data.doc_type = "jobspec";
      $scope.data.heading = $scope.heading;
      $scope.data.heading_DESC = "heading is the  description/Job Summary of the Job Ads";
      $scope.data.is_this_your_first_staff_hire_for_the_job_role = $scope.first_time_hiring;
      $scope.data.job_position = $scope.job_position;
      $scope.data.leads_or_client = $scope.leads;
      $scope.data.level = $scope.JO_level;
      $scope.data.other_desired_preferred_skill = $scope.PreferredSkillSet.preferredskills;
      $scope.data.out_sourcing_model = $scope.O_model;
      $scope.data.out_sourcing_model_DESC = "out_sourcing_model in the Ads is the Work Location";
      $scope.data.quantity = $scope.quantity;
      $scope.data.questions_to_be_asked.first = $scope.question1;
      $scope.data.questions_to_be_asked.second = $scope.question2;
      $scope.data.questions_to_be_asked.third = $scope.question3;
      $scope.data.history = [{}];
      $scope.data.show_status = $scope.jShowStat;
      $scope.data.show_status_DESC = "if will appear in .PH available Jobs";
      $scope.data.special_instructions = $scope.special_instructions;
      $scope.data.start_date = $scope.start_date;
      $scope.data.start_date_DESC = "Client wish or expected starting date of hired candidate";
      $scope.data.status = $scope.jStat;
      $scope.data.tell_more_about_job_order_DESC = "Reason for doing the JobSpec.checkbox in the existing, record only those checked values."
      $scope.data.tell_more_about_job_role = $scope.jobRoleNameArray;
      $scope.data.will_you_provide_training = $scope.training;
      $scope.data.will_the_staff_report_directly_to_you = $scope.report;
      $scope.data.will_the_staff_make_calls = $scope.calls;
      $scope.data.work_status = $scope.JO_work_stat;
      $scope.data.work_time_zone = $scope.timezone;
      $scope.data.manager_info.name = $scope.mngr_fullName;
      $scope.data.manager_info.email = $scope.mngr_email;
      $scope.data.manager_info.contact = $scope.mngr_contact;
      console.log($scope.data);
      $http({
              url: "/falcon/createDoc",
              method: "POST",
              data: $scope.data
      })
      .then(function(response){
        alert("Succesfully Created a Job Advertisement!");
        // console.log("Succesfully Created a Jobspec");
        // location.reload();
      });
    };
  });



  //------------------- Update JobAds ----------------------
  // Populate Fields from Choosen Document
  app.controller('updateDoc', function($scope, $http, $routeParams){

  var currentId = $routeParams.id;
   $scope.passNewID = {}
    $scope.passNewID.key = ""
    $scope.passNewID = currentId;
    // console.log($scope.passNewID);

      $http.get('/falcon/getSelectedDatas/'+$scope.passNewID, JSON.stringify($scope.passNewID));
      $http.get('/falcon/getSelectedDatas/'+$scope.passNewID).then(function(result){
        $scope.selectedDoc = result.data;
        console.log($scope.selectedDoc);
        console.log($scope.selectedDoc.history);

      // ------- Toggle Functions ---------
      // Create Jobspec Card
      $scope.toggleJobSpec = function () {
        $scope.jobSpec = !$scope.jobSpec;         
      };
      // Job Details Card
      $scope.toggleJobDetails = function () {
        $scope.jobDetails = !$scope.jobDetails;         
      };
      // Requirements Card
      $scope.toggleReq = function () {
        $scope.Req = !$scope.Req;         
      };
      // Requirements Must Have
      $scope.toggleReqMH = function () {
        $scope.reqMH = !$scope.reqMH;         
      };
      // Requirements Task
      $scope.toggleReqGH = function () {
        $scope.reqGH = !$scope.reqGH;         
      }; 
      // Requirements Task
      $scope.toggleReqTask = function () {
        $scope.reqTask = !$scope.reqTask;         
      };
      // Requirement Skill
      $scope.toggleReqSkill = function () {
        $scope.reqSkill = !$scope.reqSkill;         
      };
      // Responsibilities
      $scope.toggleResp = function () {
        $scope.resp = !$scope.resp;         
      };
      // Duties and Responsibilities
      $scope.toggleDutResp = function () {
        $scope.dutResp = !$scope.dutResp;         
      };
      // Other Desired Preferred Skill
      $scope.toggleOtherDPS = function () {
        $scope.otherDPS = !$scope.otherDPS;         
      };
      // Other Desired Preferred Skill
      $scope.toggleOtherRJInfo= function () {
        $scope.otherRJInfo = !$scope.otherRJInfo;         
      };
      // Manager Info
      $scope.toggleManagerInfo= function () {
        $scope.managerInfo = !$scope.managerInfo;         
      };

      // $scope.displayDoc = SelectedData;
      // console.log(SelectedData);
      $scope.jobcat = [
        { category: 'A & B', name: 'MYOB' },
        { category: 'A & B', name: 'QuickBooks' },
        { category: 'A & B', name: 'Peachtree' },
        { category: 'A & B', name: 'Oracle' },
        { category: 'A & B', name: 'General Accounting' },
        { category: 'A & B', name: 'SAP' },
        { category: 'A & B', name: 'Bookkeping' },
        { category: 'A & B', name: 'Xero' },
        { category: 'Adm', name: 'Collections Proffesionals' },
        { category: 'Adm', name: 'Data Entry' },
        { category: 'Adm', name: 'Technical Support' },
        { category: 'Adm', name: 'Customer Support' },
        { category: 'Adm', name: 'Recruitment' },
        { category: 'Adm', name: 'Transcription' },
        { category: 'Adm', name: 'Back-Office Admin' },
        { category: 'Adm', name: 'Human Resources' },
        { category: 'Adm', name: 'Legal' },
        { category: 'B A', name: 'Business Analysis' },
        { category: 'B A', name: 'Business Plans' },
        { category: 'B A', name: 'Project Management' },
        { category: 'C S', name: 'Outboubd Surveyors' },
        { category: 'C S', name: 'Chat Support' },
        { category: 'C S', name: 'IT HelpDesk' },
        { category: 'C S', name: 'Technical Support' },
        { category: 'C S', name: 'Phone Support' },
        { category: 'C S', name: 'Email Support' },
        { category: 'D & M', name: 'Print Graphic Designers' },
        { category: 'D & M', name: 'Graphic Design' },
        { category: 'D & M', name: 'Web Design' },
        { category: 'D & M', name: '3D Modelling & CAD' },
        { category: 'D & M', name: 'Video Editing' },
        { category: 'D & M', name: 'Illustration' },
        { category: 'Eng', name: 'Electrical Engineering' },
        { category: 'Eng', name: 'Mechanical Engineering' },
        { category: 'Eng', name: 'Civil Engineering' },
        { category: 'Eng', name: 'Quantity Surveying' },
        { category: 'M D', name: 'iOS Development' },
        { category: 'M D', name: 'Android Development' },
        { category: 'M D', name: 'Windows-Based Platform Development' },
        { category: 'M D', name: 'Cross Platform Development' },
        { category: 'M C S', name: 'French Language Experts' },
        { category: 'M C S', name: 'German Language Experts' },
        { category: 'M C S', name: 'Italian Language Experts' },
        { category: 'M C S', name: 'Portuguese Language Experts' },
        { category: 'M C S', name: 'Spanish Language Experts' },
        { category: 'M C S', name: 'Russian Language Experts' },
        { category: 'M C S', name: 'Cantonese Language Experts' },
        { category: 'M C S', name: 'Hokkien Language Experts' },
        { category: 'M C S', name: 'Mandarin Language Experts' },
        { category: 'M C S', name: 'Nipponggo Language Experts' },
        { category: 'Net', name: 'Microsoft Certified' },
        { category: 'Net', name: 'Network Administration' },
        { category: 'Net', name: 'Cisco Certified ' },
        { category: 'Net', name: 'Database Administration' },
        { category: 'Net', name: 'Network Operations Centre Engineers ' },
        { category: 'Net', name: 'Server Administration' },
        { category: 'Net', name: 'Google Specialists' },
        { category: 'Net', name: 'System Administration' },
        { category: 'Net', name: 'Systems Analysis' },
        { category: 'O T', name: 'English Teachers' },
        { category: 'S & M', name: 'Search Engine Optimization Specialists' },
        { category: 'S & M', name: 'Search Engine Management Specialists' },
        { category: 'S & M', name: 'Inbound Sales' },
        { category: 'S & M', name: 'Outbound Sales ' },
        { category: 'S & M', name: 'Link Building' },
        { category: 'S & M', name: 'Lead Generation' },
        { category: 'S & M', name: 'Social Media Marketing' },
        { category: 'S & M', name: 'Telemarketing' },
        { category: 'S & M', name: 'Internet Marketing' },
        { category: 'S & M', name: 'Lead Mining' },
        { category: 'S & M', name: 'Appointment Setting' },
        { category: 'S & M', name: 'Purchasing Assistants' },
        { category: 'S D', name: '.NET Framework Developers and Programmers' },
        { category: 'S D', name: 'Game Development' },
        { category: 'S D', name: 'Software QA & Testing' },
        { category: 'S D', name: 'C++ Development' },
        { category: 'S D', name: 'C# Development' },
        { category: 'S D', name: 'Java Development' },
        { category: 'S D', name: 'Software Application Development' },
        { category: 'V A', name: 'Marketing Assistance' },
        { category: 'V A', name: 'Personal Assistance' },
        { category: 'V A', name: 'Technical Assistance' },
        { category: 'V A', name: 'Legal Assistance' },
        { category: 'V A', name: 'Financial Assistance' },
        { category: 'V A', name: 'Executive Assistance' },
        { category: 'W D', name: 'PHP Development' },
        { category: 'W D', name: 'Flash Development' },
        { category: 'W D', name: 'Front-End Development' },
        { category: 'W D', name: 'Web QA & Testing' },
        { category: 'W D', name: 'Java Development' },
        { category: 'W D', name: 'Ruby-On-Rails Development' },
        { category: 'W D', name: 'Magento Development' },
        { category: 'W D', name: 'ASP Development' },
        { category: 'W D', name: 'Python Development' },
        { category: 'W D', name: 'Node.JS Development' },
        { category: 'W D', name: 'WordPress Development' },
        { category: 'W D', name: 'Joomla Development' },
        { category: 'W D', name: 'User Interface Designs' },
        { category: 'W D', name: 'Drupal Development' },
        { category: 'Wri', name: 'Web Content and Articles' },
        { category: 'Wri', name: 'Technical and Manual Writing' },
        { category: 'Wri', name: 'Blogging' },
        { category: 'Wri', name: 'Sales and Business Marketing Writers' },
        { category: 'Wri', name: 'SEO Writing' }];

      $scope.jobClass = [
      { name: 'I.T.'},
      { name: 'Non I.T.'}
      ];

      $scope.OModel = [
      { name : 'Home Office' },
      { name : 'Office Location' },
      { name : 'Project Based' }
      ];

      $scope.jobComp = [
      { name: 'RemoteStaff Inc.' },
      { name: 'RemoteStaff client' },
      { name: 'Realestate.ph' }
      ];

      $scope.jobStatus = [
      { name: 'New' },
      { name: 'Archive' },
      { name: 'Active' }
      ];

      $scope.jobShowStatus = [
      { name: 'Yes' },
      { name: 'No' }];


     $scope.reqType = [
        {name:'Beginner'},
        {name:'Intermediate'},
        {name:'Advanced'}
        ];

      $scope.resType = [
        {name:'Beginner'},
        {name:'Intermediate'},
        {name:'Advanced'}
        ];

      // Job Order Select Tags
      $scope.job_order_level = [
        {name:'Full-Time 9 hrs w/1hr break'},
        {name:'Part Time 4hrs'}
      ];

      $scope.work_status = [
        {name:'Entry (1-3 years)'},
        {name:'Mid Level (3-5 years)'},
        {name:'Expert (More than 5 years)'}
      ];

      // Working Status Values 227 Lines
      $scope.working_time_zone = [
        {name: 'Africa/Johannesburg'},
        {name: 'America/Adak'},
        {name: 'America/Anchorage'},
        {name: 'America/Anguilla'},
        {name: 'America/Antigua'},
        {name: 'America/Araguaina'},
        {name: 'America/Argentina/Buenos_Aires'},
        {name: 'America/Argentina/Catamarca'},
        {name: 'America/Argentina/Cordoba'},
        {name: 'America/Argentina/Jujuy'},
        {name: 'America/Argentina/La_Rioja'},
        {name: 'America/Argentina/Mendoza'},
        {name: 'America/Argentina/Rio_Gallegos'},
        {name: 'America/Argentina/Salta'},
        {name: 'America/Argentina/San_Juan'},
        {name: 'America/Argentina/San_Luis'},
        {name: 'America/Argentina/Tucuman'},
        {name: 'America/Argentina/Ushuaia'},
        {name: 'America/Aruba'},
        {name: 'America/Asuncion'},
        {name: 'America/Atikokan'},
        {name: 'America/Bahia'},
        {name: 'America/Bahia_Banderas'},
        {name: 'America/Barbados'},
        {name: 'America/Belem'},
        {name: 'America/Belize'},
        {name: 'America/Blanc-Sablon'},
        {name: 'America/Boa_Vista'},
        {name: 'America/Bogota'},
        {name: 'America/Boise'},
        {name: 'America/Cambridge_Bay'},
        {name: 'America/Campo_Grande'},
        {name: 'America/Cancun'},
        {name: 'America/Caracas'},
        {name: 'America/Cayenne'},
        {name: 'America/Cayman'},
        {name: 'America/Chicago'},
        {name: 'America/Chihuahua'},
        {name: 'America/Costa_Rica'},
        {name: 'America/Creston'},
        {name: 'America/Cuiaba'},
        {name: 'America/Curacao'},
        {name: 'America/Danmarkshavn'},
        {name: 'America/Dawson'},
        {name: 'America/Dawson_Creek'},
        {name: 'America/Denver'},
        {name: 'America/Detroit'},
        {name: 'America/Dominica'},
        {name: 'America/Edmonton'},
        {name: 'America/Eirunepe'},
        {name: 'America/El_Salvador'},
        {name: 'America/Fortaleza'},
        {name: 'America/Glace_Bay'},
        {name: 'America/Godthab'},
        {name: 'America/Goose_Bay'},
        {name: 'America/Grand_Turk'},
        {name: 'America/Grenada'},
        {name: 'America/Guadeloupe'},
        {name: 'America/Guatemala'},
        {name: 'America/Guayaquil'},
        {name: 'America/Guyana'},
        {name: 'America/Halifax'},
        {name: 'America/Havana'},
        {name: 'America/Hermosillo'},
        {name: 'America/Indiana/Indianapolis'},
        {name: 'America/Indiana/Knox'},
        {name: 'America/Indiana/Marengo'},
        {name: 'America/Indiana/Petersburg'},
        {name: 'America/Indiana/Tell_City'},
        {name: 'America/Indiana/Vevay'},
        {name: 'America/Indiana/Vincennes'},
        {name: 'America/Indiana/Winamac'},
        {name: 'America/Inuvik'},
        {name: 'America/Iqaluit'},
        {name: 'America/Jamaica'},
        {name: 'America/Juneau'},
        {name: 'America/Kentucky/Louisville'},
        {name: 'America/Kentucky/Monticello'},
        {name: 'America/Kralendijk'},
        {name: 'America/La_Paz'},
        {name: 'America/Lima'},
        {name: 'America/Los_Angeles'},
        {name: 'America/Louisville'},
        {name: 'America/Lower_Princes'},
        {name: 'America/Maceio'},
        {name: 'America/Managua'},
        {name: 'America/Manaus'},
        {name: 'America/Marigot'},
        {name: 'America/Martinique'},
        {name: 'America/Matamoros'},
        {name: 'America/Mazatlan'},
        {name: 'America/Menominee'},
        {name: 'America/Merida'},
        {name: 'America/Metlakatla'},
        {name: 'America/Mexico_City'},
        {name: 'America/Miquelon'},
        {name: 'America/Moncton'},
        {name: 'America/Monterrey'},
        {name: 'America/Montevideo'},
        {name: 'America/Montreal'},
        {name: 'America/Montserrat'},
        {name: 'America/Nassau'},
        {name: 'America/New_York'},
        {name: 'America/Nipigon'},
        {name: 'America/Nome'},
        {name: 'America/Noronha'},
        {name: 'America/North_Dakota/Beulah'},
        {name: 'America/North_Dakota/Center'},
        {name: 'America/North_Dakota/New_Salem'},
        {name: 'America/Ojinaga'},
        {name: 'America/Panama'},
        {name: 'America/Pangnirtung'},
        {name: 'America/Paramaribo'},
        {name: 'America/Phoenix'},
        {name: 'America/Port_of_Spain'},
        {name: 'America/Port-au-Prince'},
        {name: 'America/Porto_Velho'},
        {name: 'America/Puerto_Rico'},
        {name: 'America/Rainy_River'},
        {name: 'America/Rankin_Inlet'},
        {name: 'America/Recife'},
        {name: 'America/Regina'},
        {name: 'America/Resolute'},
        {name: 'America/Rio_Branco'},
        {name: 'America/Santa_Isabel'},
        {name: 'America/Santarem'},
        {name: 'America/Santiago'},
        {name: 'America/Santo_Domingo'},
        {name: 'America/Sao_Paulo'},
        {name: 'America/Scoresbysund'},
        {name: 'America/Shiprock'},
        {name: 'America/Sitka'},
        {name: 'America/St_Barthelemy'},
        {name: 'America/St_Johns'},
        {name: 'America/St_Kitts'},
        {name: 'America/St_Lucia'},
        {name: 'America/St_Thomas'},
        {name: 'America/St_Vincent'},
        {name: 'America/Swift_Current'},
        {name: 'America/Tegucigalpa'},
        {name: 'America/Thule'},
        {name: 'America/Thunder_Bay'},
        {name: 'America/Tijuana'},
        {name: 'America/Toronto'},
        {name: 'America/Tortola'},
        {name: 'America/Vancouver'},
        {name: 'America/Whitehorse'},
        {name: 'America/Winnipeg'},
        {name: 'America/Yakutat'},
        {name: 'America/Yellowknife'},
        {name: 'Asia/Bangkok'},
        {name: 'Asia/Kolkata'},
        {name: 'Asia/Manila'},
        {name: 'Asia/Singapore'},
        {name: 'Australia/Adelaide'},
        {name: 'Australia/Brisbane'},
        {name: 'Australia/Broken_Hill'},
        {name: 'Australia/Currie'},
        {name: 'Australia/Darwin'},
        {name: 'Australia/Eucla'},
        {name: 'Australia/Hobart'},
        {name: 'Australia/Lindeman'},
        {name: 'Australia/Lord_Howe'},
        {name: 'Australia/Melbourne'},
        {name: 'Australia/Perth'},
        {name: 'Australia/Queensland'},
        {name: 'Australia/Sydney'},
        {name: 'Europe/Amsterdam'},
        {name: 'Europe/Andorra'},
        {name: 'Europe/Athens'},
        {name: 'Europe/Belgrade'},
        {name: 'Europe/Berlin'},
        {name: 'Europe/Bratislava'},
        {name: 'Europe/Brussels'},
        {name: 'Europe/Bucharest'},
        {name: 'Europe/Budapest'},
        {name: 'Europe/Busingen'},
        {name: 'Europe/Chisinau'},
        {name: 'Europe/Copenhagen'},
        {name: 'Europe/Dublin'},
        {name: 'Europe/Gibraltar'},
        {name: 'Europe/Guernsey'},
        {name: 'Europe/Helsinki'},
        {name: 'Europe/Isle_of_Man'},
        {name: 'Europe/Istanbul'},
        {name: 'Europe/Jersey'},
        {name: 'Europe/Kaliningrad'},
        {name: 'Europe/Kiev'},
        {name: 'Europe/Lisbon'},
        {name: 'Europe/Ljubljana'},
        {name: 'Europe/London'},
        {name: 'Europe/Luxembourg'},
        {name: 'Europe/Madrid'},
        {name: 'Europe/Malta'},
        {name: 'Europe/Mariehamn'},
        {name: 'Europe/Minsk'},
        {name: 'Europe/Monaco'},
        {name: 'Europe/Moscow'},
        {name: 'Europe/Nicosia'},
        {name: 'Europe/Oslo'},
        {name: 'Europe/Paris'},
        {name: 'Europe/Podgorica'},
        {name: 'Europe/Prague'},
        {name: 'Europe/Riga'},
        {name: 'Europe/Rome'},
        {name: 'Europe/Samara'},
        {name: 'Europe/San_Marino'},
        {name: 'Europe/Sarajevo'},
        {name: 'Europe/Simferopol'},
        {name: 'Europe/Skopje'},
        {name: 'Europe/Sofia'},
        {name: 'Europe/Stockholm'},
        {name: 'Europe/Tallinn'},
        {name: 'Europe/Tirane'},
        {name: 'Europe/Uzhgorod'},
        {name: 'Europe/Vaduz'},
        {name: 'Europe/Vatican'},
        {name: 'Europe/Vienna'},
        {name: 'Europe/Vilnius'},
        {name: 'Europe/Volgograd'},
        {name: 'Europe/Warsaw'},
        {name: 'Europe/Zagreb'},
        {name: 'Europe/Zaporozhye'},
        {name: 'Europe/Zurich'},
        {name: 'Pacific/Auckland'},
        {name: 'Pacific/Chatham'},
        {name: 'Pacific/Honolulu'}
      ];

      // Start Working Time Values 48 lines
      $scope.working_start_timeH = [
        {value:1, label:"1"},
        {value:2, label:"2"},
        {value:3, label:"3"},
        {value:4, label:"4"},
        {value:5, label:"5"},
        {value:6, label:"6"},
        {value:7, label:"7"},
        {value:8, label:"8"},
        {value:9, label:"9"},
        {value:10, label:"10"},
        {value:11, label:"11"},
        {value:12, label:"12"},
        {value:13, label: "1"},
        {value:14, label:"2"},
        {value:15, label:"3"},
        {value:16, label:"4"},
        {value:17, label:"5"},
        {value:18, label:"6"},
        {value:19, label:"7"},
        {value:20, label:"8"},
        {value:21, label:"9"},
        {value:22, label:"10"},
        {value:23, label:"11"},
        {value:24, label:"12"}
      ];
      $scope.working_start_timeM = [
        {value: "00 AM", label:":00AM"},
        {value: "30 AM", label:":30AM"},
        {value: "00 PM", label:":00PM"},
        {value: "30 PM", label:":30PM"}
        ];

      // End Working Time Values 48 lines
      $scope.working_end_timeH = [
        {value:1, label:"1"},
        {value:2, label:"2"},
        {value:3, label:"3"},
        {value:4, label:"4"},
        {value:5, label:"5"},
        {value:6, label:"6"},
        {value:7, label:"7"},
        {value:8, label:"8"},
        {value:9, label:"9"},
        {value:10, label:"10"},
        {value:11, label:"11"},
        {value:12, label:"12"},
        {value:13, label: "1"},
        {value:14, label:"2"},
        {value:15, label:"3"},
        {value:16, label:"4"},
        {value:17, label:"5"},
        {value:18, label:"6"},
        {value:19, label:"7"},
        {value:20, label:"8"},
        {value:21, label:"9"},
        {value:22, label:"10"},
        {value:23, label:"11"},
        {value:24, label:"12"}
      ];

        $scope.working_end_timeM = [
      {value: "00 AM", label:":00AM"},
      {value: "30 AM", label:":30AM"},
      {value: "00 PM", label:":00PM"},
      {value: "30 PM", label:":30PM"}
      ];

      $scope.currenZ = [
          "AUD",
          "GBP",
          "USD",
          "CAD",
          "NZD"
      ];
      $scope.jobRoles = [
      { id:1, name: "This Role is required beacuse of increased product or service demand."},
      { id:2, name: "This role  will repelace a post that someone is leaving or has already left."},
      { id:3, name: "This role will support current work or business requirements."},
      { id:4, name: "This role is an experirement to see whether or not the company needs it."},
      { id:5, name: "This role will help the company meet the needs of new products, services, or capabilities."}
        ];

      

     //  ------ Add/Remove Requirements -------
     $scope.requirements = [];
      $scope.requirements.data = $scope.selectedDoc.requirements;
      $scope.removeOldrequirements = function(z) {
        
        $scope.requirements.data.splice(z, 1);
      };
  $scope.requirementSet = {};
  $scope.requirementSet.requirements = [];
  $scope.addNewRequirement = function() {
    if($scope.Req == true){
      $scope.Req = false;
    }
    $scope.requirementSet.requirements.push('');
  };
  $scope.removeRequirement = function(z) {
    $scope.requirementSet.requirements.splice(z, 1);
};
     //  ------ Add/Remove Requirements Must Have -------
  $scope.requirements_must_have = [];
  $scope.requirements_must_have.data = $scope.selectedDoc.requirements_must_have;
  $scope.removeOldrequirements_must_have = function(z) {
    
  $scope.requirements_must_have.data.splice(z, 1);
  };
  $scope.requirementMHSet = [];
  $scope.requirementMHSet.requirementsMH = [];
  $scope.addNewRequirementMH = function() {
    if($scope.reqMH == true){
      $scope.reqMH = false;
    }
    $scope.requirementMHSet.requirementsMH.push('');
  };
  $scope.removeRequirementMH = function(z) {
    $scope.requirementMHSet.requirementsMH.splice(z, 1);
  };
  //  ------ Add/Remove Requirements Good to Have -------
  $scope.requirements_good_to_have = [];
  $scope.requirements_good_to_have.data = $scope.selectedDoc.requirements_good_to_have;

      $scope.removeOldrequirements_good_to_have = function(z) {
        $scope.requirements_good_to_have.data.splice(z, 1);
      };
  $scope.requirementGHSet = [];
  $scope.requirementGHSet.requirementsGH = [];
  $scope.addNewRequirementGH = function() {
    if($scope.reqGH == true){
      $scope.reqGH = false;
    }
    $scope.requirementGHSet.requirementsGH.push('');
  };
  $scope.removeRequirementGH = function(z) {
    $scope.requirementGHSet.requirementsGH.splice(z, 1);
  };
   //  ------ Add/Remove Tasks -------
   $scope.required_tasks = [];
      $scope.required_tasks.data = $scope.selectedDoc.required_tasks;

      $scope.removeOldrequired_tasks = function(z) {
        $scope.required_tasks.data.splice(z, 1);
      };
   $scope.TaskSet = [];
  $scope.TaskSet.tasks = [];
  $scope.addNewTask = function() {
    if($scope.reqTask == true){
      $scope.reqTask = false;
    }
    $scope.TaskSet.tasks.push('');
  };
  $scope.removeTask = function(z) {
    $scope.TaskSet.tasks.splice(z, 1);
  };
  //  ------ Add/Remove Skill -------
  $scope.required_skills = [];
      $scope.required_skills.data = $scope.selectedDoc.required_skills;

      $scope.removeOldrequired_skills = function(z) {
        $scope.required_skills.data.splice(z, 1);
      };
  $scope.SkillSet = [];
  $scope.SkillSet.skills = [];
  $scope.addNewSkill = function() {
    if($scope.reqSkill == true){
      $scope.reqSkill = false;
    }
    $scope.SkillSet.skills.push('');
  };
  $scope.removeSkill = function(z) {
    $scope.SkillSet.skills.splice(z, 1);
  };
  //  ------ Add/Remove Responsibility -------
      $scope.responsibilities = [];
      $scope.responsibilities.data = $scope.selectedDoc.responsibilities;

      $scope.removeOldresponsibilities = function(z) {
        $scope.responsibilities.data.splice(z, 1);
      };
  $scope.ResponsibilitySet = [];
  $scope.ResponsibilitySet.responsibilities = [];
  $scope.addNewResponsibility = function() {
    if($scope.resp == true){
      $scope.resp = false;
    }
    $scope.ResponsibilitySet.responsibilities.push('');
  };
  $scope.removeResponsibility = function(z) {
    $scope.ResponsibilitySet.responsibilities.splice(z, 1);
  };

  //  ------ Add/Remove Duties&Responsibility -------
      $scope.duties = [];
      $scope.duties.data = $scope.selectedDoc.duties_and_responsibilities;

      $scope.removeOldDuty = function(z) {
        $scope.duties.data.splice(z, 1);
      };
  $scope.DutySet = [];
  $scope.DutySet.duties = [];
  $scope.addNewDuty = function() {
     if($scope.dutResp == true){
      $scope.dutResp = false;
    }
    $scope.DutySet.duties.push('');
  };
  $scope.removeDuty = function(z) {
    $scope.DutySet.duties.splice(z, 1);
  };
  //  ------ Add/Remove Preferred Skill -------
      $scope.preferredskills = [];
      $scope.preferredskills.data = $scope.selectedDoc.other_desired_preferred_skill;

      $scope.removeOldpreferredskill = function(z) {
        $scope.preferredskills.data.splice(z, 1);
      };
  $scope.PreferredSkillSet = [];
  $scope.PreferredSkillSet.preferredskills = [];
  $scope.addNewPreferredSkill = function() {
    if($scope.otherDPS == true){
      $scope.otherDPS = false;
    }
    $scope.PreferredSkillSet.preferredskills.push('');
  };
  $scope.removePreferredSkill = function(z) {
    $scope.PreferredSkillSet.preferredskills.splice(z, 1);
  }; 
// -----------------------------------UPDATE SCRIPT--------------------------------------------------------------
    $scope.updData ={};
    $scope.updateDocForm = function(){    
      $scope.jobRoleNameArray = [];
      angular.forEach($scope.jobRoles, function(jr){
        if (jr.selected) $scope.jobRoleNameArray.push(jr.name);
      });
        $scope.updData._id = $scope.selectedDoc._id;    
        $scope.updData.requirements = $scope.requirementSet.requirements.concat($scope.requirements.data);
        $scope.updData.requirements_must_have = $scope.requirementMHSet.requirementsMH.concat($scope.requirements_must_have.data);
        $scope.updData.requirements_good_to_have = $scope.requirementGHSet.requirementsGH.concat($scope.requirements_good_to_have.data);
        $scope.updData.required_tasks = $scope.TaskSet.tasks.concat($scope.required_tasks.data);
        $scope.updData.required_skills = $scope.SkillSet.skills.concat($scope.required_skills.data);
        $scope.updData.responsibilities = $scope.ResponsibilitySet.responsibilities.concat($scope.responsibilities.data);
        $scope.updData.duties_and_responsibilities = $scope.DutySet.duties.concat($scope.duties.data);
        $scope.updData.other_desired_preferred_skill = $scope.PreferredSkillSet.preferredskills.concat($scope.preferredskills.data);

        $scope.updData.ad_job_or_title = $scope.selectedDoc.ad_job_or_title;
        $scope.updData.leads_or_client = $scope.selectedDoc.leads_or_client;
        $scope.updData.category = $scope.selectedDoc.category;
        $scope.updData.classification = $scope.selectedDoc.classification;
        $scope.updData.out_sourcing_model = $scope.selectedDoc.out_sourcing_model;
        $scope.updData.company = $scope.selectedDoc.company;
        $scope.updData.currency = $scope.selectedDoc.currency;
        $scope.updData.job_position = $scope.selectedDoc.job_position;
        $scope.updData.heading = $scope.selectedDoc.heading;
        $scope.updData.status = $scope.selectedDoc.status;
        $scope.updData.show_status = $scope.selectedDoc.show_status;
        $scope.updData.quantity = $scope.selectedDoc.quantity;
        $scope.updData.level = $scope.selectedDoc.level;
        $scope.updData.work_time_zone = $scope.selectedDoc.work_time_zone;
        $scope.updData.special_instructions = $scope.selectedDoc.special_instructions;
        $scope.updData.work_status = $scope.selectedDoc.work_status;
        $scope.updData.work_start_time =[]; 
        $scope.updData.work_start_time.push($scope.selectedDoc.work_start_time[0],$scope.selectedDoc.work_start_time[1]);
        $scope.updData.work_end_time =[];
        $scope.updData.work_end_time.push($scope.selectedDoc.work_end_time[0],$scope.selectedDoc.work_end_time[1]);
        $scope.updData.questions_to_be_asked = {};
        $scope.updData.questions_to_be_asked.first = $scope.selectedDoc.questions_to_be_asked.first;
        $scope.updData.questions_to_be_asked.second = $scope.selectedDoc.questions_to_be_asked.second;
        $scope.updData.questions_to_be_asked.third = $scope.selectedDoc.questions_to_be_asked.third;
        $scope.updData.will_you_provide_training = $scope.selectedDoc.will_you_provide_training;
        $scope.updData.will_the_staff_make_calls = $scope.selectedDoc.will_the_staff_make_calls;
        $scope.updData.is_this_your_first_staff_hire_for_the_job_role = $scope.selectedDoc.is_this_your_first_staff_hire_for_the_job_role;
        $scope.updData.will_the_staff_report_directly_to_you = $scope.selectedDoc.will_the_staff_report_directly_to_you;  
        $scope.updData.start_date = $scope.selectedDoc.start_date;      
        $scope.updData.manager_info={};
        $scope.updData.manager_info.name = $scope.selectedDoc.manager_info.name;
        $scope.updData.manager_info.email = $scope.selectedDoc.manager_info.email;
        $scope.updData.manager_info.contact = $scope.selectedDoc.manager_info.contact;
        $http({
            url: '/falcon/update',
            method: "POST",
            data: $scope.updData
        }) 
        .then(function(response){
          alert("Succesfully Updated a Job Advertisement!");
          console.log($scope.updData);
          location.reload();
        }); 
        }
      });
    });

  app.controller('AppCtrl', function($scope, $http) {
    $scope.items = [];
    for (var i = 0; i < 50; i++) {
      $scope.items.push(i);
    }

     $http({
            url: "/falcon/viewActiveNew",
            method: "GET"
      })
      .then(function(data){
        $scope.details = data.data;
        console.log($scope.details);
      });
  });
