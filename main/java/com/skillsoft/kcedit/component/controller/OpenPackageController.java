package com.skillsoft.kcedit.component.controller;

import java.io.File;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skillsoft.kcedit.component.core.contentobject.Block;
import com.skillsoft.kcedit.component.core.contentobject.KCPage;
import com.skillsoft.kcedit.component.core.contentobject.KnowledgeCenter;
import com.skillsoft.kcedit.component.core.contentservice.ContentKCCache;
import com.skillsoft.kcedit.component.core.contentservice.loadtrack.OpenPackageAction;
import com.skillsoft.kcedit.component.core.contentservice.parsers.ContentConstant;
import com.skillsoft.kcedit.component.dto.KCEditTagNode;
import com.skillsoft.kcedit.component.dto.PackageRequestData;
import com.skillsoft.kcedit.component.dto.TreeOutlineNode;
import com.skillsoft.kcedit.constants.ContentConstants;

/**
 * This is a open package controller, handle open package action
 * 
 *
 */
@Controller
@RequestMapping("/openpackage")
public class OpenPackageController extends KCEditController{

    private final static Logger logger = Logger.getLogger(OpenPackageController.class);
    
    /**
     * Handle open request
     * 
     * @return tree outline of opened package
     */
    @RequestMapping(value = "/open", method = RequestMethod.POST)
    public @ResponseBody TreeOutlineNode openPackage(@RequestBody PackageRequestData requestData) {

        String packageId = requestData.getPackageId();
        OpenPackageAction openPackageAction = new OpenPackageAction(packageId);
        String rootPath = System.getProperty("catalina.home");
        String filePath = rootPath + "/packages/" + packageId + "/" + packageId + "." + ContentConstant.TAG_KCF;
        openPackageAction.openKCByDeveloper(new File(filePath));

        ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
        KnowledgeCenter knowledgeCenter = myContentCache.getKnowledgeCenter();

        TreeOutlineNode treeOutline = getnerateTreeOutline(knowledgeCenter);

        logger.debug("TreeOutline: " + treeOutline);

        return treeOutline;
    }
    
    @RequestMapping(value = "/getTreeOutline", method = RequestMethod.POST)
    public @ResponseBody TreeOutlineNode getTreeOutline(@RequestBody PackageRequestData requestData) {

        String packageId = requestData.getPackageId();

        ContentKCCache myContentCache = ContentKCCache.getContentKCCache(packageId);
        KnowledgeCenter knowledgeCenter = myContentCache.getKnowledgeCenter();

        TreeOutlineNode treeOutline = getnerateTreeOutline(knowledgeCenter);

        logger.debug("TreeOutline: " + treeOutline);

        return treeOutline;
    }
    
    @RequestMapping(value = "/getNodeData", method = RequestMethod.POST)
    public @ResponseBody KCEditTagNode getNodeInformation(@RequestBody PackageRequestData requestData) {
        KCEditTagNode editTagNode = new KCEditTagNode();

        return editTagNode;
    }
    
    private TreeOutlineNode getnerateTreeOutline(KnowledgeCenter knowledgeCenter) {

        TreeOutlineNode rootNode = new TreeOutlineNode(knowledgeCenter.getId(), knowledgeCenter.getTitle(),
                ContentConstants.TREEOUTLINE_ROOT_TYPE, knowledgeCenter.getAttrValue(ContentConstant.ATTR_ALLOW_COPY));
        rootNode.setHomePageId(knowledgeCenter.getHomepage());
        for (KCPage page : knowledgeCenter.getPages()) {
            TreeOutlineNode pageNode = new TreeOutlineNode(page.getId(), page.getPageTitle().replace("{title}:", ""),
                    ContentConstants.TREEOUTLINE_PAGE_TYPE, page.getAttrValue(ContentConstant.ATTR_ALLOW_COPY));
            pageNode.setParentId(knowledgeCenter.getId());
            for (Block block : page.getBlocks()) {
                TreeOutlineNode blockNode = new TreeOutlineNode(block.getId(), block.getBlockTitle(),
                        ContentConstants.TREEOUTLINE_BLOCK_TYPE, block.getAttrValue(ContentConstant.ATTR_ALLOW_COPY));
                blockNode.setParentId(page.getId());
                pageNode.addNode(blockNode);
            }
            rootNode.addNode(pageNode);
        }

        return rootNode;
    }
}
