package com.portfolio.portfolio;

import com.portfolio.portfolio.activity.Activity;
import com.portfolio.portfolio.activity.ActivityRepository;
import com.portfolio.portfolio.education.Education;
import com.portfolio.portfolio.education.EducationRepository;
import com.portfolio.portfolio.experience.WorkExperience;
import com.portfolio.portfolio.experience.WorkExperienceRepository;
import com.portfolio.portfolio.profile.Profile;
import com.portfolio.portfolio.profile.ProfileRepository;
import com.portfolio.portfolio.project.Project;
import com.portfolio.portfolio.project.ProjectRepository;
import com.portfolio.portfolio.skill.Skill;
import com.portfolio.portfolio.skill.SkillRepository;
import com.portfolio.user.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio/public")
@RequiredArgsConstructor
public class PublicPortfolioController {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final EducationRepository educationRepository;
    private final ActivityRepository activityRepository;

    @GetMapping("/{username}")
    public ResponseEntity<PublicPortfolioResponse> getPublicPortfolio(@PathVariable String username) {
        userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        PublicPortfolioResponse response = new PublicPortfolioResponse();
        response.setUsername(username);
        response.setProfile(profileRepository.findByUserUsername(username).orElse(null));
        response.setProjects(projectRepository.findByUserUsernameOrderByDisplayOrderAsc(username));
        response.setSkills(skillRepository.findByUserUsernameOrderByCategoryAscNameAsc(username));
        response.setExperiences(workExperienceRepository.findByUserUsernameOrderByDisplayOrderAsc(username));
        response.setEducations(educationRepository.findByUserUsernameOrderByStartYearDesc(username));
        response.setActivities(activityRepository.findByUserUsernameOrderByDisplayOrderAsc(username));

        return ResponseEntity.ok(response);
    }

    @Data
    public static class PublicPortfolioResponse {
        private String username;
        private Profile profile;
        private List<Project> projects;
        private List<Skill> skills;
        private List<WorkExperience> experiences;
        private List<Education> educations;
        private List<Activity> activities;
    }
}
