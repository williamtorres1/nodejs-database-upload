import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';
import Category from '../models/Category';

import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);

    const createCategory = new CreateCategoryService();
    const createdCategory = await createCategory.execute(category)

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: createdCategory,
    })
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
