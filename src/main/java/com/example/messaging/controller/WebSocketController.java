package com.example.messaging.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.messaging.model.Message;
import com.example.messaging.service.MessageService;

@Controller
public class WebSocketController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage")
    public void broadcastMessage(@Payload Message message) {
        Message savedMessage = messageService.saveMessage(message);
        messagingTemplate.convertAndSend("/topic/messages/" + message.getSender(), savedMessage);
        messagingTemplate.convertAndSend("/topic/messages/" + message.getReceiver(), savedMessage);
    }
}