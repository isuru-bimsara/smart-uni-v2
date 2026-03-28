//package com.smart.Uni.controller;
//
//import com.smart.Uni.dto.request.ResourceRequest;
//import com.smart.Uni.dto.response.ApiResponse;
//import com.smart.Uni.dto.response.ResourceResponse;
//import com.smart.Uni.enums.ResourceType;
//import com.smart.Uni.service.ResourceService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/resources")
//@RequiredArgsConstructor
//public class ResourceController {
//
//    private final ResourceService resourceService;
//
//    @GetMapping
//    public ResponseEntity<ApiResponse<List<ResourceResponse>>> getAllResources(
//            @RequestParam(required = false) String search,
//            @RequestParam(required = false) ResourceType type) {
//        List<ResourceResponse> resources;
//        if (search != null) resources = resourceService.searchResources(search);
//        else if (type != null) resources = resourceService.getResourcesByType(type);
//        else resources = resourceService.getAllResources();
//        return ResponseEntity.ok(ApiResponse.success(resources));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ApiResponse<ResourceResponse>> getResourceById(@PathVariable Long id) {
//        return ResponseEntity.ok(ApiResponse.success(resourceService.getResourceById(id)));
//    }
//
//    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ApiResponse<ResourceResponse>> createResource(@Valid @RequestBody ResourceRequest request) {
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(ApiResponse.success("Resource created", resourceService.createResource(request)));
//    }
//
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ApiResponse<ResourceResponse>> updateResource(
//            @PathVariable Long id, @Valid @RequestBody ResourceRequest request) {
//        return ResponseEntity.ok(ApiResponse.success("Resource updated", resourceService.updateResource(id, request)));
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ApiResponse<Void>> deleteResource(@PathVariable Long id) {
//        resourceService.deleteResource(id);
//        return ResponseEntity.ok(ApiResponse.success("Resource deleted", null));
//    }
//}

package com.smart.Uni.controller;

import com.smart.Uni.dto.request.ResourceRequest;
import com.smart.Uni.dto.response.ResourceResponse;
import com.smart.Uni.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ResourceRequest request) {
        return ResponseEntity.ok(resourceService.createResource(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ResourceRequest request) {
        return ResponseEntity.ok(resourceService.updateResource(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok("Resource deleted");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {

        try {
            // ✅ use property path
            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs(); // create C:/uploads
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            File destination = new File(dir, fileName);

            file.transferTo(destination); // ✅ now saves correctly

            String fileUrl = "/uploads/" + fileName;

            return ResponseEntity.ok(fileUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }

//    @GetMapping
//    public ResponseEntity<List<ResourceResponse>> getAll() {
//        return ResponseEntity.ok(resourceService.getAllResources());
//    }

    @GetMapping("/available")
    public ResponseEntity<List<ResourceResponse>> getAvailable() {
        return ResponseEntity.ok(resourceService.getAllResources()); // or filter later
    }
}