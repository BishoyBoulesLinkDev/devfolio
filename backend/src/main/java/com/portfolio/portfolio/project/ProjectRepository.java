package com.portfolio.portfolio.project;

import com.portfolio.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserOrderByDisplayOrderAsc(User user);
    Optional<Project> findByIdAndUser(Long id, User user);
    List<Project> findByUserUsernameOrderByDisplayOrderAsc(String username);
}
