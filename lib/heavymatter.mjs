/**
 *
 *
 * @author: Bernhard Lukassen
 * @licence: MIT
 * @see: {@link https://github.com/Thoregon}
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

import IPFS from '../cache/ipfs.min.js';
let ipfs;

export default class HeavyMatter extends Reporter(EventEmitter) {

    constructor() {
        super();
    }


    /*
     * EventEmitter implementation
     */

    get publishes() {
        return {
            ready:          'HeavyMatter ready',
            exit:           'HeavyMatter exit',
        };
    }

    get IPFS() {
        return IPFS;
    }

    get ipfs() {
        return ipfs;
    }

    /*
     * service implementation
     */

    install() {}
    uninstall() {}
    resolve() {}
    async start() {
        ipfs = await IPFS.create();

        universe.heavymatter = this;
        this.emit('ready', { heavymatter: this });
    }
    stop() {
        delete universe.heavymatter;
        this.emit('exit', { heavymatter: this });
    }

    update() {}


}
