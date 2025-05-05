import { StompService } from "./services/stomp.service";
import { stompConfig } from "./stomp.config";

export function stompServiceFactory() {
    const stomp = new StompService();
    stomp.configure(stompConfig);
    stomp.activate();
    return stomp;
}