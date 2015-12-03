'use strict'

angular.module('kceditWebApp.mainframe.controllers', ['ngFileUpload'])
  .controller('MainframeController', ['$timeout', '$scope', 'MenuService', 'UserService','FileUploadService','Upload', 'CommonService','GeneratePackageService', '$state','$modal', 'OutlineTreeService','DesignPanelService','$http',
    function($timeout, $scope, MenuService, UserService,FileUploadService,Upload, CommonService,GeneratePackageService, $state,$modal, OutlineTreeService, DesignPanelService,$http) {

      $scope.isLoggedIn = true;

      //Menu navigation
      $scope.fileMenuItems = MenuService.getFileMenuItems();
      $scope.editMenuItems = MenuService.getEditMenuItems();
      $scope.insertMenuItems = MenuService.getInsertMenuItems();
      $scope.toolsMenuItems = MenuService.getToolsMenuItems();
      $scope.helpMenuItems = MenuService.getHelpMenuItems();

      //Set quick preview url
      $scope.quickPreviewURL = CommonService.getquickPreviewURL();
      
      $scope.performBlockPopUpAction = function(action, pageId, blockId){
    	  var packageId = $scope.treeoutLine.outlineTreeData[0].id;
    	  OutlineTreeService.performBlockPopUpAction(action, packageId, pageId, blockId).success(function(response){
    		  OutlineTreeService.getOutlineTree(packageId).success(function(response){
    			  $scope.treeoutLine = {'outlineTreeData': [response]};
    			  $scope.renderPage(pageId)
              });
    		  
    	  });
      };

      $scope.buttonText = "Update";
      $scope.getNodeData = function(nodeData) {
        $scope.page = DesignPanelService.getPage(nodeData);
        var pageId = nodeData.id;
        if(nodeData.type == 'block'){
        	pageId = nodeData.parentId;
        }
        if(nodeData.type == 'root'){
        	pageId = nodeData.homePageId;
        }
        var iFrame = $('div.embed-responsive.embed-responsive-4by3');
        iFrame.html('<div class="loading">Loading…</div>');
        DesignPanelService.getQuickPreviewURL($scope.treeoutLine.outlineTreeData[0].id, pageId).success(function(response){
        	var iFrame = $('div.embed-responsive.embed-responsive-4by3');
        	$scope.qpURL = response;
        	iFrame.html('<object data="' + response + '" />');
        	//iFrame.html(response);
          });        
      };
      $scope.renderPage = function(pageId) {
          var iFrame = $('div.embed-responsive.embed-responsive-4by3');
          iFrame.html('<div class="loading">Loading…</div>');
          DesignPanelService.getQuickPreviewURL($scope.treeoutLine.outlineTreeData[0].id, pageId).success(function(response){
          	var iFrame = $('div.embed-responsive.embed-responsive-4by3');
          	$scope.qpURL = response;
          	iFrame.html('<object data="' + response + '" />');
          	//iFrame.html(response);
            });        
        };
      $scope.updateNodeInfo = function() {
          $scope.buttonText = "Updating. . .";
          var packageId = $scope.treeoutLine.outlineTreeData[0].id;
          var pageId = '';
          var blockId = '';
          var action = 'editPackageTitle';
          if($scope.page.type == 'page'){
        	  pageId = $scope.page.id;
        	  action = 'editPageTitle';
          }
          if($scope.page.type == 'block'){
        	  pageId = $scope.page.parentId;
        	  blockId = $scope.page.id;
        	  action = 'editBlockTitle';
          }
          var newTitle = $scope.page.title;
          DesignPanelService.updateNodeInfo(action, packageId, pageId, blockId, newTitle).success(function(){
        	  $scope.buttonText = "Update";
          });
        };

      $scope.OpenGenerate = function() {
    	  $modal.open({
              templateUrl: 'GeneratePackage.html',
              backdrop: true,
              windowClass: 'modal',
              controller: function ($scope, $modalInstance) {
            	  $scope.fileUploadOptions =function() {
            	          progress: 0;
            	
            	        };   
            	 
                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
                  };
                                                 
                  $scope.openGenerating = function() {            	  
                	  var generateUrl = "openpackage/generate?isZip="+$scope.radioValue;
                	  GeneratePackageService.generatePackage(generateUrl);
                	  $modalInstance.dismiss('cancel');
                  }
                     
                  
              },
              resolve: {}
          });
      };
      
      $scope.savePackage = function() {
    	  var packageId = $scope.treeoutLine.outlineTreeData[0].id;
    	  var iFrame = $('div.embed-responsive.embed-responsive-4by3');
          iFrame.html('<div class="loading">Loading…</div>');
    	  DesignPanelService.savePackage(packageId).success(function(response){
    		  $scope.getNodeData($scope.treeoutLine.outlineTreeData[0]);
          });  
      };
      
      $scope.publishPackage = function() {
    	  var packageId = $scope.treeoutLine.outlineTreeData[0].id;
    	  var iFrame = $('div.embed-responsive.embed-responsive-4by3');
          iFrame.html('<div class="loading">Loading…</div>');
          DesignPanelService.publishPackage(packageId).success(function(response){
    		  $scope.getNodeData($scope.treeoutLine.outlineTreeData[0]);
    		  iFrame.html('<object data="' + $scope.qpURL + '" />');
          });
      };
      
      $scope.openModal = function() {
    	  var uploadModal = $modal.open({
              templateUrl: 'modalwindow.html',
              backdrop: true,
              windowClass: 'modal',
              controller: function ($scope, $modalInstance,Upload) {
            	  $scope.$watch('files', function () {
            	        $scope.upload($scope.files);
            	    });
            	 
            	    $scope.log = '';
            	    $scope.loader = {
          			      loading: false,
          			    };  
            	    $scope.success = {
            			      loading: false,
            			    };  
          	             
            	    $scope.upload = function (files) {
            	        if (files && files.length) {
            	            for (var i = 0; i < files.length; i++) {
            	                var file = files[i];
            	                $scope.size=file.size/1048576;
            	                $scope.type=file.type;
            	                $scope.name=file.name;
            	                $scope.lastModifiedDate=file.lastModifiedDate;
            	                var uploadUrl = "uploadFile";
            	                $scope.fileName = file.name.split('.')[0];
            	                Upload.upload({          	                	
            	                    url: uploadUrl,
            	                    fields: {
            	                        'username': $scope.username
            	                    },
            	                    file: file
            	                }).progress(function (evt) {
            	                	$scope.loader.loading = true;
            	                	 $scope.success.loading = false;
            	                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            	                    $scope.log = progressPercentage ;
            	                }).success(function (data, status, headers, config) {
            	                	$scope.success.loading = true;
            	                	 $scope.uploadStatus = "Success";
            	                	  OutlineTreeService.openPackageGetOutlineTree($scope.fileName).success(function(response){
                                          $scope.treeoutLine = {'outlineTreeData': [response]};
                                          $scope.successClose();
                                        });
            	                    $timeout(function() {
            	                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            	                    });
            	                });
            	            }
            	        }
            	    };
         	 
                  $scope.cancel = function () {
                      $modalInstance.close('cancel');
                  };

                  $scope.successClose = function() {
                    $modalInstance.close($scope.treeoutLine);
                  }
                                                 
                  $scope.uploadFile = function(){
                		  var file = $scope.myFile;
                		  var nameFile= file.name; 
                		  $scope.loader = {
                			      loading: false,
                			    };                			                 			 
                	      $scope.loader.loading = true ;             			   
                		  var typeFile=nameFile.substring(nameFile.lastIndexOf('.') + 1); 
                		  if(typeFile!="zip"){
                			  $scope.uploadStatus="Not a zip file";
                			  $scope.loader.loading = false ;
                			  return false;
                		  }else{
                			   console.log('file is ' + JSON.stringify(file));
                              var uploadUrl = "uploadFile";
                              $scope.fileName = file.name.split('.')[0];
                              FileUploadService.uploadFileToUrl(file, uploadUrl)
                              .progress(function (evt) {
                                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                  $scope.log = 'progress: ' + progressPercentage + '% ' +
                                              evt.config.file.name + '\n' + $scope.log;
                              })
                              .success(function(response){
                                $scope.uploadStatus = "Success";
                                $scope.loader.loading = false ;
                                OutlineTreeService.openPackageGetOutlineTree($scope.fileName).success(function(response){
                                  $scope.treeoutLine = {'outlineTreeData': [response]};
                                  $scope.successClose();
                                });
                              })
                              .error(function(){
                            	  $scope.loader.loading = false ;
                                $scope.uploadStatus = "Failed";
                                return false;
                              });
                		  }
                       
                	  }
                     
                  
              },
              resolve: {}
          });
        uploadModal.result.then(function (treeoutLine) {
          $scope.treeoutLine =  treeoutLine;
          $scope.getNodeData(treeoutLine.outlineTreeData[0]);
        })
      };

        
      $scope.logout = function() {
        /*authService.logout().then(function() {
          $state.go('login');
        });*/
        //UserService.logout();
        //$state.go('login');
        window.location.replace('logout');
      }
    }
  ]).controller('LoginController', ['$scope', 'UserService', '$state',
    function($scope, UserService, $state) {

      if(UserService.checkSCA()){
        $state.go('mainframe');
      }
      
      $scope.buttonText = "Login";


      $scope.login = function() {

        $scope.buttonText = "Logging in. . .";

          // var authe = UserService.login($scope.user.username, $scope.user.password);
          // if (angular.isObject(authe)) {
          //   $state.go('mainframe');
          // } else {
          //   $scope.errorMessage = "error login";
          // }

          /*self.login = function() {
          UserService.login(self.user).then(function(success) {
            $location.path('/');
          }, function(error) {
            self.errorMessage = error.data.msg;
          })
        };*/

          /*.then(function(data){
              $state.go('mainframe');
          },function(err){
              $scope.invalidLogin=true;
          }).finally(function(){
              $scope.buttonText="Login";
          });*/
        }
    }
  ]).controller('OutlineTreeController', ['$scope', '$state', 'OutlineTreeService',

    function($scope, $state, OutlineTreeService) {

      // $scope.outlineTree = {
      //   accept: function(sourceNodeScope, destNodesScope, destIndex) {
      //     return fasle;
      //   }
      // };

      $scope.toggle = function(scope) {
        scope.toggle();
      };


      $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
      };

      $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
      };

//       OutlineTreeService.openPackageGetOutlineTree('sla_02_z00_sla_enus').success(function(response){
//         $scope.treeoutLine = {'outlineTreeData': [response]};
//         $scope.getNodeData($scope.treeoutLine.outlineTreeData[0]);
//       });

       $scope.addPanel = function() {
        $scope.panels.push({ name: 'Panel ' + ($scope.panels.length + 1) });
      };


      $scope.message  = 'Right click triggered';
      $scope.closeMessage = 'Context menu closed';

      $scope.onRightClick = function(msg) {
        console.log(msg);
      };

      $scope.onClose = function (msg) {
        console.log(msg);
      };

      $scope.recreatePanels = function() {
        $scope.panels = angular.copy($scope.panels);
        console.log($scope.panels);
      }

    }
  ]).controller('DesignStylePanelController', ['$scope', 'DesignPanelService', 'CommonService', '$stateParams', '$state', function($scope, DesignPanelService, CommonService, $stateParams, $state) {
    document.getElementById('quickPreviewIframe').contentWindow.location.reload(true);

    $scope.page = DesignPanelService.getPage({
      id: $stateParams.id
    });

    $scope.buttonText = "Save";

    $scope.save = function() {
      $scope.buttonText = "Updating. . .";
      $scope.post.$update(function() {
        $state.go('mainframe');
      });
    };

  }]);