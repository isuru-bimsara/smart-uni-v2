////package com.smart.Uni.service;
////
////import com.smart.Uni.dto.request.BookingRequest;
////import com.smart.Uni.dto.response.BookingResponse;
////import com.smart.Uni.entity.Booking;
////import com.smart.Uni.entity.Resource;
////import com.smart.Uni.entity.User;
////import com.smart.Uni.enums.BookingStatus;
////import com.smart.Uni.exception.BookingConflictException;
////import com.smart.Uni.exception.ResourceNotFoundException;
////import com.smart.Uni.exception.UnauthorizedException;
////import com.smart.Uni.repository.BookingRepository;
////import com.smart.Uni.repository.ResourceRepository;
////import com.smart.Uni.repository.UserRepository;
////import lombok.RequiredArgsConstructor;
////import org.springframework.stereotype.Service;
////import java.util.Base64;
////import java.util.List;
////import java.util.stream.Collectors;
////
////@Service
////@RequiredArgsConstructor
////public class BookingService {
////
////    private final BookingRepository bookingRepository;
////    private final ResourceRepository resourceRepository;
////    private final UserRepository userRepository;
////    private final NotificationService notificationService;
////
////    public BookingResponse createBooking(BookingRequest request, String email) {
////        User user = findUserByEmail(email);
////        Resource resource = resourceRepository.findById(request.getResourceId())
////                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
////
////        if (request.getEndTime().isBefore(request.getStartTime()) ||
////            request.getEndTime().isEqual(request.getStartTime())) {
////            throw new IllegalArgumentException("End time must be after start time");
////        }
////
////        List<Booking> conflicts = bookingRepository.findConflictingBookings(
////                resource.getId(), request.getStartTime(), request.getEndTime());
////        if (!conflicts.isEmpty()) {
////            throw new BookingConflictException("Resource is already booked for this time slot");
////        }
////
////        String qrCode = Base64.getEncoder().encodeToString(
////                ("BOOKING:" + user.getId() + ":" + resource.getId() + ":" + request.getStartTime()).getBytes());
////
////        Booking booking = Booking.builder()
////                .user(user)
////                .resource(resource)
////                .startTime(request.getStartTime())
////                .endTime(request.getEndTime())
////                .purpose(request.getPurpose())
////                .qrCode(qrCode)
////                .build();
////        return toResponse(bookingRepository.save(booking));
////    }
////
////    public List<BookingResponse> getUserBookings(String email) {
////        User user = findUserByEmail(email);
////        return bookingRepository.findByUserId(user.getId()).stream()
////                .map(this::toResponse).collect(Collectors.toList());
////    }
////
////    public List<BookingResponse> getAllBookings() {
////        return bookingRepository.findAll().stream()
////                .map(this::toResponse).collect(Collectors.toList());
////    }
////
////    public BookingResponse getBookingById(Long id) {
////        return toResponse(findBookingById(id));
////    }
////
////    public BookingResponse approveBooking(Long id) {
////        Booking booking = findBookingById(id);
////        if (booking.getStatus() != BookingStatus.PENDING) {
////            throw new IllegalArgumentException("Only PENDING bookings can be approved");
////        }
////        booking.setStatus(BookingStatus.APPROVED);
////        Booking saved = bookingRepository.save(booking);
////        notificationService.notifyBookingApproved(saved);
////        return toResponse(saved);
////    }
////
////    public BookingResponse rejectBooking(Long id) {
////        Booking booking = findBookingById(id);
////        if (booking.getStatus() != BookingStatus.PENDING) {
////            throw new IllegalArgumentException("Only PENDING bookings can be rejected");
////        }
////        booking.setStatus(BookingStatus.REJECTED);
////        Booking saved = bookingRepository.save(booking);
////        notificationService.notifyBookingRejected(saved);
////        return toResponse(saved);
////    }
////
////    public BookingResponse cancelBooking(Long id, String email) {
////        Booking booking = findBookingById(id);
////        User user = findUserByEmail(email);
////        if (!booking.getUser().getId().equals(user.getId())) {
////            throw new UnauthorizedException("You can only cancel your own bookings");
////        }
////        if (booking.getStatus() == BookingStatus.CANCELLED) {
////            throw new IllegalArgumentException("Booking is already cancelled");
////        }
////        booking.setStatus(BookingStatus.CANCELLED);
////        return toResponse(bookingRepository.save(booking));
////    }
////
////    private Booking findBookingById(Long id) {
////        return bookingRepository.findById(id)
////                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
////    }
////
////    private User findUserByEmail(String email) {
////        return userRepository.findByEmail(email)
////                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
////    }
////
////    private BookingResponse toResponse(Booking b) {
////        return BookingResponse.builder()
////                .id(b.getId())
////                .userId(b.getUser().getId())
////                .userName(b.getUser().getName())
////                .resourceId(b.getResource().getId())
////                .resourceName(b.getResource().getName())
////                .startTime(b.getStartTime())
////                .endTime(b.getEndTime())
////                .status(b.getStatus())
////                .purpose(b.getPurpose())
////                .qrCode(b.getQrCode())
////                .createdAt(b.getCreatedAt())
////                .build();
////    }
////}
//
//
//package com.smart.Uni.service;
//
//import com.smart.Uni.dto.request.BookingRequest;
//import com.smart.Uni.dto.response.BookingResponse;
//import com.smart.Uni.entity.Booking;
//import com.smart.Uni.entity.Resource;
//import com.smart.Uni.entity.User;
//import com.smart.Uni.enums.BookingStatus;
//import com.smart.Uni.exception.BookingConflictException;
//import com.smart.Uni.repository.BookingRepository;
//import com.smart.Uni.repository.ResourceRepository;
//import com.smart.Uni.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class BookingService {
//
//    private final BookingRepository bookingRepository;
//    private final ResourceRepository resourceRepository;
//    private final UserRepository userRepository;
//
//    @Transactional
//    public BookingResponse createBooking(BookingRequest request, String username) {
//
//        User user = userRepository.findByEmail(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Resource resource = resourceRepository.findById(request.getResourceId())
//                .orElseThrow(() -> new RuntimeException("Resource not found"));
//
//        // Check conflicts
//        List<Booking> conflicts = bookingRepository.findConflictingBookings(
//                resource.getId(), request.getStartTime(), request.getEndTime()
//        );
//        if (!conflicts.isEmpty()) {
//            throw new BookingConflictException("Resource already booked for this time slot");
//        }
//
//        Booking booking = Booking.builder()
//                .user(user)
//                .resource(resource)
//                .startTime(request.getStartTime())
//                .endTime(request.getEndTime())
//                .purpose(request.getPurpose())
//                .status(BookingStatus.PENDING)
//                .build();
//
//        Booking saved = bookingRepository.save(booking);
//
//        return mapToResponse(saved);
//    }
//
//    public List<BookingResponse> getUserBookings(String username) {
//        User user = userRepository.findByEmail(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return bookingRepository.findByUserId(user.getId())
//                .stream().map(this::mapToResponse).collect(Collectors.toList());
//    }
//
//    private BookingResponse mapToResponse(Booking b) {
//        return BookingResponse.builder()
//                .id(b.getId())
//                .userId(b.getUser().getId())
//                .userName(b.getUser().getName())
//                .resourceId(b.getResource().getId())
//                .resourceName(b.getResource().getName())
//                .startTime(b.getStartTime())
//                .endTime(b.getEndTime())
//                .status(b.getStatus())
//                .purpose(b.getPurpose())
//                .createdAt(b.getCreatedAt())
//                .build();
//    }
//}


