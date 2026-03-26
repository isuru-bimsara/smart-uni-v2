package com.smart.Uni.controller;

import com.smart.Uni.dto.request.ResourceRequest;
import com.smart.Uni.dto.response.ApiResponse;
import com.smart.Uni.dto.response.ResourceResponse;
import com.smart.Uni.enums.ResourceType;
import com.smart.Uni.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResourceResponse>>> getAllResources(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) ResourceType type) {
        List<ResourceResponse> resources;
        if (search != null) resources = resourceService.searchResources(search);
        else if (type != null) resources = resourceService.getResourcesByType(type);
        else resources = resourceService.getAllResources();
        return ResponseEntity.ok(ApiResponse.success(resources));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResourceResponse>> getResourceById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(resourceService.getResourceById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ResourceResponse>> createResource(@Valid @RequestBody ResourceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Resource created", resourceService.createResource(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ResourceResponse>> updateResource(
            @PathVariable Long id, @Valid @RequestBody ResourceRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Resource updated", resourceService.updateResource(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok(ApiResponse.success("Resource deleted", null));
    }
}
