package com.portfolio.portfolio.project;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectDto {
    @NotBlank
    private String title;
    private String description;
    private String techStack;
    private String repoUrl;
    private String liveUrl;
    private String imageUrl;
    private Integer displayOrder;
}
