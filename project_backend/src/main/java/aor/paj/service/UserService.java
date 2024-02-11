package aor.paj.service;

import aor.paj.bean.UserBean;
import aor.paj.dto.User;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.Path;

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

    @GET
    @Path("/register/{username}/{email}/{phoneNumber}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateUserRegister(@PathParam("username")String user_username,@PathParam("email")String user_email,@PathParam("phoneNumber")String user_phoneNumber) {

        boolean validate = userBean.validateUserRegister(user_username,user_email,user_phoneNumber);

        System.out.println(validate);
        if (validate) return Response.status(200).entity("New user was validated").build();

        return Response.status(404).entity("User wasn't created").build();

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
    @Path("/updatePhoto/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePhoto(@PathParam("username") String username, @QueryParam("newPhoto") String newPhoto){
        User updateUser = userBean.updatePhoto(username, newPhoto);
        if(updateUser != null){
            return Response.status(200).entity(updateUser).build();
        }else{
            return Response.status(404).entity("User with username " + username + "not found").build();
        }
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
