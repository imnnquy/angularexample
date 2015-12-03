package com.skillsoft.kcedit.component.controller;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.skillsoft.kcedit.component.service.uploadfile.iplm.UploadFileImplement;
import com.skillsoft.kcedit.constants.InfoMessages;
import com.skillsoft.kcedit.constants.ViewConstants;

/**
 * This is a demo controller, just create a new simple page to handle index request
 * 
 *
 */
@Controller

public class DemoController {

    private final static Logger logger = Logger.getLogger(DemoController.class);

    /**
     * Handle index request
     * 
     * @return index page
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String welcome() {

        logger.debug(InfoMessages.INDEX_SUCCESSFULL);

        return ViewConstants.VIEW_INDEX;

    }
    
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public @ResponseBody void uploadFileHandler(
			@RequestParam("file") MultipartFile file) {
    	UploadFileImplement uploadFileToServer = new UploadFileImplement();
    	uploadFileToServer.uploadFile(file); 
    }
    
   
}
