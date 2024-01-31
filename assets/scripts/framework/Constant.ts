
export class Constant {
    public static EnemyType = {
        Type1: 1,
        Type2: 2,
    }

    public static Combination = {
        Plane1: 1,
        Plane2: 2,
        Plane3: 3,
    }

    public static CollisionType = {
        SELF_PLANE: 1 << 1,
        ENEMY_PLANE: 1 << 2,
        SELF_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
        BUTTLE_ME: 1 << 5,
    }

    public static BulletMeType = {
        BULLET_ME_M: 1,
        BULLET_ME_H: 2,
        BULLET_ME_S: 3,
    }

    public static Direction = {
        LEFT: 1,
        MIDDLE: 2,
        RIGHT: 3,
    }
}