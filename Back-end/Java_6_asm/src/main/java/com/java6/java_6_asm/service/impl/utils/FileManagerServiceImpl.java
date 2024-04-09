package com.java6.java_6_asm.service.impl.utils;

import com.java6.java_6_asm.entities.product.ProductImage;
import com.java6.java_6_asm.repositories.product.ProductImageRepository;
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
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FileManagerServiceImpl implements FileManagerService {
    @Autowired
    ServletContext app;
    @Autowired
    ProductImageRepository productImageRepository;
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
    public void move(String folder) {
       // Path uploadImagePath = Paths.get(app.getRealPath("/files/"), "uploadImage");
        Path projectRoot = Paths.get(""); // Đây là một đường dẫn tương đối trỏ đến thư mục gốc của dự án

        // Xác định đường dẫn của thư mục uploadImage trong dự án
        Path uploadImagePath = projectRoot.resolve("files").resolve("uploadImage");
        // Kiểm tra nếu thư mục uploadImage không tồn tại thì tạo mới
        if (!Files.exists(uploadImagePath)) {
            try {
                Files.createDirectories(uploadImagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to create directory: " + uploadImagePath.toString(), e);
            }
        }

        // Xác định đường dẫn của thư mục gốc
        Path sourceFolderPath = Paths.get(app.getRealPath("/files/"), folder);
        try {
            if (!Files.exists(sourceFolderPath) || !Files.isDirectory(sourceFolderPath) || !hasFiles(sourceFolderPath)) {
                return; // Không cần di chuyển nếu thư mục gốc không tồn tại hoặc rỗng
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // Di chuyển tất cả các tệp từ thư mục gốc sang thư mục uploadImage
        try {
            Files.walk(sourceFolderPath)
                    .filter(Files::isRegularFile)
                    .forEach(sourceFile -> {
                        try {
                            // Xác định đường dẫn đích cho tệp
                            Path targetFile = uploadImagePath.resolve(sourceFolderPath.relativize(sourceFile));
                            // Di chuyển tệp
                            Files.move(sourceFile, targetFile, StandardCopyOption.REPLACE_EXISTING);
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to move file: " + sourceFile.toString(), e);
                        }
                    });

            this.cleanUploadImage("uploadImage");
        } catch (IOException e) {
            throw new RuntimeException("Failed to walk directory: " + sourceFolderPath.toString(), e);
        }
    }

    @Override
    public boolean hasFiles(Path directory) throws IOException {
        try (Stream<Path> stream = Files.list(directory)) {
            return stream.findFirst().isPresent();
        }
    }

    @Override
    public byte[] readImgProd(String folder, String name) {
        byte[] imageData = null;

        // Đường dẫn đến file hình ảnh trong thư mục uploadImage
        Path imagePath = Paths.get("", "files", folder, name);

        try {
            // Đọc dữ liệu của hình ảnh
            imageData = Files.readAllBytes(imagePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read image file: " + imagePath.toString(), e);
        }

        return imageData;
    }

    @Override
    public void cleanUploadImage(String folder) {
        System.out.println("cleannnnn");
        List<ProductImage> listProductImage =productImageRepository.findAll();
        List<String> fileNames = this.list(folder);
        List<String> filesToDelete = new ArrayList<>();

        for (String file : fileNames) {
            boolean found = false;
            for (ProductImage productImage : listProductImage) {
                if (productImage.getImageName().equals(file)) {
                    found = true;
                    break;
                }
            }
            // Nếu không tìm thấy trùng khớp, thêm file vào danh sách xóa
            if (!found) {
                filesToDelete.add(file);
            }
        }
        for (String fileToDelete : filesToDelete) {
            System.out.println("fileToDelete "+fileToDelete);
            this.delete(folder, fileToDelete);
        }
        System.out.println("cleannnnn okkkk");
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
