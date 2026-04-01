package com.portfolio.portfolio.profile;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<Profile> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(profileService.getOrCreateProfile(user));
    }

    @PutMapping
    public ResponseEntity<Profile> updateProfile(@AuthenticationPrincipal User user,
                                                  @RequestBody ProfileDto dto) {
        return ResponseEntity.ok(profileService.updateProfile(user, dto));
    }
}
