import { _decorator, CCInteger, Component, EventTouch, Input, Node } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UiManager')
export class UiManager extends Component {

    @property(CCInteger)
    speed: number = 10;

    @property({ type: Node })
    plane: Node = null;

    @property({ type: GameManager })
    gameManager: GameManager = null;

    start() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)

    }

    onTouchStart(event: EventTouch) {
        this.gameManager.isShhoot(true)
    }

    onTouchMove(event: EventTouch) {
        let delta = event.getDelta()  // 获取触摸移动距离
        let pos = this.plane.position // 获取当前节点位置
        const x = pos.x + 0.01 * delta.x * this.speed
        const z = pos.z - 0.01 * delta.y * this.speed
        this.plane.setPosition(x, pos.y, z)
    }

    onTouchEnd(event: EventTouch) {
        this.gameManager.isShhoot(false)
    }
}


