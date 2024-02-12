package aor.paj.bean;

import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.time.LocalDate;
import java.util.ArrayList;

@ApplicationScoped
public class UserBean {

    final String filename = "users.json";
    private ArrayList<User> users;

    public UserBean(){
        File f = new File(filename);
        if(f.exists()){
            try {
                FileReader filereader = new FileReader(f);
                users = JsonbBuilder.create().fromJson(filereader, new
                        ArrayList<User>() {}.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        }else
            users = new ArrayList<User>();

    }
    public void addUser(User user) {
        users.add(user);
        writeIntoJsonFile();
    }

    public void addTask(User user, Task task){
        user.addTask(task);
        writeIntoJsonFile();
    }

    public Task getTask(User user, int id){
        Task taskRequested=null;
        ArrayList<Task> tasks=user.getTasks();
        for (int i=0;i<tasks.size() && taskRequested==null;i++){
            if (tasks.get(i).getId()==id){
                taskRequested=tasks.get(i);
            }
        }
        return taskRequested;
    }

    public void updateTaskState(Task task, String state){
        task.setState(state);
        writeIntoJsonFile();
    }
    public void updateTask(Task task, String title, String description, LocalDate initialDate, LocalDate endDate,
                           int priority){
        task.setTitle(title);
        task.setDescription(description);
        task.setInitialDate(initialDate);
        task.setEndDate(endDate);
        task.setPriority(priority);
        writeIntoJsonFile();
    }


    public User getUser(String username){
        User userRequested=null;
        for(int i=0;i<users.size() && userRequested==null;i++){
            if(users.get(i).getUsername().equals(username)){
                userRequested=users.get(i);
            }
        }
        return userRequested;
    }
    public int validateUserRegister(String username,String password, String email, String firstName, String lastName, String phoneNumber){

        final int EMPTY_FIELDS=0, USERNAME_EXISTS=1, EMAIL_EXISTS=2,USER_VALIDATE=3;
        int VALIDATION_STATE=USER_VALIDATE;

        if(username.equals("") || password.equals("") || email.equals("") || firstName.equals("") || lastName.equals("") || phoneNumber.equals("")) {

            VALIDATION_STATE= EMPTY_FIELDS;
        }
        else {

            for (int i=0;i<users.size() && VALIDATION_STATE!=USERNAME_EXISTS && VALIDATION_STATE!=EMAIL_EXISTS;i++) {

                if (users.get(i).getUsername().equals(username)){
                    VALIDATION_STATE= USERNAME_EXISTS;
                }
                else if (users.get(i).getEmail().equals(email)){
                    VALIDATION_STATE= EMAIL_EXISTS;
                }
            }
        }
        return VALIDATION_STATE;
    }

    public void saveColors(User user,String background_color,String toDo_color, String doing_color, String done_color){
        user.setBackground_color(background_color);
        user.setToDo_color(toDo_color);
        user.setDoing_color(doing_color);
        user.setDone_color(done_color);
    }

    public User validateLogin(String username, String password) {
        User user_validate=null;
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                if(user.getPassword().equals(password)) user_validate=user;
            }
        }
        return user_validate;
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public boolean removeUser(String username) {
        for (User user : users) {
            if (user.getUsername() == username) {
                users.remove(user);
                return true;
            }
        }
        return false;
    }

    private void writeIntoJsonFile(){
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(filename);
            JsonbConfig config = new JsonbConfig().withFormatting(true);
            Jsonb jsonb = JsonbBuilder.create(config);
            jsonb.toJson(users, fileOutputStream);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
       /* Jsonb jsonb = JsonbBuilder.create(new
                JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filename));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }*/
    }
}
