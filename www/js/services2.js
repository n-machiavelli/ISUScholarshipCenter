angular.module('starter.services2', [])

.service('ArticlesService', function($http,$q) {
    var _variables = {};
    var articles=[];
    return {
        getArticles: function() {
            console.log("here");
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=articles")
                .success(function(data,status){
                    console.log("Received articles data via http", data, status);
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    console.log("Error while making http call:");
                    deferred.reject();
                });
            return deferred.promise;
        },
        getArticleText: function(articleID) {
            $http.get("http://myitem7.com/test/index.php?todo=article&articleID=" + articleID)
                .success(function(data,status){
                    console.log("in get article text");
                    console.log(data);
                    deferred.resolve(data);
                })
                .error (function(data,status){
                    console.log("Error while making http call");
                    deferred.reject();
                })
            return deferred.promise;
        }        
    };
})

.service('ComediansService', function($http,$q) {
    var _variables = {};
    var comedians=[];
    return {
        getComedians: function() {
            console.log("here");
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=comedians")
                .success(function(data,status){
                    console.log("Received comedians data via http", data, status);
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    console.log("Error while making http call:");
                    deferred.reject();
                });
            return deferred.promise;
        }       
    };
})

.service('ArticleService', function($http,$q) {
    var _variables = {};
    var articles=[];
    return {
        getArticleText: function(articleID) {
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=article&articleID=" + articleID)
                .success(function(data,status){
                    console.log("in get article text");
                    console.log(data);
                    deferred.resolve(data);
                })
                .error (function(data,status){
                    console.log("Error while making http call");
                    deferred.reject();
                })
            return deferred.promise;
        }        
    };
})

.service('VideosService', function($http,$q) {
    var _variables = {};
    var articles=[];
    
    return {
        getVideos: function() {
            console.log("here");
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=videos")
                .success(function(data,status){
                    console.log("Received videos data via http", data, status);
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    console.log("Error while making http call:");
                    deferred.reject();
                });
            return deferred.promise;
        },
        getVideo: function(videoID) {
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=video&videoID=" + videoID)
                .success(function(data,status){
                    deferred.resolve(data);
                })
                .error (function(data,status){
                    console.log("Error while making http call");
                    deferred.reject();
                });
            return deferred.promise;
        }        
    };
})


.service('LikeService', function($http,$q){
    return {
        addLike: function(username,type,video_id){
            var deferred=$q.defer();
            //TODO: change to post
            $http.get("http://myitem7.com/test/index.php?todo=addlike&username=" + username + "&type=" + type + "&id=" + video_id)
            .success(function(data,status){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(data,status){
                console.log(data);
                deferred.reject("error");
            });
            return deferred.promise;
        },
        addComment: function(username,type,video_id,comment){
            var deferred=$q.defer();
            //TODO: change to post
            $http.get("http://myitem7.com/test/index.php?todo=addcomment&username=" + username + "&type=" + type + "&id=" + video_id + "&comment=" + comment )
            .success(function(data,status){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(data,status){
                console.log(data);
                deferred.reject("error");
            });
            return deferred.promise;
        }        
    }
})
.service('ArticlesService', function($http,$q) {
    var _variables = {};
    var articles=[];
    return {
        getArticles: function() {
            console.log("here");
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=articles")
                .success(function(data,status){
                    console.log("Received articles data via http", data, status);
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    console.log("Error while making http call:");
                    deferred.reject();
                });
            return deferred.promise;
        },
        getArticleText: function(articleID) {
            $http.get("http://myitem7.com/test/index.php?todo=article&articleID=" + articleID)
                .success(function(data,status){
                    console.log("in get article text");
                    console.log(data);
                    deferred.resolve(data);
                })
                .error (function(data,status){
                    console.log("Error while making http call");
                    deferred.reject();
                })
            return deferred.promise;
        }        
    };
})
.service('ComediansService', function($http,$q) {
    var _variables = {};
    var comedians=[];
    return {
        getComedians: function() {
            console.log("here");
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=comedians")
                .success(function(data,status){
                    console.log("Received comedians data via http", data, status);
                    deferred.resolve(data);
                })
                .error(function(data,status){
                    console.log("Error while making http call:");
                    deferred.reject();
                });
            return deferred.promise;
        }       
    };
})
.service('ArticleService', function($http,$q) {
    var _variables = {};
    var articles=[];
    return {
        getArticleText: function(articleID) {
            var deferred=$q.defer();
            $http.get("http://myitem7.com/test/index.php?todo=article&articleID=" + articleID)
                .success(function(data,status){
                    console.log("in get article text");
                    console.log(data);
                    deferred.resolve(data);
                })
                .error (function(data,status){
                    console.log("Error while making http call");
                    deferred.reject();
                })
            return deferred.promise;
        }        
    };
});