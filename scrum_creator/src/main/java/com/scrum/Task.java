package com.scrum;

import java.time.LocalDate;

public class Task {
    private String title;
    private String description;
    private int priority;
    private LocalDate initialDate;
    private LocalDate endDate;

    public Task() {
    }

    public Task(String title, String description, int priority, LocalDate initialDate, LocalDate endDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.initialDate = initialDate;
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "{" +
                "\"title\":\"" + title + "\"" +
                ", \"description\":\"" + description + "\"" +
                ", \"priority\":" + priority  +
                ", \"initialDate\":\"" + initialDate + "\"" +
                ", \"endDate\":\"" + endDate + "\"}";
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public LocalDate getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(LocalDate initialDate) {
        this.initialDate = initialDate;
    }

    public LocalDate getFinalDate() {
        return endDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.endDate = endDate;
    }
}
