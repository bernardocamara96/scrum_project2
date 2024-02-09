package aor.paj.service;

import aor.paj.bean.TaskBean;
import aor.paj.dto.Task;
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

@Path("/tasks")
public class TaskService {

    @Inject
    TaskBean taskBean;


    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Task> getTasks() {return taskBean.getTasks();
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