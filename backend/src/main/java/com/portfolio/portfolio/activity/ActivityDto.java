package com.portfolio.portfolio.activity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActivityDto {
    @NotBlank
    private String title;
    private String description;
    private String url;
    private Activity.Category category;
    private Integer displayOrder;
}
