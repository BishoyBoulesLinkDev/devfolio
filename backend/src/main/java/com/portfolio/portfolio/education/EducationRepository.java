package com.portfolio.portfolio.education;

import com.portfolio.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByUserOrderByStartYearDesc(User user);
    Optional<Education> findByIdAndUser(Long id, User user);
    List<Education> findByUserUsernameOrderByStartYearDesc(String username);
}
