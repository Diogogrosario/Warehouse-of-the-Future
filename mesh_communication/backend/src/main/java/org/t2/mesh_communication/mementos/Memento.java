package org.t2.mesh_communication.mementos;

import java.io.*;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Orchestrator;

/** Represents the state of the program */
public class Memento {
    private Orchestrator orchestrator;
    private MeshGrid meshGrid;

    public Memento(Orchestrator orchestrator, MeshGrid meshGrid) {
        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(orchestrator);

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            this.orchestrator = (Orchestrator) i.readObject();

            i.close();
            bi.close();

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            ObjectOutputStream o = new ObjectOutputStream(bo);

            o.writeObject(meshGrid);

            o.close();
            bo.close();

            ByteArrayInputStream bi = new ByteArrayInputStream(bo.toByteArray());
            ObjectInputStream i = new ObjectInputStream(bi);

            this.meshGrid = (MeshGrid) i.readObject();

            i.close();
            bi.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public Orchestrator getOrchestrator() {
        return orchestrator;
    }

    public MeshGrid getMeshGrid() {
        return meshGrid;
    }
}
