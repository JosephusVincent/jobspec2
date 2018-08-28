    app = angular.module("newApp", ['ngMaterial', 'ngRoute']).run(function(){
    	console.log("newApp is running!");
    });

    // var app = angular.module("newApp", ['ngRoute']);
    // app.run(function(){
    //     console.log("newApp is running!");
    // });

    app.controller('btnLinks', function(){
       
    });

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./home.html"
            }) 
            .when("/create", {
                templateUrl: "./create.html"
            })
            .when("/updateAds", {
                templateUrl : "./updateAd.html"
            });
    });


// var app = angular.module("newApp", ["ngRoute"]);

// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "home.html.txt"
//     })
//     .when("/updateAds", {
//         templateUrl : "updateAd.html"
//     })
//     .when("/green", {
//         templateUrl : "green.htm"
//     })
//     .when("/blue", {
//         templateUrl : "blue.htm"
//     });

//     console.log('waaat')
// });


    //-------------------Update JobAds --------------------

    // Category Controller
    app.controller('SelectCategory', function($scope) {
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
      { category: 'Wri', name: 'SEO Writing' }
      ];
    });

    // Classification Controller
    app.controller('SelectClass', function($scope) {
        $scope.jobClass = [
        { name: 'I.T.'},
        { name: 'Non I.T.'}];
    });

    // Outsourcing Controller
    app.controller('SelectOModel', function($scope) {
        $scope.OM = [
        { name : 'Home Office' },
        { name : 'Office Location' },
        { name : 'Project Based' }];
    });

    // Company Controller
    app.controller('SelectCompany', function($scope) {
        $scope.jobComp = [
        { name: 'RemoteStaff Inc.' },
        { name: 'RemoteStaff client' },
        { name: 'Realestate.ph' }
        ];
    });

    // Status Controller
    app.controller('SelectStatus', function($scope) {
        $scope.jobStatus = [
        { name: 'New' },
        { name: 'Archive' },
        { name: 'Active' }];
    });

    // Show Status Controller
    app.controller('SelectShowStatus', function($scope) {
        $scope.jobShowStatus = [
        { name: 'Yes' },
        { name: 'No' }];
    });

    // Dialog button
    app.controller('dialogCtrl', function($scope, $mdDialog){
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showPrompt = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
        .title('Add Requirements')
        .textContent('')
        .placeholder('Requirement\'s Name ')
        .ariaLabel('Dog name')
        .initialValue('')
        .targetEvent(ev)
        .required(true)
        .ok('OK')
        .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            $scope.status = result;
            }, function() {
              $scope.status = 'You didn\'t name your dog.';
          });
        };
    });

    // <!-- Responsibilities Card -->
    //     <md-card id="resAd" ng-controller="dialogCtrl">
    //         <md-card-title>
    //             <md-card-title-text layout-align=" center">
    //                 <span class="md-headline">Responsibilities</span>
    //             </md-card-title-text>
    //             <md-button class="md-raised" ng-click="showPrompt($event)"><i class="far fa-plus-square" ></i>Add Responsibility</md-button>
    //         </md-card-title>
    //         <md-card-content>
    //             <div layout="column">
    //                 <div ng-if="status" id="status">
    //                     <b layout="row" layout-align="center center" class="md-padding">
    //                         {{status}}
    //                     </b>
    //                 </div>
    //             </div>
    //         </md-card-content>
    //     </md-card>

    // tinymce.init({selector:'textarea',
    //     plugins: "code image"
    // });


    // Responsibilities Card Fieldset
    // Add Column 
    // app.controller('resAd', function($scope){
    // });

    // Requirements Card Fieldset
    // Add Column 
    app.controller('reqAd', function($scope){
        $scope.reqType = [
            {name:'Beginner'},
            {name:'Intermediate'},
            {name:'Advanced'}
        ];

        $scope.columns = [{
            colId: 'col1', 
            name:'',
            dataType:[]
        }];

        $scope.addNewColumn = function() {
            var newItemNo = $scope.columns.length+1;
                $scope.columns.push(newItemNo);
        };

        // Remove Column
        $scope.removeColumn = function(index) {
            // remove the row specified in index
            $scope.columns.splice( index, 1);
            // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
            alert('no rec');
                $scope.columns.push = [{"colId":"col1"}];
            }
        };
    });

    // Responsibilities Exercise
    // app.controller('resAd', function($scope) {
    //   $scope.clearValue = function() {
    //     $scope.quest = undefined;
    //     $scope.favoriteColor = undefined;
    //     $scope.myForm.$setPristine();
    //   };
    //   $scope.save = function() {
    //     if ($scope.myForm.$valid) {
    //       $scope.myForm.$setSubmitted();
    //       alert('Form was valid.');
    //     } else {
    //       alert('Form was invalid!');
    //     }
    //   };
    // });

    // Responsibilities Card Fields
    app.controller('resAd', function($scope) {
        $scope.resType = [
            {name:'Beginner'},
            {name:'Intermediate'},
            {name:'Advanced'}
        ];

        $scope.columns = [{
            colId: 'col1', 
            name:'',
            dataType:[]
        }];

        $scope.addNewColumn = function() {
            var newItemNo = $scope.columns.length+1;
                $scope.columns.push(newItemNo);
        };

        // Remove Column
        $scope.removeColumn = function(index) {
            // remove the row specified in index
            $scope.columns.splice( index, 1);
            // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
            alert('no rec');
                $scope.columns.push = [{"colId":"col1"}];
            }
        };
    });
    
    // History Card Feildset
    // Add Column
    app.controller('MainCtrl', function($scope) {
    //  $scope.dataType = ['type1', 'type2', 'type'];
    $scope.dataType = [
        {id: 1, colId:['col1', 'col4'], dataTypeName: 'Date'},
        {id: 2, colId:['col2', 'col3'], dataTypeName: 'Alpha'},
        {id: 3, colId:['col5', 'col6', 'col7', 'col8'], dataTypeName: 'List Value'}
        ];

    $scope.columns = [{colId: 'col1', name:'', dataType:[], dataFormat:'',  excludedChar:'', maxLength:'', isKeyField:false, isKeyRequired:false }];

    $scope.addNewColumn = function() {
        var newItemNo = $scope.columns.length+1;
            $scope.columns.push({'colId':'col'+newItemNo});
        };

    $scope.removeColumn = function(index) {
        // remove the row specified in index
        $scope.columns.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( $scope.columns.length() === 0 || $scope.columns.length() == null){
          alert('no rec');
          $scope.columns.push = [{"colId":"col1"}];
        }
        };
    });

