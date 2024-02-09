package aor.paj.dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.util.Date;

@XmlRootElement
public class Task {
    @XmlElement
    int id;
    @XmlElement
    String title;
    @XmlElement
    String description;
    @XmlElement
    Date inicialDate;
    @XmlElement
    Date finalDate;

    public Task() {
    }

    public Task(int id, String title, String description, Date inicialDate, Date finalDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.inicialDate = inicialDate;
        this.finalDate = finalDate;
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

    public Date getInicialDate() {
        return inicialDate;
    }

    public void setInicialDate(Date inicialDate) {
        this.inicialDate = inicialDate;
    }

    public Date getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(Date finalDate) {
        this.finalDate = finalDate;
    }
}