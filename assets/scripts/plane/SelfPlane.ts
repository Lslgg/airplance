import { _decorator, BoxCollider, CCInteger, Collider, Component, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {

    onEnable() {
        this.initTirggerEvent();
    }

    onDisable(): void {
        const collider = this.node.getComponent(Collider);
        collider.off('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(event: ITriggerEvent) {
        const groud = event.otherCollider.getGroup();
        if (groud === Constant.CollisionType.ENEMY_PLANE ||
            groud === Constant.CollisionType.ENEMY_BULLET) {
        }
    }

    initTirggerEvent() {
        console.log('initTirggerEvent')
        const collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }
}


