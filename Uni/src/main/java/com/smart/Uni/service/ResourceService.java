package com.smart.Uni.service;

import com.smart.Uni.dto.request.ResourceRequest;
import com.smart.Uni.dto.response.ResourceResponse;
import com.smart.Uni.entity.Resource;
import com.smart.Uni.enums.ResourceStatus;
import com.smart.Uni.enums.ResourceType;
import com.smart.Uni.exception.ResourceNotFoundException;
import com.smart.Uni.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public List<ResourceResponse> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ResourceResponse getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        return toResponse(resource);
    }

    public List<ResourceResponse> searchResources(String name) {
        return resourceRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ResourceResponse> getResourcesByType(ResourceType type) {
        return resourceRepository.findByType(type).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ResourceResponse> getAvailableResources() {
        return resourceRepository.findByStatus(ResourceStatus.AVAILABLE).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ResourceResponse createResource(ResourceRequest request) {
        Resource resource = Resource.builder()
                .name(request.getName())
                .description(request.getDescription())
                .type(request.getType())
                .location(request.getLocation())
                .capacity(request.getCapacity())
                .status(request.getStatus() != null ? request.getStatus() : ResourceStatus.AVAILABLE)
                .build();
        return toResponse(resourceRepository.save(resource));
    }

    public ResourceResponse updateResource(Long id, ResourceRequest request) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        resource.setName(request.getName());
        resource.setDescription(request.getDescription());
        resource.setType(request.getType());
        resource.setLocation(request.getLocation());
        resource.setCapacity(request.getCapacity());
        if (request.getStatus() != null) resource.setStatus(request.getStatus());
        return toResponse(resourceRepository.save(resource));
    }

    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }

    private ResourceResponse toResponse(Resource r) {
        return ResourceResponse.builder()
                .id(r.getId())
                .name(r.getName())
                .description(r.getDescription())
                .type(r.getType())
                .location(r.getLocation())
                .capacity(r.getCapacity())
                .status(r.getStatus())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
