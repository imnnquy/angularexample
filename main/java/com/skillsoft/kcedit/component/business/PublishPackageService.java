package com.skillsoft.kcedit.component.business;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.log4j.Logger;

import com.skillsoft.kcedit.component.core.KCEdit;
import com.skillsoft.kcedit.component.core.bean.PackageInfo;
import com.skillsoft.kcedit.component.core.common.JarClassLoader;
import com.skillsoft.kcedit.component.core.common.KCEditConfiguration;
import com.skillsoft.kcedit.component.core.common.MessageConstants;
import com.skillsoft.kcedit.component.core.common.util.MessagesBundle;
import com.skillsoft.kcedit.component.core.common.util.SCCPInformation;
import com.skillsoft.kcedit.component.core.contentservice.loadtracks.BulkUser;
import com.skillsoft.kcedit.component.core.contentservice.loadtracks.KCEditBulkException;
import com.skillsoft.kcedit.component.core.contentservice.loadtracks.publishtracks.PublishTracksAction;
import com.skillsoft.kcedit.component.core.mainframe.dialogs.BulkLoginDialog;
import com.skillsoft.kcedit.component.core.mainframe.dialogs.PublishMultipleTrackDialog;
import com.skillsoft.kcedit.component.core.mainframe.guicomponents.GUIConstants;
import com.skillsoft.kcedit.component.core.publisher.PublisherControl;
import com.skillsoft.kcedit.component.core.publisher.PublisherHelper;
import com.skillsoft.kcedit.component.core.publisher.PublisherWrapper;
import com.skillsoft.kcedit.component.core.publisher.adapter.dto.ProductionDTO;

public class PublishPackageService {
    
    private BulkUser bulkUser;

    private static Logger logger = Logger.getLogger(PublishPackageService.class);

    private static MessagesBundle messagesBundle = KCEdit.messagesBundle;

    private SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
    
    KCEditConfiguration conf = KCEditConfiguration.getInstance();
    
    public PublishPackageService(BulkUser bulkUser) {
        this.bulkUser = bulkUser;
    }

    /**
     * Publish a package to Skill port
     * 
     * @param packageInfo
     * @return false if package is canceled or error ocurred
     */
    public boolean publishTrackToSkillPort(PackageInfo packageInfo) {

        // // Temporary avoid publishing to SP
        // if(true){
        // try {
        // Thread.sleep(5000);
        // } catch (InterruptedException e) {
        // e.printStackTrace();
        // }
        // return true;
        // }

        // Check if progress canceling
        if (PublishMultipleTrackDialog.getStatus() == PublishMultipleTrackDialog.ENDING_PUBLISH) {
            packageInfo.setStatus(GUIConstants.BULK_STATUS_CANCELLED);
            return false;
        }

        // Get unique wrapper and helper of bulk publish
        PublisherWrapper publisherWrapper = null;
        PublisherHelper publisherHelper = null;
        try {
            PublisherControl publisherControl = PublishMultipleTrackDialog.getPublisherControl();
            publisherWrapper = publisherControl.getPublisherWrapper();
            publisherHelper = publisherControl.getPublisherHelper();
            
            BulkLoginDialog.publisherHelper = publisherHelper;

            Object user = null;
            String userErrorCode = "";

            // Try to login if bulk session hasn't logged in
            if (!PublishMultipleTrackDialog.isBulkLoggedIn()) {
                KCEdit.autoDetectProxy(conf.isCheckAutoDetect(), conf.isConfigScript(),
                        conf.getAddressConfigScript(), conf.isUseProxy(),
                        conf.getProxyHost(), conf.getProxyPort());
                String companyId = bulkUser.getCompanyId();
                String username = bulkUser.getUsername();
                String password = bulkUser.getPassword();
                user = publisherWrapper.processLogin(companyId, username, password);
                Object company = publisherWrapper.getCompanyInfo();
                BulkLoginDialog.storeCompanyInfos(company);
                
                ProductionDTO productionDTO = SCCPInformation.getCompany().getKCProductionList().get(0);
                packageInfo.setProductionSite(productionDTO);
                // If there is any error, stop
                userErrorCode = (String) JarClassLoader.invokeMethod("getErrCode", user, new Object[] {});
                if (!"".equals(userErrorCode)) {
                    logger.error(messagesBundle.getString(MessageConstants.BULK_ERROR_LOGIN_FAILED));
                    PublishMultipleTrackDialog.setBulkLoggedIn(false);
                    return publishTrackToSkillPort(packageInfo);
                } else {
                    PublishMultipleTrackDialog.setBulkLoggedIn(true);
                }
            }

        } catch (Exception unknown) {
            logger.error(unknown);
            PublishMultipleTrackDialog.setBulkLoggedIn(false);
            return publishTrackToSkillPort(packageInfo);
        }
        
        ProductionDTO productionDTO = SCCPInformation.getCompany().getKCProductionList().get(0);
        packageInfo.setProductionSite(productionDTO);

        // Stop if helper or wrapper is null
        if (publisherHelper == null || publisherWrapper == null) {
            PublishMultipleTrackDialog.setBulkLoggedIn(false);
            return publishTrackToSkillPort(packageInfo);
        }

        return processPublish(packageInfo, publisherWrapper, publisherHelper);
    }

