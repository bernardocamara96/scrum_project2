package aor.paj.dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;


@XmlRootElement
public class Task {
    @XmlElement
    private int id;
    @XmlElement
    private String title;
    @XmlElement
    private String description;
    @XmlElement
    private LocalDate inicialDate;
    @XmlElement
    private LocalDate finalDate;
    @XmlElement
    private int priority;
    @XmlElement
    private int state;

    public Task() {
        this.id = 0;
        this.title = null;
        this.description = null;
        this.inicialDate = null;
        this.finalDate = null;
        this.priority=0;
        this.state=0;
    }

    public Task(int id, String title, String description, LocalDate inicialDate, LocalDate finalDate, int priority, int state) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.inicialDate = inicialDate;
        this.finalDate = finalDate;
        this.priority=priority;
        this.state=state;
    }


    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public LocalDate getInicialDate() {
        return inicialDate;
    }

    public void setInicialDate(LocalDate inicialDate) {
        this.inicialDate = inicialDate;
    }

    public LocalDate getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.finalDate = finalDate;
    }
}