package com.skillsoft.kcedit.component.controller;

import java.io.File;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skillsoft.kcedit.component.core.common.exception.KCEditException;
import com.skillsoft.kcedit.component.core.common.util.FileUtil;
import com.skillsoft.kcedit.component.core.contentobject.Block;
import com.skillsoft.kcedit.component.core.contentobject.KCPage;
import com.skillsoft.kcedit.component.core.contentobject.KnowledgeCenter;
import com.skillsoft.kcedit.component.core.contentservice.ContentKCCache;
import com.skillsoft.kcedit.component.core.engines.viewers.ViewerEngine;
import com.skillsoft.kcedit.component.core.engines.viewers.ViewerEngine30StyleImpl;
import com.skillsoft.kcedit.component.dto.PackageRequestData;
import com.skillsoft.kcedit.constants.BlockAction;
import com.skillsoft.kcedit.constants.CommonAction;

/**
 * This controller is to manage block action
 * 
 *
 */

@Controller
@RequestMapping("/manageBlock")
public class ManageBlockController extends KCEditController{
    
    private final static Logger logger = Logger.getLogger(ManageBlockController.class);

    @RequestMapping(value = "/getQPURL", method = RequestMethod.POST)
    public @ResponseBody String renderQuickPreview(@RequestBody PackageRequestData requestData){
        
        String packageId = requestData.getPackageId();
        String pageId = requestData.getPageId();
        
        String srcPackage = System.getProperty("catalina.home") + "/packages/" + packageId;
        String dstPackage = ConfigurationConstants.PATH_TO_PACKAGE_ON_HOST + "/" + packageId;
        
        try {
            FileUtil.copyFolder(srcPackage, dstPackage, false);
        } catch (KCEditException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        
        ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
        KnowledgeCenter knowledgeCenter = myContentCache.getKnowledgeCenter();
        
        KCPage page = knowledgeCenter.getPage(pageId);
        
        String pathToFile = "";
        
        ViewerEngine engine = ViewerEngine.createNewEngine();
        ViewerEngine30StyleImpl viewerEngine = new ViewerEngine30StyleImpl(engine);
        
        try {
            pathToFile = viewerEngine.createHTMLFileForPreview(true, page, null, myContentCache);
        } catch (KCEditException e) {
            logger.error(e.getMessage());
        }
        
        String pathToPreviewFolder = conf.getPreviewFolder();
        
        try {
            FileUtil.copyFolder(pathToPreviewFolder, ConfigurationConstants.PATH_TO_PREVIEW_HOST + "\\" + packageId, false);
        } catch (KCEditException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        File file = new File(pathToFile);
        
        String parentName = file.getParentFile().getName();
        String fileName = file.getName();
        
        return ConfigurationConstants.PATH_TO_PREVIEW_HTTP_HOST + packageId + "/" + parentName + "/" + fileName;
    }
    
    @RequestMapping(value = "/performBlockPopUpAction", method = RequestMethod.POST)
    public @ResponseBody String performBlockPopUpAction(@RequestBody PackageRequestData requestData){
        String action = requestData.getAction();
        String packageId = requestData.getPackageId();
        String pageId = requestData.getPageId();
        String blockId = requestData.getBlockId();
        if(BlockAction.DELETE.equalsIgnoreCase(action)){
            ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
            KnowledgeCenter knowledgeCenter = myContentCache.getKnowledgeCenter();
            
            knowledgeCenter.getPage(pageId).removeBlockFromHashTable(blockId);
        }
        
        return "";
                
    }
    
    @RequestMapping(value = "/changeTitle", method = RequestMethod.POST)
    public @ResponseBody String changeTitle(@RequestBody PackageRequestData requestData) throws KCEditException{
        String action = requestData.getAction();
        String packageId = requestData.getPackageId();
        String newTitle = requestData.getActionParam();
        ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
        
        KnowledgeCenter kc = myContentCache.getKnowledgeCenter();
        if(CommonAction.EDIT_PACKAGE_TITLE.equalsIgnoreCase(action)){
            kc.setTitle(newTitle);
        }
        
        if(CommonAction.EDIT_PAGE_TITLE.equalsIgnoreCase(action)){
            KCPage myPage = kc.getPage(requestData.getPageId());
            myPage.setPageTitle(newTitle);
            myPage.setPageTitle508(newTitle);
        }
        if(CommonAction.EDIT_BLOCK_TITLE.equalsIgnoreCase(action)){
            KCPage myPage = kc.getPage(requestData.getPageId());
            Block myBlock = (Block) myPage.getBlock(requestData.getBlockId());
            myBlock.setBlockTitle(newTitle);
        }
        
        return "";
    }
}
