package com.portfolio.portfolio.profile;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public Profile getOrCreateProfile(User user) {
        return profileRepository.findByUser(user)
                .orElseGet(() -> profileRepository.save(
                        Profile.builder().user(user).build()
                ));
    }

    public Profile updateProfile(User user, ProfileDto dto) {
        Profile profile = getOrCreateProfile(user);
        profile.setFullName(dto.getFullName());
        profile.setBio(dto.getBio());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setLocation(dto.getLocation());
        profile.setWebsite(dto.getWebsite());
        profile.setGithub(dto.getGithub());
        profile.setLinkedin(dto.getLinkedin());
        profile.setTwitter(dto.getTwitter());
        return profileRepository.save(profile);
    }
}
