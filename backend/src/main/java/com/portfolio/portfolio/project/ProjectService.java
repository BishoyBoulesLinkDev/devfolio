package com.portfolio.portfolio.project;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> getAll(User user) {
        return projectRepository.findByUserOrderByDisplayOrderAsc(user);
    }

    public Project create(User user, ProjectDto dto) {
        Project project = Project.builder()
                .user(user)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .techStack(dto.getTechStack())
                .repoUrl(dto.getRepoUrl())
                .liveUrl(dto.getLiveUrl())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder())
                .build();
        return projectRepository.save(project);
    }

    public Project update(User user, Long id, ProjectDto dto) {
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setTechStack(dto.getTechStack());
        project.setRepoUrl(dto.getRepoUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setDisplayOrder(dto.getDisplayOrder());
        return projectRepository.save(project);
    }

    public void delete(User user, Long id) {
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        projectRepository.delete(project);
    }
}
