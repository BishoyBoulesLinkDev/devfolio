package com.portfolio.portfolio.education;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EducationDto {
    @NotBlank
    private String institution;
    private String degree;
    private String field;
    private Integer startYear;
    private Integer endYear;
    private String description;
}
