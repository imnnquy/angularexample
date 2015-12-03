package com.skillsoft.kcedit.component.service.uploadfile;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface UploadFileToServer {

	public String uploadFile(MultipartFile file);
	public void unzipFile(File zipFilepath, String unzipFilePath);
}
