package com.example.ml4t_spring_backend.service;

import com.example.ml4t_spring_backend.model.RegistrationRequest;
import com.example.ml4t_spring_backend.model.User;
import com.example.ml4t_spring_backend.model.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final UserService userService;

    public User register (RegistrationRequest request) {
        return userService.addUser(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        UserRole.USER
                )
        );
    }
}
