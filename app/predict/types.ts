import dayjs, { Dayjs } from 'dayjs';

export interface Box1Props {
    item: string;
    setItem: (s: string) => void;
    setChanged: (s: boolean) => void;
    date: Dayjs | null;
    setDate: (d: Dayjs) => void;
  }