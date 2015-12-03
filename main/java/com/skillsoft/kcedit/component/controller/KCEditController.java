package com.skillsoft.kcedit.component.controller;

import com.skillsoft.kcedit.component.core.common.KCEditConfiguration;
import com.skillsoft.kcedit.component.core.common.util.DynamicAssetUtil;
import com.skillsoft.kcedit.component.core.engines.CommonCache;

public abstract class KCEditController {
    protected static KCEditConfiguration conf = KCEditConfiguration.getInstance();
    
    static {
        DynamicAssetUtil.checkXSLFolder();
        CommonCache.loadGlobalLibraryCache();
        conf.setContentDeveloper(true);
        conf.setPublisherJarName("publisher.jar");
    }
}
