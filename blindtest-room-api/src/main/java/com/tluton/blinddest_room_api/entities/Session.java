package com.tluton.blinddest_room_api.entities;

import com.tluton.blinddest_room_api.sessions.Step;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "sessions")
public class Session extends AbstractEntity{

    @Column(name = "code")
    private Integer code;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "winner")
    private String winner;
    @Column(name = "step")
    private Step step;
    @Column(name = "playlist")
    private String playlist;

    @ManyToOne()
    @JoinColumn(name = "host_id")
    private Host host;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public Step getStep() {
        return step;
    }

    public void setStep(Step step) {
        this.step = step;
    }

    public String getPlaylist() {
        return playlist;
    }

    public void setPlaylist(String playlist) {
        this.playlist = playlist;
    }

    public Host getHost() {
        return host;
    }

    public void setHost(Host creator) {
        this.host = creator;
    }

    @Override
    public String toString() {
        return "Session{" +
                "code=" + code +
                ", createdAt=" + createdAt +
                ", winner='" + winner + '\'' +
                ", step=" + step +
                ", playlist='" + playlist + '\'' +
                ", creator=" + host +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Session session = (Session) o;
        return Objects.equals(code, session.code) && Objects.equals(createdAt, session.createdAt) && Objects.equals(winner, session.winner) && step == session.step && Objects.equals(playlist, session.playlist) && Objects.equals(host, session.host);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code, createdAt, winner, step, playlist, host);
    }
}
