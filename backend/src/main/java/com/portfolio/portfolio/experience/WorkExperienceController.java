package com.portfolio.portfolio.experience;

import com.portfolio.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class WorkExperienceController {

    private final WorkExperienceService workExperienceService;

    @GetMapping
    public ResponseEntity<List<WorkExperience>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(workExperienceService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<WorkExperience> create(@AuthenticationPrincipal User user,
                                                   @Valid @RequestBody WorkExperienceDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workExperienceService.create(user, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkExperience> update(@AuthenticationPrincipal User user,
                                                   @PathVariable Long id,
                                                   @Valid @RequestBody WorkExperienceDto dto) {
        return ResponseEntity.ok(workExperienceService.update(user, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        workExperienceService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
