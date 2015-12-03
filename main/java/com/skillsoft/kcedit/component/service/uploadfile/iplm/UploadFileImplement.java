package com.skillsoft.kcedit.component.service.uploadfile.iplm;

import java.io.File;
import java.io.InputStream;

import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;

import org.apache.ant.compress.taskdefs.Unzip;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import com.skillsoft.kcedit.component.service.uploadfile.UploadFileToServer;

public class UploadFileImplement implements UploadFileToServer {

	@Override
	public String uploadFile(MultipartFile file) {

		String name = file.getOriginalFilename();
		if (!file.isEmpty()) {
			try {
				InputStream inputStream = file.getInputStream();
				// Creating the directory to store file
				String rootPath = System.getProperty("catalina.home");
				File folderDir = new File(rootPath + File.separator
						+ "tmpFiles");
				File fileNameDir = new File(rootPath + File.separator
						+ "tmpFiles" + File.separator + name);
				File dirUnZip = new File(rootPath + File.separator + "packages");
				File outputFile = new File(rootPath + File.separator + "Output");
				if (!folderDir.exists()) {
					folderDir.mkdirs();
				}
				if (!dirUnZip.exists()) {
					dirUnZip.mkdirs();
				}
				if (!outputFile.exists()) {
					outputFile.mkdirs();
				}

				// Create the file on server
				File serverFile = new File(folderDir.getAbsolutePath()
						+ File.separator + name);
				File serverUnZipFile = new File(dirUnZip.getAbsolutePath());
				FileUtils.copyInputStreamToFile(inputStream, serverFile);
				unzipFile(fileNameDir, dirUnZip.toString());
				System.out.println("Server UnzipFile Location="
						+ serverUnZipFile.getAbsolutePath());
				return "You successfully uploaded file=" + name;
			} catch (Exception e) {
				return "You failed to upload " + name + " => " + e.getMessage();
			}
		} else {
			return "You failed to upload " + name
					+ " because the file was empty.";
		}

	}

	@Override
	public void unzipFile(File zipFilepath, String unzipFilePath) {
		   // String password = "password";

		    try {
		         ZipFile zipFile = new ZipFile(zipFilepath);
		         zipFile.extractAll(unzipFilePath);
		    } catch (ZipException e) {
		        e.printStackTrace();
		    }

	}

}
