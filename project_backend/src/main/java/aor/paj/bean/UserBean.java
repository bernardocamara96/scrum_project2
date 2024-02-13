package aor.paj.bean;

import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.net.MalformedURLException;
import java.net.URL;
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


    public User getUser(String username, String password){
        User userRequested=null;
        for(int i=0;i<users.size() && userRequested==null;i++){
            if(users.get(i).getUsername().equals(username) && users.get(i).getPassword().equals(password)){
                userRequested=users.get(i);
            }
        }
        return userRequested;
    }
    public int validateUserRegister(String username,String password, String email, String firstName, String lastName, String phoneNumber){

        final int EMPTY_FIELDS=0, USERNAME_EXISTS=1, EMAIL_EXISTS=2,INVALID_EMAIL=3,INVALID_PHONE=4,USER_VALIDATE=10;
        int VALIDATION_STATE=USER_VALIDATE;

        if(username.equals("") || password.equals("") || email.equals("") || firstName.equals("") || lastName.equals("") || phoneNumber.equals("")) {

            VALIDATION_STATE= EMPTY_FIELDS;
        }
        else if(!isValidEmail(email)){
            VALIDATION_STATE=INVALID_EMAIL;
        }
        else if (!isValidPhoneNumber(phoneNumber)){
            VALIDATION_STATE=INVALID_PHONE;
        }
        else{
            for (int i=0;i<users.size() && VALIDATION_STATE==USER_VALIDATE;i++) {

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


    public boolean isValidPhoneNumber(String phoneNumber){
        boolean valideNumber=false;
        try {
            // Remove non-digit characters from the phone number
            String cleanedPhoneNumber = phoneNumber.replaceAll("[^\\d]", "");

            // Check if the cleaned phone number has the expected length
            if (cleanedPhoneNumber.length() == 9 || cleanedPhoneNumber.length() == 10) {
                // Additional checks based on your requirements, if needed
                valideNumber=true;
            } else {
                valideNumber= false;
            }
        } catch (NumberFormatException e) {
            // An exception occurred during parsing (non-numeric characters present)
            valideNumber=false;
        }
        return valideNumber;
    }

    public boolean isValidUrl(String urlString) {
        try {
            // Attempt to create a URL object with the provided string
            new URL(urlString);
            return true;
        } catch (MalformedURLException e) {
            // URL is not valid
            return false;
        }
    }
    public boolean isValidEmail(String email) {
        boolean isValid = false;
        try {
            InternetAddress internetAddress = new InternetAddress(email);
            internetAddress.validate();
            isValid = true;
        } catch (AddressException e) {
        }
        return isValid;
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


    public User updatePhoto(String username,String pass,String newPhoto){
        User currentUser = getUser(username,pass);
        currentUser.setImgURL(newPhoto);
        writeIntoJsonFile();

        return currentUser;
    }
    public boolean updatePassword(String username, String password, String newPassword) {
        boolean fieldChanged = false;
            User u = getUser(username, password);
            if(u!=null) {
                u.setPassword(newPassword);
                writeIntoJsonFile();
                fieldChanged = true;
            }

        return fieldChanged;
    }
    public boolean updateEmail(String username, String password, String email) {
        boolean fieldChanged = false;
        boolean validEmail = isValidEmail(email);
            User u = getUser(username, password);
            boolean emailAlreadyExists = emailExists(email);
            if (u !=null && validEmail && !emailAlreadyExists) {
                    u.setEmail(email);
                    writeIntoJsonFile();
                    fieldChanged = true;
        }
        return fieldChanged;
    }

    public boolean emailExists(String email){
        boolean emailExists = false;
            for (User u : users) {
                String userEmail = u.getEmail();
                if (userEmail != null && userEmail.equals(email)) {
                    emailExists = true;
                }
            }
        return emailExists;
    }

    public boolean updateFirstName(String username, String password, String firstName) {
        boolean fieldChanged = false;

            User u = getUser(username, password);
            if(u!=null){
                u.setFirstName(firstName);
                writeIntoJsonFile();
                fieldChanged=true;
        }
        return fieldChanged;
    }
    public boolean updateLastName(String username, String password, String lastName) {
        boolean fieldChanged = false;
            User u = getUser(username, password);
            if(u!= null){
                u.setLastName(lastName);
                writeIntoJsonFile();
                fieldChanged=true;
        }
        return fieldChanged;
    }

    public boolean updatePhoneNumber(String username, String password, String phoneNumber) {
        boolean fieldChanged = false;
            User u = getUser(username, password);
            boolean phoneExists1 = phoneExists(phoneNumber);
            boolean phoneValid=isValidPhoneNumber(phoneNumber);
            if (u!=null && !phoneExists1 && phoneValid) {
                u.setPhoneNumber(phoneNumber);
                writeIntoJsonFile();
                fieldChanged = true;
        }
        return fieldChanged;
    }

    public boolean phoneExists(String phoneNumber){
        boolean phoneExists = false;
        for(User u: users){
            if(u.getPhoneNumber().equals(phoneNumber)){
                phoneExists = true;
            }
        }
        return phoneExists;
    }






    /*public boolean updateActivity(int id, Activity activity) {
        for (Activity a : activities) {
            if (a.getId() == id) {
                a.setTitle(activity.getTitle());
                a.setDescription(activity.getDescription());
                writeIntoJsonFile();
                return true;
            }
        }
        return false;
    }*/

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
