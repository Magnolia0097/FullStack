package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.exception.UserNotFoundException;
import com.example.fullstackbackend.model.User;
import com.example.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page; // Added import
import org.springframework.data.domain.Pageable; // Added import

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    Page<User> getAllusers(Pageable pageable){ // Added Pageable parameter, changed return type
        return userRepository.findAll(pageable); // Call findAll with pageable
    }


    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    //업데이트
    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        // First, check if the user exists. If not, UserNotFoundException will be thrown.
        userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Call the custom update method
        userRepository.updateUserDetails(id, newUser.getUsername(), newUser.getName(), newUser.getEmail());

        // Fetch and return the updated user
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id)); // Should not happen if update was successful and ID is valid
    }

    //삭제
    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted success.";
    }
}
