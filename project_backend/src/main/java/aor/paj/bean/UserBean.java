package aor.paj.bean;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;

import aor.paj.dto.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

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


    public User getUser(String username){
        User userRequested=null;
        for(int i=0;i<users.size() && userRequested==null;i++){
            if(users.get(i).getUsername().equals(username)){
                userRequested=users.get(i);
            }
        }
        return userRequested;
    }
    public boolean validateUserRegister(String username, String email, String phoneNumber){
        for (User user: users){
            System.out.println(user.getUsername());
            if(user.getUsername().equals(username) || user.getEmail().equals(email) || user.getPhoneNumber().equals(phoneNumber)) {
                return false;
            }
        }
        return true;
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

    public User updatePhoto(String username, String newPhoto){
        User currentUser = null;
        for(int i=0; i< users.size() && currentUser==null; i++){
            if(users.get(i).getUsername().equals(username)){
                currentUser = users.get(i);
                currentUser.setImgURL(newPhoto);
                writeIntoJsonFile();
            }
        }
        return currentUser;

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
