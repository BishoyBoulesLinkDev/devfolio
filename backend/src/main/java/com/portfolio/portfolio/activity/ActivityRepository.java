package com.portfolio.portfolio.activity;

import com.portfolio.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserOrderByDisplayOrderAsc(User user);
    Optional<Activity> findByIdAndUser(Long id, User user);
    List<Activity> findByUserUsernameOrderByDisplayOrderAsc(String username);
}
