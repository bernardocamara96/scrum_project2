package aor.paj.service;

import aor.paj.bean.TaskBean;
import aor.paj.bean.UserBean;
import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Path("/tasks")
public class TaskService {

    @Inject
    TaskBean taskBean;

    @Inject
    UserBean userBean;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Task> getTasks(@HeaderParam("username")String username, @HeaderParam("pass")String password) {
        User user=userBean.getUser(username, password);
        return user.getTasks();
    }

    @PUT
    @Path("/update")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTask(@HeaderParam("username") String username,@HeaderParam("pass")String password,@HeaderParam("id") int id,@HeaderParam("title") String title,
                               @HeaderParam("description") String description, @HeaderParam("initialDate") String initialDate,
                               @HeaderParam("endDate")String endDate, @HeaderParam("priority")int priority){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate initialDateFormated = LocalDate.parse(initialDate, formatter);
        LocalDate endDateFormated = LocalDate.parse(endDate, formatter);
        User userRequested=userBean.getUser(username, password);
        Task taskChanged=userBean.getTask(userRequested,id);
        userBean.updateTask(taskChanged,title,description,initialDateFormated,endDateFormated,priority);
        return Response.status(200).entity("Task was updated").build();
    }

    @PUT
    @Path("/state")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateState(@HeaderParam("username")String username,@HeaderParam("pass")String password, @HeaderParam("id")int id,@HeaderParam("state")String state){
        User userRequested=userBean.getUser(username, password);
        Task taskRequested=userBean.getTask(userRequested,id);
        userBean.updateTaskState(taskRequested,state);

        return Response.status(200).entity("Task was updated").build();
    }


    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTask(@HeaderParam("username")String username,@HeaderParam("pass")String password ,Task task){
        User userRequested=userBean.getUser(username, password);
        userBean.addTask(userRequested,task);

        return Response.status(200).entity("Task created").build();
    }


    /*@GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTask(@PathParam("id")int id) {
        Task task = taskBean.getTasks().get(id);
        if (task==null)
            return Response.status(406).entity("Task with this id is not found").build();

        return Response.status(200).entity(task).build();

    }


    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeTask(@PathParam("id") int id) {
        boolean deleted = taskBean.removeTask(id);
        if (!deleted)
            return Response.status(406).entity("Task with this id is not found").build();

        return Response.status(200).entity("deleted").build();
    }


    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateTask(Task a, @PathParam("id") int id) {
        boolean updated = taskBean.updateTask(id, a);

        if (!updated)
            return Response.status(406).entity("Task with this id is not found").build();

        return Response.status(200).entity("updated").build();
    }*/
}