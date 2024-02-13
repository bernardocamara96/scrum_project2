package aor.paj.dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;


@XmlRootElement
public class Task {
    @XmlElement
    private long id;
    @XmlElement
    private String title;
    @XmlElement
    private String description;
    @XmlElement
    private LocalDate initialDate;
    @XmlElement
    private LocalDate endDate;
    @XmlElement
    private int priority;
    @XmlElement
    private String state;

    public Task() {
        this.id = 0;
        this.title = null;
        this.description = null;
        this.initialDate = null;
        this.endDate = null;
        this.priority=0;
        this.state=null;
    }

    public Task(int id, String title, String description, LocalDate initialDate, LocalDate endDate, int priority, String state) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.initialDate = initialDate;
        this.endDate = endDate;
        this.priority=priority;
        this.state=state;
    }


    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public LocalDate getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(LocalDate inicialDate) {
        this.initialDate = inicialDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate finalDate) {
        this.endDate = finalDate;
    }
}