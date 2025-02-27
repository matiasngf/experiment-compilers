export const PLAYER_WIDTH = 7
export const PLAYER_HEIGHT = 5
export const PLAYER_MARGIN_TOP = 15

export const ENEMY_WIDTH = 5
export const ENEMY_HEIGHT = 5

export const ENEMY_COUNT_X = 5
export const ENEMY_COUNT_Y = 3

export const ENEMY_SPACING_X = 4
export const ENEMY_SPACING_Y = 3

export const ENEMIES_TOTAL_X = ENEMY_COUNT_X * ENEMY_WIDTH + ENEMY_SPACING_X * (ENEMY_COUNT_X - 1)
export const ENEMIES_TOTAL_Y = ENEMY_COUNT_Y * ENEMY_HEIGHT + ENEMY_SPACING_Y * (ENEMY_COUNT_Y - 1)

export const CANVAS_PADDING_X = 3
export const CANVAS_PADDING_Y = 3

export const CANVAS_WIDTH = ENEMIES_TOTAL_X + CANVAS_PADDING_X * 2
export const CANVAS_HEIGHT = ENEMIES_TOTAL_Y + PLAYER_MARGIN_TOP + PLAYER_HEIGHT + CANVAS_PADDING_Y * 2

export enum COLLIDERS {
  PLAYER = 'player',
  PLAYER_PROJECTILE = 'player-projectile',
  ENEMY = 'enemy',
  ENEMY_PROJECTILE = 'enemy-projectile'
}
