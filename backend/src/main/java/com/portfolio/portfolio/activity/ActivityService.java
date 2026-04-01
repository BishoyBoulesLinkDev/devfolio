package com.portfolio.portfolio.activity;

import com.portfolio.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAll(User user) {
        return activityRepository.findByUserOrderByDisplayOrderAsc(user);
    }

    public Activity create(User user, ActivityDto dto) {
        Activity activity = Activity.builder()
                .user(user)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .url(dto.getUrl())
                .category(dto.getCategory())
                .displayOrder(dto.getDisplayOrder())
                .build();
        return activityRepository.save(activity);
    }

    public Activity update(User user, Long id, ActivityDto dto) {
        Activity activity = activityRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        activity.setTitle(dto.getTitle());
        activity.setDescription(dto.getDescription());
        activity.setUrl(dto.getUrl());
        activity.setCategory(dto.getCategory());
        activity.setDisplayOrder(dto.getDisplayOrder());
        return activityRepository.save(activity);
    }

    public void delete(User user, Long id) {
        Activity activity = activityRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        activityRepository.delete(activity);
    }
}
