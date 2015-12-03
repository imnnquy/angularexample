package com.skillsoft.kcedit.component.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skillsoft.kcedit.component.business.PublishPackageService;
import com.skillsoft.kcedit.component.core.bean.PackageInfo;
import com.skillsoft.kcedit.component.core.bo.SaveSaveAsKnowledgeCenter;
import com.skillsoft.kcedit.component.core.businessservices.ISaveSaveAsKnowledgeCenter;
import com.skillsoft.kcedit.component.core.common.exception.KCEditException;
import com.skillsoft.kcedit.component.core.contentservice.ContentKCCache;
import com.skillsoft.kcedit.component.core.contentservice.loadtracks.BulkUser;
import com.skillsoft.kcedit.component.core.contentservice.loadtracks.generatepackage.GeneratePackageAction;
import com.skillsoft.kcedit.component.dto.PackageRequestData;
import com.skillsoft.kcedit.constants.InfoMessages;

/**
 * This controller is to manage block action
 * 
 *
 */

@Controller
@RequestMapping("/managePackage")
public class ManagePackageController extends KCEditController{
    
    private final static Logger logger = Logger.getLogger(ManagePackageController.class);

    @RequestMapping(value = "/savePackage", method = RequestMethod.POST)
    public @ResponseBody String savePackage(@RequestBody PackageRequestData requestData) throws KCEditException{
        String packageId = requestData.getPackageId();
        ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
        ISaveSaveAsKnowledgeCenter saver = new SaveSaveAsKnowledgeCenter(myContentCache);

        saver.saveKC(null, null, false, false, false);
        
        logger.info(InfoMessages.SAVE_SUCCESSFULL);

        return "";
                
    }
    
    @RequestMapping(value = "/publishPackage", method = RequestMethod.POST)
    public @ResponseBody String publishPackage(@RequestBody PackageRequestData requestData) throws KCEditException{
        String packageId = requestData.getPackageId();
        
        GeneratePackageAction generatePackageAction = new GeneratePackageAction(packageId);
        
        generatePackageAction.generatePackage();
        
        BulkUser bulkUser = new BulkUser("quynguyen", "quynguyen", "pubkcportalvsp80da");
        
        PublishPackageService publishPackageService = new PublishPackageService(bulkUser);
        
        PackageInfo packageInfo = new PackageInfo();
        packageInfo.setPackageId(packageId);
        
        publishPackageService.publishTrackToSkillPort(packageInfo);
        
        logger.info(InfoMessages.PUBLISH_SUCCESSFULL);

        return "";
                
    }
}
