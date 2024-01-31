import { _decorator, BoxCollider, CCFloat, CCInteger, Collider, Component, EventTouch, Input, input, ITriggerEvent } from 'cc';
import { GameManager } from '../framework/GameManager';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {

	@property(CCFloat)
	enemySpeed: number = 300;

	@property({ type: CCFloat })
	public createBulletTime: number = 0.5;

	private _isNeedCreateBullet: boolean = false;

	private _currentCreateBulletTime: number = 0;

	private _gmaeManager: GameManager = null;


	onEnable() {
		this.initTirggerEvent();
	}

	onDisable(): void {
		const collider = this.node.getComponent(Collider);
		collider.off('onTriggerEnter', this.onTriggerEnter, this);
	}

	protected update(dt: number): void {
		const pos = this.node.getPosition();
		this.node.setPosition(pos.x, pos.y, pos.z + this.enemySpeed * dt);
		if (this._isNeedCreateBullet) {
			this._currentCreateBulletTime += dt;
			if (this._currentCreateBulletTime >= this.createBulletTime) {
				this._gmaeManager.createEnemyBullet(this.node.getPosition());
				this._currentCreateBulletTime = 0;
			}
		}
		if (this.node.position.z > 50) {
			this.node.destroy();
		}
	}

	show(game: GameManager, speed: number, isNeed: boolean) {
		this._gmaeManager = game;
		this.enemySpeed = speed;
		this._isNeedCreateBullet = isNeed;
	}

	onTriggerEnter(event: ITriggerEvent) {
		const groud = event.otherCollider.getGroup();
		if (groud === Constant.CollisionType.SELF_BULLET || groud === Constant.CollisionType.SELF_PLANE) {
			this.node.destroy();
		}
	}

	initTirggerEvent() {
		const collider = this.node.getComponent(BoxCollider);
		collider.on('onTriggerEnter', this.onTriggerEnter, this);
	}
}
