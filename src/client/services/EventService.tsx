import EventEmitter, { ListenerFn } from 'eventemitter3';

class TimedService {
    timer: NodeJS.Timeout;
    frequence: number;
    payload: any;
    action: (payload: any) => void;
    constructor(payload: any, frequence: number, action: (payload: any) => void) {
        this.payload = payload;
        this.frequence = frequence;
        this.action = action;
        this.timer = setTimeout(() => {this.action(this.payload)}, this.frequence);
    }
    setPayload(payload: any, reset: boolean = true) {
        this.payload = payload;
        if (reset) {
            clearInterval(this.timer);
            this.timer = setTimeout(() => {this.action(this.payload)}, this.frequence);
        }
    }
    setFrequence(frequence: number, reset: boolean = true) {
        this.frequence = frequence;
        if (reset || frequence == 0) {
            clearInterval(this.timer);
            if (frequence > 0) {
                this.timer = setTimeout(() => {this.action(this.payload)}, this.frequence);
            } 
        }
    }
}

class EventService {
    eventEmitter: EventEmitter;
    timedServices: {[k: string]: TimedService} = {};

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    on(eventName: string, listener: ListenerFn) {
        this.eventEmitter.on(eventName, listener); 
    }

    off(eventName: string, listener: ListenerFn) {
        this.eventEmitter.removeListener(eventName, listener);
    }

    emit(event: string, payload: any, error = false) {
        this.eventEmitter.emit(event, payload, error);
    }

    setTimed(event: string, onOff: boolean, payload?: any, frequence?: number) {
        let ts = this.timedServices[event];
        if (ts) {
            if (!onOff) {
                ts.setFrequence(0);
            } else {
                payload && ts.setPayload(payload);
                frequence && ts.setFrequence(frequence);
            }
        } else {
            this.timedServices[event] = new TimedService(payload, frequence || 1000, (payload: any)=>{
                this.emit(event, payload);
            });
        }
    }

    getEventEmitter() {
        return this.eventEmitter;
    }
}

let _eventService: EventService;
export function getEventServiceInstance(): EventService {
    if (!_eventService) {
        _eventService = new EventService();
    };
    return _eventService;
}