import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveBg')
export class MoveBg extends Component {
    @property({ type: Node })
    bg1: Node = null;

    @property({ type: Node })
    bg2: Node = null;

    public speed: number = 10;
    public moveRange: number = 90;

    protected start(): void {
        this.initPos();
    }

    initPos(): void {
        this.bg1.setPosition(0, 0, 0);
        this.bg2.setPosition(0, 0, this.moveRange);
    }

    protected update(dt: number): void {
        this.bg1.setPosition(0, 0, this.bg1.position.z + this.speed * dt);
        this.bg2.setPosition(0, 0, this.bg2.position.z + this.speed * dt);

        if (this.bg1.position.z > this.moveRange) {
            this.bg1.setPosition(0, 0, this.bg2.position.z - this.moveRange)
        } else if (this.bg2.position.z > this.moveRange) {
            this.bg2.setPosition(0, 0, this.bg1.position.z - this.moveRange)
        }
    }

}


