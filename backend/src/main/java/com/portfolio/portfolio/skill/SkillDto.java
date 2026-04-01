package com.portfolio.portfolio.skill;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillDto {
    @NotBlank
    private String name;
    private String category;
    private Skill.Proficiency proficiency;
}
