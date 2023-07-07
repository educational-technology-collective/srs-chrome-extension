export interface flashCard {
  _id: string;
  lmid: string;
  type: string;
  content: {
    question: string;
    answer: any;
  };
}

export interface indicatorOp {
  index: number;
  value: number;
}

export interface individualChoice {
  option: string;
  isCorrect: boolean;
}

export interface action {
  event_name: string;
  event_time: string;
  card_id: string | null;
  self_eval: string | null;
  test_eval: string | null;
  isBuffer: boolean | null;
}

export interface reviewInfo {
  user_id: string;
  start_time: string;
  end_time: string;
  number_shake: number;
  action_container: action[];
}
