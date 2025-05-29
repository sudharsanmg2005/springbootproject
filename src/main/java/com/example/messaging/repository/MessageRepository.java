package com.example.messaging.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.messaging.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
}