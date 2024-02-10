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

@Path("/tasks")
public class TaskService {

    @Inject
    TaskBean taskBean;

    @Inject
    UserBean userBean;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Task> getTasks() {return taskBean.getTasks();
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTask(@HeaderParam("username")String username, Task task){
        User userRequested=userBean.getUser(username);
        userBean.addTask(userRequested,task);
        taskBean.addTask(task);
        return Response.status(200).entity("Task created").build();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTask(Task a) {
        taskBean.addTask(a);
        return Response.status(200).entity("A new task is created").build();

    }

    @GET
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
    }
}