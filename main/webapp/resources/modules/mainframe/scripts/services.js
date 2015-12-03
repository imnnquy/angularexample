'use strict'

angular.module('kceditWebApp.mainframe.services', [])
    .factory('Page', ['$resource', 'API_ENDPOINT', function($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT, {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .factory('UserService', ['AUTH_ENDPOINT', 'LOGOUT_ENDPOINT', '$http', '$cookieStore', function(AUTH_ENDPOINT, LOGOUT_ENDPOINT, $http, $cookieStore) {

        var auth = {};
        auth.isLogin = false;

        auth.setIsLogin = function(isLogin) {
            auth.isLogin = isLogin;
        }

        auth.getIsLogin = function() {
            return auth.isLogin;
        }

        auth.login = function(username, password) {
            return $http.post(AUTH_ENDPOINT, {
                username: username,
                password: password
            }).then(function(response, status) {
                auth.user = response.data;
                $cookieStore.put('user', auth.user);
                return auth.user;
            });

            //Hard code to test
            //            auth.user = {
            //                "username": "abc"
            //            };
            //            $cookieStore.put('user', auth.user);
            //            return auth.user;
        }

        auth.logout = function() {
            return $http.post(LOGOUT_ENDPOINT).then(function(response) {
                auth.user = undefined;
                $cookieStore.remove('user');
            });
            // auth.user = undefined;
            // $cookieStore.remove('user');
        }

        auth.checkSCA = function() {
            /*return $http.post(LOGOUT_ENDPOINT).then(function(response) {
                auth.user = undefined;
                $cookieStore.remove('user');
            });*/
            return true;
        }

        return auth;

    }]).factory('MenuService', [function() {

        var fileMenuItems = {
            "fileMenu": [{
                "itemName": "New...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Open...",
                "isParent": "false",
                "isDividerLine": "false",
                "event":"openModal()",
                "children": []
            }, {
                "itemName": "Close",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Save...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "SaveAs...",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Import...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "GeneratePackage",
                "isParent": "false",
                "isDividerLine": "false",
                "event": "OpenGenerate()",
                "children": []
            }, {
                "itemName": "PublishCurrentPackage...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "GlobalPreview",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "ClonePackage...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "ExportStrings",
                "isParent": "true",
                "isDividerLine": "false",
                "children": [{
                    "itemName": "Include Alt Text...",
                    "isParent": "false",
                    "isDividerLine": "false"
                }, {
                    "itemName": "Exclude Alt Text...",
                    "isParent": "false",
                    "isDividerLine": "false"
                }, {
                    "itemName": "Alt Text Only...",
                    "isParent": "false",
                    "isDividerLine": "false"
                }]
            }, {
                "itemName": "ImportStrings...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "WordCount",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Exit",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }]
        };

        var editMenuItems = {
            "editMenu": [{
                "itemName": "Undo  Ctrl+Z",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Redo  Ctrl+Y",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Cut  Ctrl+X",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Copy  Ctrl+C",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Paste  Ctrl+V",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Find...  Ctrl+F",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }]
        };

        var insertMenuItems = {
            "insertMenu": [{
                "itemName": "Copy Page...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Copy Block...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Add block Template...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Add Free-form Page",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }]
        };

        var toolsMenuItems = {
            "toolsMenu": [{
                "itemName": "Revert to Stock",
                "isParent": "true",
                "isDividerLine": "false",
                "children": [{
                    "itemName": "Revert to Stock",
                    "isParent": "false",
                    "isDividerLine": "false"
                }, {
                    "itemName": "Revert the Contents to Stock",
                    "isParent": "false",
                    "isDividerLine": "false"
                }, {
                    "itemName": "Revert the Order to Stock",
                    "isParent": "false",
                    "isDividerLine": "false"
                }, {
                    "itemName": "Revert entire package to Stock",
                    "isParent": "false",
                    "isDividerLine": "false"
                }]
            }, {
                "itemName": "Export Item List (CSV)...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Options...",
                "isParent": "false",
                "isDividerLine": "true",
                "children": []
            }, {
                "itemName": "Apply Global Changes",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }]
        };

        var helpMenuItems = {
            "helpMenu": [{
                "itemName": "Help...  F1",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "Supported File Types...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }, {
                "itemName": "About KnowledgeCenter Editor...",
                "isParent": "false",
                "isDividerLine": "false",
                "children": []
            }]
        };

        return {
            getFileMenuItems: function() {
                return fileMenuItems;
            },
            getEditMenuItems: function() {
                return editMenuItems;
            },
            getInsertMenuItems: function() {
                return insertMenuItems;
            },
            getToolsMenuItems: function() {
                return toolsMenuItems;
            },
            getHelpMenuItems: function() {
                return helpMenuItems;
            }
        };
    }]).factory('OutlineTreeService', ['URL_CONSTANTS', '$http', function(URL_CONSTANTS, $http) {
        return {
            openPackageGetOutlineTree: function(packageId) {
                var paramsData = JSON.stringify({'packageId': packageId, 'pageId': ''});
                return $http.post(URL_CONSTANTS.OPEN_GET_TREE_OUTLINE, paramsData);
            },
            performBlockPopUpAction: function(action, packageId, pageId, blockId) {
            	var paramsData = JSON.stringify({'action': action, 'packageId': packageId, 'pageId': pageId, 'blockId' : blockId});
                return $http.post(URL_CONSTANTS.PERFORM_BLOCK_ACTION_URL, paramsData);
            },
            getOutlineTree: function(packageId){
            	var paramsData = JSON.stringify({'packageId': packageId, 'pageId': ''});
                return $http.post(URL_CONSTANTS.GET_TREE_OUTLINE, paramsData);
            }
        };
    }]).factory('DesignPanelService', ['URL_CONSTANTS','$http', function(URL_CONSTANTS,$http) {
        // return $resource(API_ENDPOINT, { id: '@_id' }, {
        //     update: {
        //         method: 'PUT'
        //     }
        // });
        return {
            getPage: function(nodeData) {
                return nodeData;
            },
            getQuickPreviewURL: function(packageId, pageId){
            	var paramsData = JSON.stringify({'packageId': packageId, 'pageId': pageId});
            	return $http.post(URL_CONSTANTS.GET_QUICK_PREVIEW_URL, paramsData, {headers: { 'Accept': 'application/text' }});
            },
            savePackage: function(packageId){
            	var paramsData = JSON.stringify({'packageId': packageId, 'pageId': ''});
            	return $http.post(URL_CONSTANTS.SAVE_PACKAGE_URL, paramsData);
            },
            publishPackage: function(packageId){
            	var paramsData = JSON.stringify({'packageId': packageId, 'pageId': ''});
            	return $http.post(URL_CONSTANTS.PUBLISH_PACKAGE_URL, paramsData);
            },
            updateNodeInfo: function(action, packageId, pageId, blockId, newTitle){
            	var paramsData = JSON.stringify({'action': action, 'packageId': packageId, 'pageId': pageId, 'blockId': blockId, 'actionParam': newTitle});
            	return $http.post(URL_CONSTANTS.CHANGE_TITLE_URL, paramsData);
            }
        };
    }]).factory('GeneratePackageService', ['$http', function ($http) {

        return { 
        generatePackage : function( generatedUrl){
        	  return $http.get(generatedUrl, {                
              });
        }
        }
    }]).factory('FileUploadService', ['$http', function ($http) {

        return { 
        uploadFileToUrl : function(file, uploadUrl){
            var fd = new FormData();
            var status = { progress: 0 };
            fd.append('file', file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
            });
          
        }
        }
    }]).factory('CommonService', ['URL_CONSTANTS', function(URL_CONSTANTS) {
        var quickPreviewURL = URL_CONSTANTS.QUICK_PREVIEW_URL;
        return {
            getquickPreviewURL: function() {
                return quickPreviewURL;
            },
            setquickPreviewURL: function(link) {
                quickPreviewURL = link;
            }
        };
    }]).factory('DesignStyleTabs', [function() {
        var tabs = {
            "tabs": [{
                "title": 'Dynamic Title 1',
                "content": 'Dynamic content 1',
                "disabled": "false"
            }, {
                "title": 'Dynamic Title 2',
                "content": 'Dynamic content 2',
                "disabled": "true"
            }]
        };
        return {
            getDesignStyleTabs: function() {
                return tabs;
            }
        };
    }]);


angular.module('kceditWebApp.mainframe.services').value('API_ENDPOINT', 'http://spblogger-sitepointdemos.rhcloud.com/api/posts/:id'); // This is our end point
angular.module('kceditWebApp.mainframe.services').value('AUTH_ENDPOINT', 'http://localhost:8080/authenticate');
angular.module('kceditWebApp.mainframe.services').value('LOGOUT_ENDPOINT', 'http://localhost:8080/logout');
angular.module('kceditWebApp.mainframe.services').constant('URL_CONSTANTS', (function() {
    // Use the variable in your constants
    return {
    	UPLOAD_FILE:'/upload',
        OPEN_GET_TREE_OUTLINE: 'openpackage/open',
        GET_TREE_OUTLINE: 'openpackage/getTreeOutline',
        GET_QUICK_PREVIEW_URL: 'manageBlock/getQPURL',
        SAVE_PACKAGE_URL: 'managePackage/savePackage',
        PUBLISH_PACKAGE_URL: 'managePackage/publishPackage',
        CHANGE_TITLE_URL: 'manageBlock/changeTitle',
        QUICK_PREVIEW_URL: 'http://google.com',
        PERFORM_BLOCK_ACTION_URL: 'manageBlock/performBlockPopUpAction'
    }
})());