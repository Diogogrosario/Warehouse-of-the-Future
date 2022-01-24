package org.t2.mesh_communication.mementos;

import java.util.Stack;

/** Stores past states of the program */
public class Caretaker {
    private Stack<Memento> states;

    public Caretaker() {
        this.states = new Stack<>();
    }

    public void saveState(Memento m) {
        states.push(m);
    }

    public Memento loadState(int nTicks) {
        Memento state = null;
        for (int i = 0; i < nTicks; i++) {
            state = states.pop();
        }
        return state;
    }
}
