package aor.paj.bean;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;

import aor.paj.dto.Task;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;
@ApplicationScoped
public class TaskBean {
    final String filename = "tasks.json";
    private ArrayList<Task> tasks;
    public TaskBean() {
        File f = new File(filename);
        if(f.exists()){
            try {
                FileReader filereader = new FileReader(f);
                tasks = JsonbBuilder.create().fromJson(filereader, new
                        ArrayList<Task>() {}.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        }else
            tasks = new ArrayList<Task>();
    }
    public void addTask(Task a) {
        tasks.add(a);
        writeIntoJsonFile();
    }

    public Task getTask(int i) {
        for (Task a : tasks) {
            if (a.getId() == i)
                return a;
        }
        return null;
    }
    public ArrayList<Task> getTasks() {
        return tasks;
    }
    public boolean removeTask(int id) {
        for (Task a : tasks) {
            if (a.getId() == id) {
                tasks.remove(a);
                return true;
            }
        }
        return false;
    }
    public boolean updateTask(int id, Task task) {
        for (Task a : tasks) {
            if (a.getId() == id) {
                a.setTitle(task.getTitle());
                a.setDescription(task.getDescription());
                writeIntoJsonFile();
                return true;
            }
        }
        return false;
    }
    private void writeIntoJsonFile(){
        Jsonb jsonb = JsonbBuilder.create(new
                JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(tasks, new FileOutputStream(filename));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}