package com.smart.Uni.service;

import com.smart.Uni.dto.request.BookingRequest;
import com.smart.Uni.dto.response.BookingResponse;
import com.smart.Uni.entity.Booking;
import com.smart.Uni.entity.Resource;
import com.smart.Uni.entity.User;
import com.smart.Uni.enums.BookingStatus;
import com.smart.Uni.exception.BookingConflictException;
import com.smart.Uni.repository.BookingRepository;
import com.smart.Uni.repository.ResourceRepository;
import com.smart.Uni.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request, String username) {

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        // Check conflicts
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
                resource.getId(), request.getStartTime(), request.getEndTime()
        );
        if (!conflicts.isEmpty()) {
            throw new BookingConflictException("Resource already booked for this time slot");
        }

        Booking booking = Booking.builder()
                .user(user)
                .resource(resource)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .purpose(request.getPurpose())
                .status(BookingStatus.PENDING)
                .build();

        Booking saved = bookingRepository.save(booking);

        return mapToResponse(saved);
    }

    public List<BookingResponse> getUserBookings(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUserId(user.getId())
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // ✅ Missing method - Get all bookings
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // ✅ Missing method - Get booking by ID
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return mapToResponse(booking);
    }

    // ✅ Missing method - Approve booking
    @Transactional
    public BookingResponse approveBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        booking.setStatus(BookingStatus.APPROVED);
        Booking updated = bookingRepository.save(booking);

        return mapToResponse(updated);
    }

    // ✅ Missing method - Reject booking
    @Transactional
    public BookingResponse rejectBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        booking.setStatus(BookingStatus.REJECTED);
        Booking updated = bookingRepository.save(booking);

        return mapToResponse(updated);
    }

    // ✅ Missing method - Cancel booking (by user)
    @Transactional
    public BookingResponse cancelBooking(Long id, String username) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify that the booking belongs to the user trying to cancel it
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only cancel your own bookings");
        }

        // Only PENDING bookings can be cancelled
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only pending bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updated = bookingRepository.save(booking);

        return mapToResponse(updated);
    }

    public List<BookingResponse> getBookingsByResource(Long resourceId) {
        return bookingRepository.findAll()
                .stream()
                .filter(b -> b.getResource().getId().equals(resourceId))
                .filter(b -> b.getStatus() != BookingStatus.CANCELLED && b.getStatus() != BookingStatus.REJECTED)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BookingResponse mapToResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .userId(b.getUser().getId())
                .userName(b.getUser().getName())
                .resourceId(b.getResource().getId())
                .resourceName(b.getResource().getName())
                .startTime(b.getStartTime())
                .endTime(b.getEndTime())
                .status(b.getStatus())
                .purpose(b.getPurpose())
                .createdAt(b.getCreatedAt())
                .build();
    }
}