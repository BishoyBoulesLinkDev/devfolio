package com.portfolio.portfolio.education;

import com.portfolio.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/educations")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping
    public ResponseEntity<List<Education>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(educationService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<Education> create(@AuthenticationPrincipal User user,
                                             @Valid @RequestBody EducationDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(educationService.create(user, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> update(@AuthenticationPrincipal User user,
                                             @PathVariable Long id,
                                             @Valid @RequestBody EducationDto dto) {
        return ResponseEntity.ok(educationService.update(user, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        educationService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
