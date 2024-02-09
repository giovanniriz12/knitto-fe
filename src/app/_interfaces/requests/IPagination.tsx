export interface IPagination {
  start: number;
  limit: number;
}

export interface IPaginationComponent {
  onClickPrevOrNextPage: (type: string | number) => void;
  paginationData: (string | number)[];
  totalPage: number;
}
