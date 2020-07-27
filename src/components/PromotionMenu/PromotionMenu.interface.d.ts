import { player } from '@redux/redux.interface';

export interface PromotionMenuProps {
  onSelectedPromotion: (promotionPiece: string) => void;
  currentTurn: player;
}
