package com.skillsoft.kcedit.component.dao;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.skillsoft.kcedit.component.model.User;


/**
*
* Repository class for the User entity
*
*/
@Repository
public class UserRepository {

   /**
    * finds a user given its username
    *
    * @param username - the username of the searched user
    * @return  a matching user, or null if no user found.
    */
   public User findUserByUsername(String username) {
       
       User user = new User("admin123", new BCryptPasswordEncoder().encode("Admin123"), "test@test.com");

       return user;
   }
}
