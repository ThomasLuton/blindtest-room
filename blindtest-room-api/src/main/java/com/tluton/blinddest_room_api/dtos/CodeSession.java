package com.tluton.blinddest_room_api.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CodeSession(@Min(10000000) @Max(99999999) @NotNull Integer code, String playerName) {
}
