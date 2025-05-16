import { RxStompConfig } from '@stomp/rx-stomp';
import { environment } from '../environments/environment';

export const stompConfig: RxStompConfig = {
    brokerURL: environment.ws,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    // reconnectDelay: 200,
    debug: (msg: string): void => {
        if (environment.production == false) {
            console.log(new Date(), msg);
        }
    }
}