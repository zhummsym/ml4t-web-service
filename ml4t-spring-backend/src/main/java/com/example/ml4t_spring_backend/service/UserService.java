package com.example.ml4t_spring_backend.service;

import com.example.ml4t_spring_backend.exception.EmailTakenException;
import com.example.ml4t_spring_backend.exception.UserNotFoundException;
import com.example.ml4t_spring_backend.model.RegistrationRequest;
import com.example.ml4t_spring_backend.model.User;
import com.example.ml4t_spring_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("email:" + email);
        Optional<User> opt = userRepository.findByEmail(email);
        if (opt.isPresent()) {
            System.out.println(opt.get());
            return opt.get();
        } else {
            System.out.println("123");
            throw new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email));
        }
//        return userRepository.findByEmail(email).orElseThrow(() ->
//                new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public User addUser(User user) {

        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public User loginUser(String email, String password) throws AuthenticationException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("Invalid username or password.");
            }
            return user;
        } else {
            throw new BadCredentialsException("Invalid username or password.");
        }
    }


    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, RegistrationRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id " + id + " was not found"));
        if (request.getFirstName() != null && !request.getFirstName().isEmpty() && !Objects.equals(user.getFirstName(), request.getFirstName())) {
            user.setFirstName((request.getFirstName()));
        }
        if (request.getLastName() != null && !request.getLastName().isEmpty() && !Objects.equals(user.getLastName(), request.getLastName())) {
            user.setLastName((request.getLastName()));
        }
        if (request.getEmail() != null && !request.getEmail().isEmpty() && !Objects.equals(user.getEmail(), request.getEmail())) {
            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
            if (optionalUser.isPresent()) {
                User userExisted = optionalUser.get();
                if (!Objects.equals(userExisted.getId(), user.getId())) {
                    throw new EmailTakenException("email taken");
                }

            }
            user.setEmail((request.getEmail()));
        }
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {

            if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
                String encodedPassword = bCryptPasswordEncoder.encode(request.getPassword());
                user.setPassword(encodedPassword);
            }

        }
        return user;
    }
    public User findUserById (Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id " + id + " was not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
