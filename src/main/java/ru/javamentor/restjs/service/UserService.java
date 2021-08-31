package ru.javamentor.restjs.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.javamentor.restjs.models.Role;
import ru.javamentor.restjs.models.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    void save(User user);

    User findById(int id);

    void deleteById(int id);

    User getUserByUsername(String username);

    List<Role> findAllRoles();
}