    /**
     * Process publishing to skillport
     * 
     * @param packageInfo
     * @param publisherWrapper
     * @param publisherHelper
     * @return true if package is published successfully
     */
    private boolean processPublish(PackageInfo packageInfo, PublisherWrapper publisherWrapper,
            PublisherHelper publisherHelper) {
        try {
            // temporary use try/catch
            // need to process in future
            ProductionDTO productionDTO = packageInfo.getProductionSite();
            String productionId = productionDTO.getProductionID();
            String skillPortSName = productionDTO.getSName();
            String skillPortURL = productionDTO.getKCProductionSiteURL();
            if (publisherHelper.verifyGlobalConditions(null, packageInfo.getPackageId())) {
                PublishTracksAction publishAction = new PublishTracksAction(null, publisherWrapper, publisherHelper,
                        productionId, 0, skillPortURL, skillPortSName, packageInfo);
                Thread publishThread = new Thread(publishAction);
                publishThread.start();
                try {
                    // Join thread
                    publishThread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return false;
                }

                // If status is not Error and is not Canceled, result = true
                boolean result = !GUIConstants.BULK_STATUS_ERROR.equalsIgnoreCase(packageInfo.getStatus())
                        && !GUIConstants.BULK_STATUS_CANCELLED.equalsIgnoreCase(packageInfo.getStatus());
                return result;
            }
            return false;
        } catch (KCEditBulkException ex) {
            // Set status for package
            processBulkError(packageInfo, ex);
            return false;
        } catch (Exception unknownError) {
            // Set status for package
            processUnknownError(packageInfo, unknownError);
            return false;
        }
    }

    /**
     * Process publish error from publisher API
     * 
     * @param packageInfo
     * @param ex
     */
    private void processBulkError(PackageInfo packageInfo, KCEditBulkException ex) {
        packageInfo.setErrorCode(ex.getErrorCode());
        packageInfo.setErrorMessage(ex.getErrorMessgae());
        Calendar c1 = Calendar.getInstance();
        packageInfo.setDateTime(sdf.format(c1.getTime()));
        logger.error(messagesBundle.getString(MessageConstants.BULK_LOG_ERROR_CODE) + ex.getErrorCode());
        logger.error(messagesBundle.getString(MessageConstants.BULK_LOG_ERROR_MESSAGE) + ex.getErrorMessgae());
        logger.error(ex);
    }

    /**
     * Process unknown error
     * 
     * @param packageInfo
     * @param unknownError
     */
    private void processUnknownError(PackageInfo packageInfo, Exception unknownError) {
        packageInfo.setErrorMessage(messagesBundle.getString(MessageConstants.BULK_ERROR_UNKNOWN));
        Calendar c1 = Calendar.getInstance();
        packageInfo.setDateTime(sdf.format(c1.getTime()));
        logger.error(unknownError);
    }
}
