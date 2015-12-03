package com.skillsoft.kcedit.component.model;

/**
 * User model
 */
public class User {
    private String username;

    private String passwordDigest;

    private String email;

    
    public User(String username, String passwordDigest, String email){
        this.username = username;
        this.passwordDigest = passwordDigest;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordDigest() {
        return passwordDigest;
    }

    public void setPasswordDigest(String passwordDigest) {
        this.passwordDigest = passwordDigest;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
