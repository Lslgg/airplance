import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

@ccclass('BulletMe')
export class BulletMe extends Component {

    private _propSeed: number = 0.3;
    private _propXSeed: number = 0.3;
    private _gameManager: GameManager = null;

    onEnable() {
        this.initTriggerEvent();
    }

    onDisable(): void {
        const collider = this.node.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }

    update(deltaTime: number) {
        this.moveSType(deltaTime);
    }

    private moveSType(dt: number) {
        // 按照S型移动
        let pos = this.node.position;
        if (pos.x >= 12) {
            this._propXSeed = this._propSeed
        } else if (pos.x <= -12) {
            this._propXSeed = -this._propSeed
        }
        this.node.setPosition(pos.x + this._propXSeed * dt, pos.y, pos.z - this._propSeed * dt);
        pos = this.node.position;
        if (pos.z > 50) {
            this.node.destroy();
        }
    }

    public show(_gameManager: GameManager, speed: number) {
        this._gameManager = _gameManager;
        this._propSeed = speed;
    }

    private onTriggerEnter(event: ITriggerEvent) {
        const group = event.otherCollider.getGroup();
        if (group === Constant.CollisionType.SELF_PLANE) {
            this.node.destroy();
            let type = 0;
            const name = event.selfCollider.node.name;
            if (name === 'BulletM') {
                type = Constant.BulletMeType.BULLET_ME_M;
            } else if (name === 'BulletH') {
                type = Constant.BulletMeType.BULLET_ME_H;
            } else if (name === 'BulletS') {
                type = Constant.BulletMeType.BULLET_ME_S;
            }
            this._gameManager.changeBulletType(type);
        }
    }

    private initTriggerEvent() {
        const collider = this.node.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }
}


