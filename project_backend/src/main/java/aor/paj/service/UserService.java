package aor.paj.service;

import aor.paj.bean.TaskBean;
import aor.paj.bean.UserBean;
import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/users")
public class UserService {

    @Inject
    UserBean userBean;

    @Inject
    TaskBean taskBean;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUsers() {return userBean.getUsers();
    }

    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateUserRegister(@HeaderParam("username")String user_username, @HeaderParam("password")String user_password,
                                         @HeaderParam("email")String user_email, @HeaderParam("firstName")String user_firstName,
                                         @HeaderParam("lastName")String user_lastName,@HeaderParam("phoneNumber")String user_phoneNumber) {

        int validate = userBean.validateUserRegister(user_username,user_password,user_email,user_firstName,user_lastName,user_phoneNumber);

        if (validate==10) return Response.status(200).entity("New user was validated").build();

        else if(validate==4) return Response.status(400).entity("Phone number invalid").build();

        else if(validate==3) return Response.status(400).entity("Email invalid").build();

        else if(validate==2) return Response.status(409).entity("Email exists").build();

        else if(validate==1) return Response.status(409).entity("Username exists").build();

        else if(validate==0) return Response.status(400).entity("There are empty fields").build();

        return Response.status(405).entity("Something went wrong").build();

    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User user) {
        int validateUser=userBean.validateUserRegister(user.getUsername(),user.getPassword(),user.getEmail(),user.getFirstName(),user.getLastName(),user.getPhoneNumber());
        if(validateUser==10) {
            if(userBean.isValidUrl(user.getImgURL())) {
                userBean.addUser(user);
                return Response.status(200).entity("A new user was created").build();
            }
            else return Response.status(400).entity("The URL is invalid").build();
        }
        else if(validateUser==4) return Response.status(400).entity("Phone number invalid").build();

        else if(validateUser==3) return Response.status(400).entity("Email invalid").build();

        else if(validateUser==2) return Response.status(409).entity("Email exists").build();

        else if(validateUser==1) return Response.status(409).entity("Username exists").build();

        else if(validateUser==0) return Response.status(400).entity("There are empty fields").build();

        return Response.status(405).entity("Something went wrong").build();


    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@HeaderParam("username")String username,@HeaderParam("pass")String pass){
        return userBean.getUser(username,pass);
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateLogin(@HeaderParam("username")String username, @HeaderParam("password")String password) {
        User user = userBean.validateLogin(username, password);
        if (user==null)
            return Response.status(404).entity("Wrong data").build();

        return Response.status(200).entity(user).build();

    }

    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeUser(@QueryParam("username")String username) {
        boolean deleted = userBean.removeUser(username);
        if (!deleted)
            return Response.status(200).entity("User with this username is not found").build();

        return Response.status(200).entity("deleted").build();
    }
    @PUT
    @Path("/updatePhoto")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePhoto(@HeaderParam("username") String username, @HeaderParam("pass")String pass,@HeaderParam("newPhoto") String newPhoto){
        User updateUser = userBean.updatePhoto(username, pass,newPhoto);
        if(updateUser != null){
            return Response.status(200).entity(updateUser).build();
        }else{
            return Response.status(404).entity("User with username " + username + "not found").build();
        }
    }
    @PUT
    @Path("/updatePassword")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePassword(@HeaderParam("username") String username, @HeaderParam("password") String password, @HeaderParam("newPassword") String newPassword){
        boolean fieldChanged = userBean.updatePassword(username, password, newPassword);
        if(fieldChanged){
            return Response.status(200).entity("Password changed with successfuly").build();
        }else{
            return Response.status(404).entity("User with username " + username + "not found").build();
        }

    }

    @PUT
    @Path("/updateEmail/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEmail(@PathParam("username") String username, @QueryParam("email") String email){
        boolean fieldChanged = userBean.updateEmail(username, email);
        if(fieldChanged){
            return Response.status(200).entity("Email changed with successfuly").build();
        }else{
            return Response.status(404).entity("Email already exists").build();
        }

    }
    @PUT
    @Path("/updateFirstName/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateFirstName(@PathParam("username") String username, @QueryParam("firstName") String firstName){
        boolean fieldChanged = userBean.updateFirstName(username, firstName);
        if(fieldChanged){
            return Response.status(200).entity("First Name changed with successfuly").build();
        }else{
            return Response.status(404).entity("not found").build();
        }

    }
    @PUT
    @Path("/updateLastName/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateLastName(@PathParam("username") String username, @QueryParam("lastName") String lastName){
           boolean fieldChanged = userBean.updateLastName(username, lastName);
            if(fieldChanged){
                return Response.status(200).entity("Last Name changed with successfuly").build();
            }else{
                return Response.status(404).entity("not found").build();
            }

    }

    @PUT
    @Path("/updatePhoneNumber/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePhoneNumber(@PathParam("username") String username, @QueryParam("phonenumber") String phonenumber){
        boolean fieldChanged = userBean.updatePhoneNumber(username, phonenumber);
        if(fieldChanged){
            return Response.status(200).entity("Phone Number  changed with successfuly").build();
        }else{
            return Response.status(404).entity("not found").build();
        }

    }



    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveColors(@HeaderParam("username")String username,@HeaderParam("pass")String password,@HeaderParam("background_color")String background_color,@HeaderParam("toDo_color")String toDo_color,
                                @HeaderParam("doing_color")String doing_color,@HeaderParam("done_color")String done_color){

        User userRequest=userBean.getUser(username,password);

        if (userRequest==null) return Response.status(404).entity("You don't have authorization to make changes").build();

        userBean.saveColors(userRequest, background_color,toDo_color,doing_color,done_color);
        return Response.status(200).entity("Colors were updated").build();
    }
   /* @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateActivity(Activity a, @HeaderParam("id") int id) {
        boolean updated = activityBean.updateActivity(id, a);

        if (!updated)
            return Response.status(200).entity("Activity with this idea is not found").build();

        return Response.status(200).entity("updated").build();
    }*/
}
