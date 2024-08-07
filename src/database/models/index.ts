/* eslint-disable import/no-extraneous-dependencies */
import { Sequelize } from 'sequelize';

import UserModal from './user';
import AccountModal from './account';
import IncomeModal from './income';
import ProfileModal from './profile';
import DepositModal from './deposit';
import WithdrawModal from './withdraw';
import ExpenseCategoryModal from './expenseCategory';
import ExpensesModel from './expense';

export * from './user';
export * from './account';
export * from './income';
export * from './profile';
export * from './deposit';
export * from './withdraw';
export * from './expenseCategory';
export * from './expense';

export interface Models {
  User: typeof UserModal;
  account: typeof AccountModal;
  income: typeof IncomeModal;
  profile: typeof ProfileModal;
  Deposit: typeof DepositModal;
  Withdraw: typeof WithdrawModal;
  Expense: typeof ExpensesModel;
  ExpenseCategory: typeof ExpenseCategoryModal;
}

const Models = (sequelize: Sequelize) => {
  const User = UserModal(sequelize);
  const Account = AccountModal(sequelize);
  const Income = IncomeModal(sequelize);
  const Profile = ProfileModal(sequelize);
  const Deposit = DepositModal(sequelize);
  const Withdraw = WithdrawModal(sequelize);
  const Expense = ExpensesModel(sequelize);
  const ExpenseCategory = ExpenseCategoryModal(sequelize);
  return {
    User,
    Account,
    Income,
    Profile,
    Deposit,
    Withdraw,
    Expense,
    ExpenseCategory,
  };
};

export default Models;
