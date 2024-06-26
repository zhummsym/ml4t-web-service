package com.example.ml4t_spring_backend.controller;

import com.example.ml4t_spring_backend.exception.EmailTakenException;
import com.example.ml4t_spring_backend.exception.UserNotFoundException;
import com.example.ml4t_spring_backend.model.LoginRequest;
import com.example.ml4t_spring_backend.model.RegistrationRequest;
import com.example.ml4t_spring_backend.model.User;
import com.example.ml4t_spring_backend.service.RegistrationService;
import com.example.ml4t_spring_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "ml4t/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final RegistrationService registrationService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegistrationRequest request) {

            User user = registrationService.register(request);
            return new ResponseEntity<>(user, HttpStatus.CREATED);


    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {

            User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers () {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById (@PathVariable("id") Long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,
                                           @RequestBody RegistrationRequest request) {

        User updateUser = userService.updateUser(id, request);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {

            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);

    }
}
