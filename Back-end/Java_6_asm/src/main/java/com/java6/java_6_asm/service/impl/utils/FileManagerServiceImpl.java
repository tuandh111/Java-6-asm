package com.java6.java_6_asm.service.impl.utils;

import com.java6.java_6_asm.service.service.utils.FileManagerService;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileManagerServiceImpl implements FileManagerService {
    @Autowired
    ServletContext app;
    @Override
    public byte[] read(String folder,String name) {
        Path path = this.getPath(folder,name);
        try {
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<String> save(String folder,MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file: files){
            String name = System.currentTimeMillis()+file.getOriginalFilename();
            String filename=Integer.toHexString(name.hashCode())+name.substring(name.lastIndexOf("."));
            Path path =  this.getPath(folder,filename);
            try {
                file.transferTo(path);
                fileNames.add(filename);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
         return fileNames;
    }

    @Override
    public Path getPath(String folder, String filename) {
        File dir = Paths.get(app.getRealPath("/files/"),folder).toFile();
        if(!dir.exists()){
           // dir.mkdirs();
            boolean created = dir.mkdirs();
            if (!created) {
                // Xử lý khi việc tạo thư mục không thành công
                throw new RuntimeException("Failed to create directory: " + dir.getAbsolutePath());
            }
        }
        return Paths.get(dir.getAbsolutePath(),filename);
    }

    @Override
    public void delete(String folder, String name) {
        Path path = this.getPath(folder,name);
        path.toFile().delete();
    }

    @Override
    public List<String> list(String folder) {
        List<String> fileNames = new ArrayList<>();
        File dir=Paths.get(app.getRealPath("/files"),folder).toFile();
        if(dir.exists()){
            File[] files = dir.listFiles();
            for (File file:files){
                fileNames.add(file.getName());
            }
        }
        return fileNames;
    }
}
