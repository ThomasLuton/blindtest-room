package com.tluton.blinddest_room_api.dtos;

import com.tluton.blinddest_room_api.sessions.Step;

public record SessionInfo(String playlist, Step step, Integer code) {
}
