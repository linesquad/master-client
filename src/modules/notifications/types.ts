export interface Notification {
  id: string;
  type: string;
  read: boolean;
  readAt: string | null;
  title: string;
  message: string;
  data: {
    leadId: string;
    masterId: string;
  };
  priority: string;
  createdAt: string;
  clientId: string;
}

export interface Pagination {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pagination: Pagination;
}
