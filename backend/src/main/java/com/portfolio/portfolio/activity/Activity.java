package com.portfolio.portfolio.activity;

import com.portfolio.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activities")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String url;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "display_order")
    private Integer displayOrder;

    public enum Category {
        HOBBY, CONTRIBUTION, VOLUNTEERING, OTHER
    }
}
