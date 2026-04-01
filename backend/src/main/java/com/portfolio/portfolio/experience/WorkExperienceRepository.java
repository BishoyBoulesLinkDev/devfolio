package com.portfolio.portfolio.experience;

import com.portfolio.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    List<WorkExperience> findByUserOrderByDisplayOrderAsc(User user);
    Optional<WorkExperience> findByIdAndUser(Long id, User user);
    List<WorkExperience> findByUserUsernameOrderByDisplayOrderAsc(String username);
}
