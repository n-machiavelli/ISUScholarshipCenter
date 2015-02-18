angular.module('isuscholarshipcenter.controllers', [])

.controller('AccountCtrl',["$scope","$ionicPopup","User","DSCacheFactory", function($scope,$ionicPopup, User,DSCacheFactory) {
  //$scope.user=User.getUser(); //retrieve the user object for $scope.user to use in ng-show
    self.staticCache = DSCacheFactory.get("staticCache"); 
    $scope.user=self.staticCache.get("user");    
  $scope.login=function(){
    User.login($scope.user.email, $scope.user.password, function(res){
      if (res.id){
        $scope.user=res;
      }else{
        $ionicPopup.alert({   //ionicPopup is ionic's version of JS alert()
          title: 'Login error!',
          template: res.message
        });
      }
    });
  };
  $scope.register=function(){
    User.register($scope.user.email, $scope.user.password, function(res){
      if (res.id){
        $scope.user=res;
      }else{
        $ionicPopup.alert({
          title: "Register Error!",
          template: res.message
        });
      }
    });
  };
  $scope.logout=function(){
    User.logout();
    $scope.user={};
  };
}])

.controller('UserCtrl',["$scope","User","DSCacheFactory", function($scope, User,DSCacheFactory) {
    self.staticCache = DSCacheFactory.get("staticCache"); 
    $scope.user=self.staticCache.get("user");    
  //$scope.user=User.getUser(); //retrieve the user object for $scope.user to use in ng-show
  console.log($scope.user);
}])

