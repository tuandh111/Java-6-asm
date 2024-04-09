package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.service.service.utils.FileManagerService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class FileManagerController {
    @Autowired
    FileManagerService fileManagerService;

    @GetMapping("/auth/twobee/{folder}/{file}")
    public byte[] dowmload(@PathVariable("folder") String folder, @PathVariable("file") String file){
        return fileManagerService.read(folder,file);
    }

    @GetMapping("/management/twobee/{folder}")
    public  List<String> list (@PathVariable("folder") String folder){
        return fileManagerService.list(folder);
    }
    @PostMapping("/management/twobee/{folder}")
    public  List<String> upload (@PathVariable("folder") String folder, @PathParam("files") MultipartFile[] files){
        return fileManagerService.save(folder,files);
    }

    @DeleteMapping("/management/twobee/{folder}/{file}")
    public void delete(@PathVariable("folder") String folder, @PathVariable("file") String file){
         fileManagerService.delete(folder,file);
    }

    @PostMapping("/management/twobee/move/{folder}")
    public void move(@PathVariable("folder") String folder) {
        System.out.println("move folder " +folder);
        fileManagerService.move(folder);
    }

    @GetMapping("/auth/twobee/uploadImage/{file}")
    public byte[] dowmloadImagesForProduct(@PathVariable("file") String file) {
        String folder = "uploadImage"; // Đọc tệp từ thư mục uploadImage
        return fileManagerService.readImgProd(folder, file);
    }

    @GetMapping("/management/twobee/uploadImage")
    public  List<String> listUploadImage (){
        String folder = "uploadImage";
        return fileManagerService.list(folder);
    }
}
