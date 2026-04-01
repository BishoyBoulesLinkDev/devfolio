package com.portfolio.portfolio.education;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    public List<Education> getAll(User user) {
        return educationRepository.findByUserOrderByStartYearDesc(user);
    }

    public Education create(User user, EducationDto dto) {
        Education edu = Education.builder()
                .user(user)
                .institution(dto.getInstitution())
                .degree(dto.getDegree())
                .field(dto.getField())
                .startYear(dto.getStartYear())
                .endYear(dto.getEndYear())
                .description(dto.getDescription())
                .build();
        return educationRepository.save(edu);
    }

    public Education update(User user, Long id, EducationDto dto) {
        Education edu = educationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        edu.setInstitution(dto.getInstitution());
        edu.setDegree(dto.getDegree());
        edu.setField(dto.getField());
        edu.setStartYear(dto.getStartYear());
        edu.setEndYear(dto.getEndYear());
        edu.setDescription(dto.getDescription());
        return educationRepository.save(edu);
    }

    public void delete(User user, Long id) {
        Education edu = educationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        educationRepository.delete(edu);
    }
}
