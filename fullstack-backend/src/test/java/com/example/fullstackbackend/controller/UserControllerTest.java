package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.exception.UserNotFoundException;
import com.example.fullstackbackend.model.User;
import com.example.fullstackbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*; // For Page, Pageable, PageRequest, PageImpl

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateUser_Success() {
        Long userId = 1L;
        User existingUser = new User(); // Represents user before update, or as found by first findById
        existingUser.setId(userId);
        existingUser.setUsername("oldUsername");
        existingUser.setName("Old Name");
        existingUser.setEmail("old@example.com");

        User newUserDetails = new User(); // These are the details from the request body
        newUserDetails.setUsername("newUsername");
        newUserDetails.setName("New Name");
        newUserDetails.setEmail("new@example.com");

        User expectedUserAfterUpdate = new User(); // This is what findById should return after the update
        expectedUserAfterUpdate.setId(userId);
        expectedUserAfterUpdate.setUsername(newUserDetails.getUsername());
        expectedUserAfterUpdate.setName(newUserDetails.getName());
        expectedUserAfterUpdate.setEmail(newUserDetails.getEmail());

        // Mocking the sequence of findById calls:
        // 1. First call in updateUser (for existence check) returns existingUser.
        // 2. Second call in updateUser (to return the entity after modification) returns expectedUserAfterUpdate.
        when(userRepository.findById(userId))
            .thenReturn(Optional.of(existingUser))          // For the initial check
            .thenReturn(Optional.of(expectedUserAfterUpdate)); // For the fetch after updateUserDetails

        // Mock the void updateUserDetails method
        doNothing().when(userRepository).updateUserDetails(
            eq(userId),
            eq(newUserDetails.getUsername()),
            eq(newUserDetails.getName()),
            eq(newUserDetails.getEmail())
        );

        User result = userController.updateUser(newUserDetails, userId);

        assertNotNull(result);
        assertEquals(expectedUserAfterUpdate.getUsername(), result.getUsername());
        assertEquals(expectedUserAfterUpdate.getName(), result.getName());
        assertEquals(expectedUserAfterUpdate.getEmail(), result.getEmail());

        // Verify findById was called twice
        verify(userRepository, times(2)).findById(userId);
        // Verify updateUserDetails was called once with correct parameters
        verify(userRepository).updateUserDetails(userId, newUserDetails.getUsername(), newUserDetails.getName(), newUserDetails.getEmail());
    }

    @Test
    void testUpdateUser_UserNotFound() {
        Long userId = 1L;
        User newUserDetails = new User();
        newUserDetails.setUsername("newUsername");
        newUserDetails.setName("New Name");
        newUserDetails.setEmail("new@example.com");

        // Only one call to findById will happen, which returns empty
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            userController.updateUser(newUserDetails, userId);
        });

        // Verify findById was called once
        verify(userRepository).findById(userId);
        // Verify updateUserDetails was never called
        verify(userRepository, never()).updateUserDetails(anyLong(), anyString(), anyString(), anyString());
    }

    @Test
    void testGetAllUsers_Pagination() {
        // Prepare Pageable object for the request
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());

        // Prepare list of users and Page object to be returned by the repository
        User user1 = new User();
        user1.setId(1L);
        user1.setName("Alice");
        user1.setUsername("alice");
        user1.setEmail("alice@example.com");

        User user2 = new User();
        user2.setId(2L);
        user2.setName("Bob");
        user2.setUsername("bob");
        user2.setEmail("bob@example.com");

        List<User> userList = Arrays.asList(user1, user2);
        // Create a PageImpl: content, pageable, total elements
        Page<User> userPage = new PageImpl<>(userList, pageable, userList.size());

        // Mock repository call
        when(userRepository.findAll(pageable)).thenReturn(userPage);

        // Call the controller method
        Page<User> result = userController.getAllusers(pageable);

        // Assertions
        assertNotNull(result);
        assertEquals(userPage.getTotalPages(), result.getTotalPages(), "Total pages should match");
        assertEquals(userPage.getTotalElements(), result.getTotalElements(), "Total elements should match");
        assertEquals(userPage.getNumber(), result.getNumber(), "Page number should match");
        assertEquals(userList.size(), result.getContent().size(), "Number of users on page should match");
        assertEquals(userList.get(0).getName(), result.getContent().get(0).getName(), "User data should match");
        assertEquals(pageable.getSort(), result.getPageable().getSort(), "Sort parameters should match");


        // Verify repository method was called
        verify(userRepository).findAll(pageable);
    }
}
