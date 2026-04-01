package com.portfolio.portfolio.skill;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAll(User user) {
        return skillRepository.findByUserOrderByCategoryAscNameAsc(user);
    }

    public Skill create(User user, SkillDto dto) {
        Skill skill = Skill.builder()
                .user(user)
                .name(dto.getName())
                .category(dto.getCategory())
                .proficiency(dto.getProficiency())
                .build();
        return skillRepository.save(skill);
    }

    public Skill update(User user, Long id, SkillDto dto) {
        Skill skill = skillRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        skill.setProficiency(dto.getProficiency());
        return skillRepository.save(skill);
    }

    public void delete(User user, Long id) {
        Skill skill = skillRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        skillRepository.delete(skill);
    }
}
