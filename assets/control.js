var app = angular.module('control', []);


// NAG-DIDISPLAY
app.controller('myCtrl', function($scope,$http) {
    $http.get("/falcon/things").then(function(data){
      $scope.details = data.data;
      console.log($scope.details);
    });
});

// NAG-DIDISPLAY
app.controller('archiveCtrl', function($scope,$http) {
    $http.get("/falcon/archive").then(function(data){
      $scope.details = data.data;
      console.log($scope.details);
    });
});
    

//NAG-UUPDATE
app.controller('UpdateCtrl', function($scope,$http) {
    $http.get("/falcon/view").then(function(data){
      $scope.details = data.data[4]; 
      console.log(huy ano na);   
    });

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

    $scope.data = {};
	$scope.addNews = function(news){
        console.log($scope.details);
	$scope.data.job_name = $scope.details.ad_job_or_title;
	$scope.data._id = $scope.details._id;	
	$scope.data.leads = $scope.details.leads_or_client;
	$scope.data.category = $scope.details.category;
	$scope.data.classification = $scope.details.classification;
	$scope.data.out_sourcing_model = $scope.details.out_sourcing_model;
	$scope.data.company = $scope.details.company;
	$scope.data.heading = $scope.details.heading;
	$scope.data.status = $scope.details.status;
	$scope.data.show_status = $scope.details.show_status;
	$scope.data.requirements = $scope.details.requirements;
	$scope.data.requirements_must_have = $scope.details.requirements_must_have;
	$scope.data.requirements_good_to_have = $scope.details.requirements_good_to_have;
	$scope.data.responsibilities = $scope.details.responsibilities;
	$scope.data.job_position = $scope.details.job_position;
	$scope.data.quantity = $scope.details.quantity;
	$scope.data.level = $scope.details.level;
    $scope.data.currency = $scope.details.currency;
	$scope.data.working_status = $scope.details.working_status;
	$scope.data.working_time_zone = $scope.details.working_time_zone;
	$scope.data.working_start_time = $scope.details.working_start_time;
	$scope.data.working_end_time = $scope.details.working_end_time;
	$scope.data.required_skills = $scope.details.required_skills;
	$scope.data.required_tasks = $scope.details.required_tasks;
	$scope.data.duties_and_responsibilities = $scope.details.duties_and_responsibilities;

	$scope.data.questions_to_be_asked= {};
    $scope.data.questions_to_be_asked.first = $scope.details.questions_to_be_asked.first;
    $scope.data.questions_to_be_asked.second = $scope.details.questions_to_be_asked.second;
    $scope.data.questions_to_be_asked.third = $scope.details.questions_to_be_asked.third;

	$scope.data.will_you_provide_training = $scope.details.will_you_provide_training;
	$scope.data.will_the_staff_make_calls = $scope.details.will_the_staff_make_calls;
	$scope.data.is_this_your_first_staff_hire_for_the_job_role = $scope.details.is_this_your_first_staff_hire_for_the_job_role;
	$scope.data.will_the_staff_report_directly_to_you = $scope.details.will_the_staff_report_directly_to_you;

	$scope.data.manager_info = {};
    $scope.data.manager_info.name = $scope.details.manager_info.name;
    $scope.data.manager_info.email = $scope.details.manager_info.email;
    $scope.data.manager_info.contact = $scope.details.manager_info.contact;

	$scope.data.job_role = $scope.details.job_role;
	console.log($scope.data);
	$http.post("/falcon/post",($scope.data));
};
});



// NAG-CRECREATE
app.controller('formCtrl', function($scope,$http,$window){
$scope.data = {};
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


$scope.addNews = function(news){
	$scope.data.ad_job_or_title = $scope.job_name;
	$scope.data.leads_or_client = $scope.leads;
    $scope.data.level = $scope.level;
    $scope.data.currency = $scope.currency;
	$scope.data.category = $scope.cat;
	$scope.data.classification = $scope.jobClssfctn;
	$scope.data.out_sourcing_model = $scope.OutSourcingModel;
	$scope.data.company = $scope.company;
	$scope.data.heading = $scope.heading;
	$scope.data.status = $scope.status;
	$scope.data.show_status = $scope.show_status;
    $scope.data.history = [{}];

	$scope.data.requirements = [$scope.requirements];
	$scope.data.requirements_must_have = [$scope.requirements_must_have];
	$scope.data.requirements_good_to_have = [$scope.requirements_good_to_have];
	$scope.data.responsibilities = [$scope.responsibilities];
    $scope.data.job_position = $scope.jobCtgry;
	$scope.data.quantity = $scope.quantity;
	$scope.data.working_status = $scope.working_status;
	$scope.data.working_time_zone = $scope.timezone;
	$scope.data.working_start_time = $scope.start_time;
	$scope.data.working_end_time = $scope.end_time;
	$scope.data.required_skills = [$scope.required_skills];
	$scope.data.required_tasks = [$scope.required_tasks];
	$scope.data.duties_and_responsibilities = [$scope.duties_and_responsibilities];
	$scope.data.will_you_provide_training = $scope.training;
	$scope.data.will_the_staff_make_calls = $scope.calls;
	$scope.data.is_this_your_first_staff_hire_for_the_job_role = $scope.first_time_hiring;
	$scope.data.will_the_staff_report_directly_to_you = $scope.report_to_you;
	$scope.data.manager_info={};
    $scope.data.manager_info.name = $scope.mngr_name;
    $scope.data.manager_info.email = $scope.email;
    $scope.data.manager_info.contact = $scope.contact;
	$scope.data.job_role = $scope.job_role;
	$scope.data.questions_to_be_asked={};
    $scope.data.questions_to_be_asked.first = $scope.question1;
    $scope.data.questions_to_be_asked.second = $scope.question2;
    $scope.data.questions_to_be_asked.third = $scope.question3;
	$scope.data.doc_type = "jobspec";
	$window.location.href = "index.html";
	console.log($scope.data);
	// console.log(JSON.stringify($scope.data));

    $http.post("/falcon/create",($scope.data));

	 // });
};
});
