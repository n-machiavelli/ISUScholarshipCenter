(function(){
	'use strict';

angular
	.module('isuscholarshipcenter')
	.controller('SearchController',SearchController);
	//LoginController.$inject=['$firebase','localStorageService'];
	SearchController.$inject=['searchService', '$log','$location', 'DSCacheFactory','$state'];  //removed authservice

function SearchController(searchService,  $log,$location, DSCacheFactory,$state){
        var vm = this;
        vm.activate = activate;
        vm.spinnerdisplay = "hideme";
        vm.message = "";
        vm.searchString = "";
        vm.errorFlag = false;
        vm.getScholarships = getScholarships;
        //vm.toggleFavorite = toggleFavorite;
        vm.scholarships = [];
        vm.myApplications = [];
        vm.colleges=[
        {FUND_COLL_ATTRB: "01",FUND_COLL_DESCR: "Applied Science and Technology"},
        {FUND_COLL_ATTRB: "02",FUND_COLL_DESCR: "Arts and Sciences"},
        {FUND_COLL_ATTRB: "03",FUND_COLL_DESCR: "Business"},
        {FUND_COLL_ATTRB: "04",FUND_COLL_DESCR: "Education"},
        {FUND_COLL_ATTRB: "05",FUND_COLL_DESCR: "Fine Arts"},
        {FUND_COLL_ATTRB: "07",FUND_COLL_DESCR: "Mennonite College of Nursing"}    
        ]
        //vm.authentication = authService.authentication;
        //vm.isAuthorized = authService.authentication.isAuth;  //need this also in this ctrlr for use in displaying fav star
        /* convert t0 $state.
        if ($routeParams !== undefined && $routeParams !== null && $routeParams.collegecode !== undefined) {
            vm.college = $routeParams.collegecode;
            vm.collegename = $routeParams.collegename;
            if (vm.collegename.indexOf("College") == -1) {
                vm.collegename = "College of " + $routeParams.collegename;
            }
            getScholarships();
        } else if ($routeParams !== undefined && $routeParams !== null && $routeParams.favorites !== undefined && $routeParams.favorites == 'favorites') {
            vm.collegename = "Favorites";
            getFavoriteScholarships();
        } else if ($routeParams !== undefined && $routeParams !== null && $routeParams.myapplications !== undefined && $routeParams.myapplications == 'myapplications') {
            vm.collegename = "My Applications";
            getMyApplications();
        } else {
            activate();
        }
        */
        function activate() {
            var promise = searchService.getDropDowns();
            promise.then(function (data) {
                vm.majors = data.majors;
                //console.log(vm.majors);
                vm.colleges = data.colleges;
                vm.departments = data.departments;
                vm.schoolyears = data.schoolyears;
            }, function (reason) {
                $log.error(reason);
                vm.message = "Unable to connect to the database. Please confirm connectivity and then refresh.";
                vm.errorFlag = true;
            }, function (update) {
                $log.log("got notification" + update);
            });

        }
        function getScholarships() {
            console.log("in get scholarships");
            $log.log("controller title:" + vm.title);
            vm.spinnerdisplay = "showme";
            var promise = searchService.getScholarships(vm);
            promise.then(function (results) {
                $log.log("scholarships retrieved via controller");
                vm.scholarships = results;
                vm.searchString = getSearchString(results.length);
                $log.log(vm.searchString);
                $log.log(vm.scholarships);
                vm.spinnerdisplay = "hideme";
            }, function (err) {
                $log.error("error here");
                vm.spinnerdisplay = "hideme";
            }, function (update) {
                $log.log("update here");
                vm.spinnerdisplay = "hideme";
            });
        }
        function getSearchString(num) {
            var search = "";
            var title = checkNull(vm.title);
            var department = checkNull(vm.department);
            var college = getCollegeString();
            //var schoolyear = getSchoolYearString();
            var major = checkNull(vm.major);
            var undergradGPA = checkNull(vm.undergradGPA);
            var gradGPA = checkNull(vm.gradGPA);
            var highschoolGPA = checkNull(vm.highschoolGPA);
            var keyword = checkNull(vm.keyword);
            if (title != "") search += (title + ",");
            if (department != "") search += (department + ",");
            if (college != "") search += (college + ",");
            //if (schoolyear != "") search += (schoolyear + ",");
            if (major != "") search += (major + ",");
            if (undergradGPA != "") search += (undergradGPA + ",");
            if (gradGPA != "") search += (gradGPA + ",");
            if (highschoolGPA != "") search += (highschoolGPA + ",");
            if (keyword != "") search += (keyword + ",");
            search = search.substring(0, search.length - 1);
            if (search==null || search==""){
                search="Your search results for \"No parameters\" below...";
            }else{
                search = "Your search results for \"" + search + "\" below...";
            }
            if (num == null || num === undefined || num == 0) search = "No search results for \"" + search + "\"";
            return search;
        }
        function checkNull(strg) {
            return ((strg == null || strg == "-1" || strg == "" || strg==undefined) ? "" : strg);
        }
        function getCollegeString() {
            for (var i = 0; i < vm.colleges.length; i++) {
                if (vm.colleges[i].FUND_COLL_ATTRB == vm.college) {
                    return vm.colleges[i].FUND_COLL_DESCR;
                }
            }
            return "";
        }                
}
})();