package com.portfolio.portfolio.skill;

import com.portfolio.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserOrderByCategoryAscNameAsc(User user);
    Optional<Skill> findByIdAndUser(Long id, User user);
    List<Skill> findByUserUsernameOrderByCategoryAscNameAsc(String username);
}
