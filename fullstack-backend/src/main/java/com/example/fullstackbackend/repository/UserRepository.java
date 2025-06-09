package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.model.User;
import org.springframework.data.repository.PagingAndSortingRepository; // Import PagingAndSortingRepository
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

// Changed JpaRepository to PagingAndSortingRepository
public interface UserRepository extends PagingAndSortingRepository<User,Long> {

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.username = :username, u.name = :name, u.email = :email WHERE u.id = :userId")
    void updateUserDetails(@Param("userId") Long userId, @Param("username") String username, @Param("name") String name, @Param("email") String email);
}
