import { _decorator, CCFloat, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;


@ccclass('Bullet')
export class Bullet extends Component {

    private _bulletSpeed: number = 50;
    private _isEnemyBullet: boolean = false;
    private _direction = Constant.Direction.MIDDLE;

    onEnable() {
        this.initTriggerEvent();
    }

    onDisable(): void {
        const collider = this.node.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let outRange = -50;
        let moveLength = pos.z - deltaTime * this._bulletSpeed;
        if (this._isEnemyBullet) {
            outRange = 50;
            moveLength = pos.z + deltaTime * this._bulletSpeed;
        }
        if (this._direction === Constant.Direction.LEFT) {
            this.node.setPosition(pos.x - deltaTime * this._bulletSpeed * 0.2, pos.y, moveLength);
        } else if (this._direction === Constant.Direction.RIGHT) {
            this.node.setPosition(pos.x + deltaTime * this._bulletSpeed * 0.2, pos.y, moveLength);
        } else {
            this.node.setPosition(pos.x, pos.y, moveLength);
        }
        this.node.setPosition(pos.x, pos.y, moveLength);
        let isDestory = !this._isEnemyBullet ? moveLength > -outRange : moveLength > outRange;
        if (isDestory) {
            this.node.destroy();
        }
    }

    public show(speed: number, isEnemyBullet: boolean, direction: number = Constant.Direction.MIDDLE) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
        this._direction = direction;
    }

    private onTriggerEnter(event: ITriggerEvent) {
        this.node.destroy();
    }

    private initTriggerEvent() {
        const collider = this.node.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }
}


