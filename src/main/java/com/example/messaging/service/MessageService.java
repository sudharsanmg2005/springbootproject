package com.example.messaging.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.messaging.model.Message;
import com.example.messaging.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}