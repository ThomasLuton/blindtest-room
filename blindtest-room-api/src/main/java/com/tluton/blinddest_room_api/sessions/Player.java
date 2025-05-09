package com.tluton.blinddest_room_api.sessions;

import java.util.Objects;

public class Player {

    private String name;
    private Integer score;

    @Override
    public String toString() {
        return "Player{" +
                "name='" + name + '\'' +
                ", score=" + score +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(name, player.name) && Objects.equals(score, player.score);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, score);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        if(score < 0){
            score = 0;
        }
        this.score = score;
    }

    public Player(String name, Integer score) {
        this.name = name;
        this.score = score;
    }
}
