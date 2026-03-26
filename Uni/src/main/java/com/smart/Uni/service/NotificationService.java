package com.smart.Uni.service;

import com.smart.Uni.dto.response.NotificationResponse;
import com.smart.Uni.entity.Booking;
import com.smart.Uni.entity.Notification;
import com.smart.Uni.entity.Ticket;
import com.smart.Uni.entity.User;
import com.smart.Uni.enums.NotificationType;
import com.smart.Uni.exception.ResourceNotFoundException;
import com.smart.Uni.repository.NotificationRepository;
import com.smart.Uni.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void notifyBookingApproved(Booking booking) {
        createNotification(booking.getUser(), NotificationType.BOOKING_APPROVED,
                "Your booking for " + booking.getResource().getName() + " has been approved.", booking.getId());
    }

    public void notifyBookingRejected(Booking booking) {
        createNotification(booking.getUser(), NotificationType.BOOKING_REJECTED,
                "Your booking for " + booking.getResource().getName() + " has been rejected.", booking.getId());
    }

    public void notifyTicketUpdated(Ticket ticket) {
        createNotification(ticket.getReporter(), NotificationType.TICKET_UPDATED,
                "Your ticket '" + ticket.getTitle() + "' status updated to: " + ticket.getStatus(), ticket.getId());
    }

    public void notifyTicketAssigned(Ticket ticket) {
        if (ticket.getAssignee() != null) {
            createNotification(ticket.getAssignee(), NotificationType.TICKET_ASSIGNED,
                    "Ticket '" + ticket.getTitle() + "' has been assigned to you.", ticket.getId());
        }
    }

    public List<NotificationResponse> getUserNotifications(String email) {
        User user = findUserByEmail(email);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    public long getUnreadCount(String email) {
        User user = findUserByEmail(email);
        return notificationRepository.countByUserIdAndReadFalse(user.getId());
    }

    public NotificationResponse markAsRead(Long id, String email) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        notification.setRead(true);
        return toResponse(notificationRepository.save(notification));
    }

    public void markAllAsRead(String email) {
        User user = findUserByEmail(email);
        List<Notification> unread = notificationRepository.findByUserIdAndReadFalse(user.getId());
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    private void createNotification(User user, NotificationType type, String message, Long relatedId) {
        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .message(message)
                .relatedId(relatedId)
                .build();
        notificationRepository.save(notification);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    private NotificationResponse toResponse(Notification n) {
        return NotificationResponse.builder()
                .id(n.getId())
                .type(n.getType())
                .message(n.getMessage())
                .read(n.getRead())
                .relatedId(n.getRelatedId())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
