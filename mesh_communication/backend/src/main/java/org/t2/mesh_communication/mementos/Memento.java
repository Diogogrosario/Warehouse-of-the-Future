package org.t2.mesh_communication.mementos;

import java.util.List;
import org.t2.mesh_communication.config.Product;
import org.t2.mesh_communication.devices.MeshGrid;
import org.t2.mesh_communication.devices.Orchestrator;

/** Represents the state of the program */
public class Memento {
    private Orchestrator orchestrator;
    private MeshGrid meshGrid;
    private List<Product> products;

    public Memento(Orchestrator orchestrator, MeshGrid meshGrid, List<Product> products) {
        this.orchestrator = orchestrator;
        this.meshGrid = meshGrid;
        this.products = products;
    }

    public Orchestrator getOrchestrator() {
        return orchestrator;
    }

    public MeshGrid getMeshGrid() {
        return meshGrid;
    }

    public List<Product> getProducts() {
        return products;
    }
}
