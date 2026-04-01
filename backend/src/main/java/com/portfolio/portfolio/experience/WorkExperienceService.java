package com.portfolio.portfolio.experience;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;

    public List<WorkExperience> getAll(User user) {
        return workExperienceRepository.findByUserOrderByDisplayOrderAsc(user);
    }

    public WorkExperience create(User user, WorkExperienceDto dto) {
        WorkExperience exp = WorkExperience.builder()
                .user(user)
                .company(dto.getCompany())
                .role(dto.getRole())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .isCurrent(dto.getIsCurrent())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder())
                .build();
        return workExperienceRepository.save(exp);
    }

    public WorkExperience update(User user, Long id, WorkExperienceDto dto) {
        WorkExperience exp = workExperienceRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        exp.setCompany(dto.getCompany());
        exp.setRole(dto.getRole());
        exp.setStartDate(dto.getStartDate());
        exp.setEndDate(dto.getEndDate());
        exp.setIsCurrent(dto.getIsCurrent());
        exp.setDescription(dto.getDescription());
        exp.setDisplayOrder(dto.getDisplayOrder());
        return workExperienceRepository.save(exp);
    }

    public void delete(User user, Long id) {
        WorkExperience exp = workExperienceRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        workExperienceRepository.delete(exp);
    }
}
