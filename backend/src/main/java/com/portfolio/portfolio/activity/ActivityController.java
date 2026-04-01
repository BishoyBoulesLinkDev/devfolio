package com.portfolio.portfolio.activity;

import com.portfolio.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(activityService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<Activity> create(@AuthenticationPrincipal User user,
                                            @Valid @RequestBody ActivityDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(activityService.create(user, dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> update(@AuthenticationPrincipal User user,
                                            @PathVariable Long id,
                                            @Valid @RequestBody ActivityDto dto) {
        return ResponseEntity.ok(activityService.update(user, id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        activityService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
