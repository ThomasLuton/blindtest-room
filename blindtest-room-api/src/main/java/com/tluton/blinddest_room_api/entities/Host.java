package com.tluton.blinddest_room_api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "hosts")
public class Host extends AbstractEntity{

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public Host() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Host host = (Host) o;
        return Objects.equals(email, host.email) && Objects.equals(password, host.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password);
    }

    @Override
    public String toString() {
        return "Host{" +
                "email='" + email + '\'' +
                ", password={protected}" + '\'' +
                '}';
    }
}
