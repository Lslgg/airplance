import { _decorator, BoxCollider, CCFloat, CCInteger, Component, instantiate, macro, math, Node, Prefab, Vec3 } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from './Constant';
import { EnemyPlane } from '../plane/EnemyPlane';
import { BulletMe } from '../bullet/BulletMe';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {


    @property({ type: Node })
    playerPlane: Node = null;

    @property(Prefab)
    enemyPlane: Prefab = null;

    @property(Prefab)
    enemyPlane2: Prefab = null;

    @property(CCFloat)
    enemyCreateInterval: number = 1;
    @property(CCFloat)
    enemySpeed: number = 50;
    @property(CCFloat)
    enemySpeed2: number = 70;

    @property({ type: Prefab })
    bullet01: Prefab = null;

    @property({ type: Prefab })
    bullet02: Prefab = null;

    @property({ type: Prefab })
    bullet03: Prefab = null;

    @property({ type: Prefab })
    bullet04: Prefab = null;

    @property({ type: Prefab })
    bullet05: Prefab = null;

    @property({ type: Node })
    bullRoot: Node = null;

    @property(Prefab)
    bulletM: Prefab = null;

    @property(Prefab)
    bulletH: Prefab = null;

    @property(Prefab)
    bulletS: Prefab = null;

    @property({ type: CCFloat })
    shootTime: number = 0.5;

    @property({ type: CCInteger })
    bulletSpeed: number = 80;

    private _isShoot: boolean = false;
    private _currentShootTime: number = 0;
    private _currentCreEnemyTime: number = 0;
    private _combinationInterval: number = Constant.Combination.Plane1;
    private _currentBulletType: number = Constant.BulletMeType.BULLET_ME_M

    start() {
        this.init();
    }

    update(deltaTime: number) {
        this._currentShootTime += deltaTime;
        if (this._currentShootTime > this.shootTime && this._isShoot) {
            if (this._currentBulletType == Constant.BulletMeType.BULLET_ME_M) {
                this.createBulletM();
            } else if (this._currentBulletType == Constant.BulletMeType.BULLET_ME_H) {
                this.createBulletH();
            } else if (this._currentBulletType == Constant.BulletMeType.BULLET_ME_S) {
                this.createBulletS();
            }
            this._currentShootTime = 0;
        }

        this._currentCreEnemyTime += deltaTime;
        if (this._combinationInterval == Constant.Combination.Plane1) {
            if (this._currentCreEnemyTime > this.enemyCreateInterval) {
                this.createEnemy();
                this._currentCreEnemyTime = 0;
            }
        } else if (this._combinationInterval == Constant.Combination.Plane2) {
            if (this._currentCreEnemyTime > this.enemyCreateInterval * 0.8) {
                const randomNum = math.randomRangeInt(1, 3);
                if (randomNum == Constant.Combination.Plane2) {
                    this.createCombation1()
                } else {
                    this.createEnemy();
                }
                this._currentCreEnemyTime = 0;
            }
        } else if (this._combinationInterval > Constant.Combination.Plane3) {
            if (this._currentCreEnemyTime > this.enemyCreateInterval * 1.2) {
                const randomNum = math.randomRangeInt(1, 4);
                if (randomNum == Constant.Combination.Plane1) {
                    this.createEnemy();
                } else if (randomNum == Constant.Combination.Plane2) {
                    this.createCombation1()
                } {
                    this.createCombation2()
                }
                this._currentCreEnemyTime = 0;
            }
        }
    }

    public createBulletM() {
        let bullet = instantiate(this.bullet01);
        this.bullRoot.addChild(bullet);
        const pos = this.playerPlane.getPosition();
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.show(this.bulletSpeed, false);
    }

    public createBulletH() {
        const pos = this.playerPlane.getPosition();
        let bullet1 = instantiate(this.bullet03);
        this.bullRoot.addChild(bullet1);
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1.show(this.bulletSpeed, false);

        let bullet2 = instantiate(this.bullet03);
        this.bullRoot.addChild(bullet2);
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2.show(this.bulletSpeed, false);
    }

    public createBulletS() {
        const pos = this.playerPlane.getPosition();

        let bullet1 = instantiate(this.bullet05);
        this.bullRoot.addChild(bullet1);
        bullet1.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1.show(this.bulletSpeed, false);

        let bullet2 = instantiate(this.bullet05);
        this.bullRoot.addChild(bullet2);
        bullet2.setPosition(pos.x - 4, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2.show(this.bulletSpeed, false, Constant.Direction.LEFT);

        let bullet3 = instantiate(this.bullet05);
        this.bullRoot.addChild(bullet3);
        bullet3.setPosition(pos.x + 4, pos.y, pos.z - 7);
        const bulletComp3 = bullet3.getComponent(Bullet)
        bulletComp3.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
    }

    public createEnemyBullet(target: Vec3) {
        let bullet = instantiate(this.bullet01);
        this.bullRoot.addChild(bullet);
        bullet.setPosition(target.x, target.y, target.z + 6);
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.show(70, true);

        const collider = bullet.getComponent(BoxCollider);
        collider.setGroup(Constant.CollisionType.ENEMY_BULLET)
        collider.setMask(Constant.CollisionType.SELF_PLANE)
    }

    public createBulletMe() {
        const randomNum = math.randomRangeInt(1, 4);
        let prefab: Prefab = null;
        if (randomNum == Constant.BulletMeType.BULLET_ME_M) {
            prefab = this.bulletM;
        } else if (randomNum == Constant.BulletMeType.BULLET_ME_H) {
            prefab = this.bulletH;
        } else if (randomNum == Constant.BulletMeType.BULLET_ME_S) {
            prefab = this.bulletS;
        }

        const bulletme = instantiate(prefab);
        bulletme.setParent(this.node);
        bulletme.setPosition(12, 0, -50);
        const bulletmeComp = bulletme.getComponent(BulletMe)
        bulletmeComp.show(this, -30);
    }

    public createEnemy() {
        const withEnemy = math.randomRangeInt(1, 3);
        let prefat = null
        let speed = 0;
        if (withEnemy === Constant.EnemyType.Type1) {
            prefat = this.enemyPlane;
            speed = this.enemySpeed;
        } else if (withEnemy === Constant.EnemyType.Type2) {
            prefat = this.enemyPlane2;
            speed = this.enemySpeed2;
        }

        const enemy = instantiate(prefat) as Node;
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane)
        enemyComp.show(this, speed, true);

        const randomPos = math.randomRangeInt(-18, 26);
        enemy.setPosition(randomPos, 0, -50);

    }

    public createCombation1() {
        const list: Array<Node> = new Array<Node>(5);
        for (let i = 0; i < list.length; i++) {
            const enemy = instantiate(this.enemyPlane) as Node;
            enemy.setParent(this.node);
            const enemyComp = enemy.getComponent(EnemyPlane)
            enemyComp.show(this, this.enemySpeed, true);
            enemy.setPosition(-18 + i * 9, 0, -50)
        }
    }

    public createCombation2() {
        const list: Array<Node> = new Array<Node>(5);
        // 以5的V型排列
        const combationPos = [
            -5, 0, -57,
            5, 0, -57,
            0, 0, -50,
            -7, 0, -64,
            7, 0, -64,
        ]
        for (let i = 0; i < list.length; i++) {
            const enemy = instantiate(this.enemyPlane) as Node;
            enemy.setParent(this.node);
            const startIndex = i * 3;
            enemy.setPosition(combationPos[startIndex], combationPos[startIndex + 1], combationPos[startIndex + 2])
            const enemyComp = enemy.getComponent(EnemyPlane)
            enemyComp.show(this, this.enemySpeed, false);
        }
    }

    public isShhoot(isShhoot: boolean) {
        this._isShoot = isShhoot;
    }

    public changeBulletType(type: number) {
        this._currentBulletType = type;
    }

    private init() {
        this._currentShootTime = this.shootTime;
        this._changePlane();
    }

    private _changePlane() {
        this.schedule(() => {
            this._combinationInterval += 1;
            this.createBulletMe();
        }, 10, macro.REPEAT_FOREVER)
    }
}


