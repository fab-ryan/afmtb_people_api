export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateIncomeRequest {
  source: string;
  amount: number;
  description?: string;
  balance?: number;
}
