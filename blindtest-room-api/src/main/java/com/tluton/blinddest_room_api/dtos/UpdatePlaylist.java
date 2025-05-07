package com.tluton.blinddest_room_api.dtos;

import jakarta.validation.constraints.NotNull;

public record UpdatePlaylist(@NotNull String playlist) {
}
