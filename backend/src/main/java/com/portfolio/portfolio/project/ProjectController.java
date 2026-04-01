package com.portfolio.portfolio.project;

import com.portfolio.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(projectService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<Project> create(@AuthenticationPrincipal User user,
                                           @Valid @RequestBody ProjectDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.create(user, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@AuthenticationPrincipal User user,
                                           @PathVariable Long id,
                                           @Valid @RequestBody ProjectDto dto) {
        return ResponseEntity.ok(projectService.update(user, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        projectService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