.controller('TrendingVideosCtrl', function ($scope,$stateParams,$ionicModal,$sce,VideosService,LikeService,DSCacheFactory) {
    $scope.navTitle = "Laffportal Videos";
    self.staticCache=DSCacheFactory.get("staticCache");
    $scope.user=self.staticCache.get("user");
    VideosService.getVideos().then(function(data){
        $scope.videos=data;
        console.log($scope.videos);
    }).finally(function(){
            console.log("now here");
    });   

    //$scope.myvideo={"previewUrl":"http://vimeo.com/96773196","kind":"vimeo","trackName":$stateParams.articleID,"artistName":"i go die"};
        $scope.checkMedia = function(item) {
            console.log("URL " + item.video_url + " " + item.kind);
            if (item.kind==='song' || item.kind==='music-video' || item.kind==='vimeo') {
                $scope.openPlayModal(item);
                $scope.infoTxt = null;
            }
            else $scope.infoTxt = 'No suitable player available for the selected media type.'

        };

        $ionicModal.fromTemplateUrl('templates/playModal.html', function(modal) {
            $scope.playModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.openPlayModal = function(item) {
            $scope.url = item.video_url;
            //$scope.url="http://vimeo.com/96773196";
            var valu=$sce.trustAsResourceUrl($scope.url);
            $scope.url=valu;
            $scope.kind=item.kind;
            if  (item.video_name != null) $scope.title = item.video_name
            else $scope.title = item.video_name;

            $scope.kind = item.kind;
            $scope.comedian = item.comedian;
            $scope.video_id=item.video_id;
            $scope.likes=item.likes;
            $scope.comments=item.comments;
            $scope.playModal.show();
            $scope.mymodal={};
        }

        $scope.closePlayModal = function() {
            $scope.playModal.hide();
        }
        $scope.addLike=function(video_id){
            console.log("like" + video_id);
            var promise = LikeService.addLike($scope.user.email,"video",video_id);
            promise.then(function(data){
                $scope.likes=data[0].likes;
            });
        }
        $scope.addComment=function(video_id){
            console.log($scope);
            console.log("comment" + video_id );
            var promise=LikeService.addComment($scope.user.email,"video",video_id,$scope.mymodal.comment);
            promise.then(function(data){
                $scope.comments=data[0].comments;
                $scope.mymodal.comment="";
            });

        }
  $scope.doRefresh = function() {
    VideosService.getVideos().then(function(data){
        $scope.videos=data;
        console.log($scope.videos);
    }).finally(function(){
            console.log("now here again");
    });   
    $scope.$broadcast('scroll.refreshComplete');
    //$scope.$apply()
  };        
})
.controller('HomeCtrl', function ($scope,$ionicModal,$location,$ionicSideMenuDelegate,$sce,ArticlesService,VideosService,ComediansService,DSCacheFactory) {
        $scope.navTitle = "Laffportal Search";
        $scope.request = {};
        $scope.showFlag = false;
        $scope.mediaTypes = {};
        $scope.mediaTypes.type = 'all';
        $scope.sortBy = "artistName";
        $scope.filterTerm = "";
    self.staticCache = DSCacheFactory.get("staticCache"); 
    $scope.user=self.staticCache.get("user");    

//<iframe src="//player.vimeo.com/video/96773196" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/96773196">Basketmouth's Girlfriend Exposed</a> from <a href="http://vimeo.com/laffportal">Laffportal Inc</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
        VideosService.getVideos().then(function(data){
            $scope.numVideos=data.length;
        });

        ArticlesService.getArticles().then(function(data){
            $scope.numArticles=data.length;
        });
        ComediansService.getComedians().then(function(data){
            $scope.numComedians=data.length;
        });
        
        var doSearch = ionic.debounce(function(query) {
            var type = $scope.mediaTypes.type;
            if (type=="all")  type="";
            if (query!=null) {
                // Pass in the query string, the media type and the # of results to return (from SettingsService)
                MediaService.search(query,type,SettingsService.get('maxResults')).then(function(resp) {
                    $scope.mediaResults = resp;
                    console.log("Result Count " + $scope.mediaResults.resultCount);
                    $scope.mediaResults = resp;

                    if ($scope.mediaResults.resultCount == 0)
                        $scope.infoTxt = 'No matching results found';

                });
            }
        }, 500);


        $scope.search = function() {
            $scope.infoTxt = null;
            doSearch($scope.request.query);
        };

        $scope.checkMedia = function(item) {
            console.log("URL " + item.previewUrl + " " + item.kind);
            if (item.kind==='song' || item.kind==='music-video' || item.kind==='vimeo') {
                $scope.openPlayModal(item);
                $scope.infoTxt = null;
            }
            else $scope.infoTxt = 'No suitable player available for the selected media type.'
        };

        $ionicModal.fromTemplateUrl('templates/playModal.html', function(modal) {
            $scope.playModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.openPlayModal = function(item) {
            $scope.url = item.previewUrl;
            $scope.url="http://vimeo.com/96773196";
            var valu=$sce.trustAsResourceUrl($scope.url);
            $scope.url=valu;
            $scope.kind=item.kind;
            if  (item.trackName != null) $scope.title = item.trackName;
            else $scope.title = item.collectionName;

            $scope.kind = item.kind;
            $scope.artist = item.artistName;
            $scope.playModal.show();
        };

        $scope.closePlayModal = function() {
            $scope.playModal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/sortModal.html', function(sortModal) {
            $scope.sortModal = sortModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.openSortModal = function() {
            $scope.sortModal.show();
        };

        $scope.closeSortModal = function() {
            $scope.sortModal.hide();
        };


})
.controller('ArticlesCtrl', function ($scope,ArticlesService) {
    $scope.navTitle = "Laffportal Articles";
    ArticlesService.getArticles().then(function(data){
        $scope.articles=data;
        console.log($scope.articles);
    }).finally(function(){
            console.log("now here");
    });   
    
})
.controller('ArticleCtrl', function ($scope,$stateParams,ArticleService,LikeService) {
    $scope.navTitle = "Laffportal Article";
    console.log("here,{}",$stateParams.articleID);
    $scope.imgname="article" + $stateParams.articleID;
    //$scope.articleText=ArticleService.getArticleText($stateParams.articleID);
    ArticleService.getArticleText($stateParams.articleID).then(function(data){
        console.log(data);
        $scope.article=data[0];
        console.log($scope.article.article_text);
    }).finally(function(){
            console.log("now here");
    });

        $scope.addLike=function(article_id){
            console.log("like" + article_id);
            var promise = LikeService.addLike("username","article",article_id);
            promise.then(function(data){
                $scope.article.likes=data[0].likes;
            });
        }
        $scope.addComment=function(video_id){
            console.log($scope);
            console.log("comment" + video_id );
            var promise=LikeService.addComment("username","video",video_id,$scope.comment);
            promise.then(function(data){
                $scope.article.comments=data[0].comments;
                $scope.comment="";
            });

        }

});