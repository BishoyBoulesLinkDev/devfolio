package com.portfolio.portfolio.skill;

import com.portfolio.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(skillService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<Skill> create(@AuthenticationPrincipal User user,
                                         @Valid @RequestBody SkillDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.create(user, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@AuthenticationPrincipal User user,
                                         @PathVariable Long id,
                                         @Valid @RequestBody SkillDto dto) {
        return ResponseEntity.ok(skillService.update(user, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        skillService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
