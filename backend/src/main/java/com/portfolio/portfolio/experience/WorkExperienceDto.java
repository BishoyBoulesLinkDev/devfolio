package com.portfolio.portfolio.experience;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WorkExperienceDto {
    @NotBlank
    private String company;
    @NotBlank
    private String role;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isCurrent;
    private String description;
    private Integer displayOrder;
}
