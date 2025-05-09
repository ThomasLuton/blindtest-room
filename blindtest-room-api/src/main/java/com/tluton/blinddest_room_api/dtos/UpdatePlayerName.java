package com.tluton.blinddest_room_api.dtos;

import jakarta.validation.constraints.NotNull;

public record UpdatePlayerName(@NotNull CodeSession codeSession, @NotNull String newName) {
}
