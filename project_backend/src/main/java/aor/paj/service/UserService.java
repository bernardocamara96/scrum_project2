package aor.paj.service;

import aor.paj.bean.UserBean;
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

        if (validate==3) return Response.status(200).entity("New user was validated").build();

        else if(validate==2) return Response.status(404).entity("Email exists").build();

        else if(validate==1) return Response.status(406).entity("Username exists").build();

        else if(validate==0) return Response.status(400).entity("There are empty fields").build();

        return Response.status(405).entity("Something went wrong").build();

    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User user) {
        userBean.addUser(user);
        return Response.status(200).entity("A new user is created").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@HeaderParam("username")String username){
        return userBean.getUser(username);
    }

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateLogin(@HeaderParam("username")String username, @HeaderParam("password")String password) {
        User user = userBean.validateLogin(username, password);
        if (user==null)
            return Response.status(404).entity("User with this username is not found").build();

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
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveColors(@HeaderParam("username")String username,@HeaderParam("background_color")String background_color,@HeaderParam("toDo_color")String toDo_color,
                                @HeaderParam("doing_color")String doing_color,@HeaderParam("done_color")String done_color){

        User userRequest=userBean.getUser(username);

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
