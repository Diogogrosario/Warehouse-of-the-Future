package org.t2.mesh_communication.mementos;

import java.io.*;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Orchestrator;

/** Represents the state of the program */
public class Memento {
    private Orchestrator orchestrator;
    private MeshGrid meshGrid;

    public Memento(Orchestrator orchestrator, MeshGrid meshGrid) {
        this.meshGrid = this.deepCopy(meshGrid);
        this.orchestrator = this.deepCopy(orchestrator);
    }

    public MeshGrid deepCopy(MeshGrid meshGrid) {
        MeshGrid ret = null;
        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(meshGrid);

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            ret = (MeshGrid) i.readObject();

            i.close();
            bi.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return ret;
    }

    public Orchestrator deepCopy(Orchestrator orchestrator) {
        Orchestrator ret = null;
        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(orchestrator);

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            ret = (Orchestrator) i.readObject();

            i.close();
            bi.close();

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return ret;
    }

    public Orchestrator getOrchestrator() {
        return orchestrator;
    }

    public MeshGrid getMeshGrid() {
        return meshGrid;
    }
}
