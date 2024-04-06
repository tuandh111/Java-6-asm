package com.java6.java_6_asm.service.service.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.util.List;


public interface FileManagerService {
    byte[] read(String folder,String name);
    List<String> save(String folder,MultipartFile[] files);

    Path getPath(String folder, String filename);

    void delete(String folder, String filename);
    List<String> list(String folder);
}
