import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';

import CreateTransactionService from './CreateTransactionService';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  private transactions: Transaction[];

  async execute(file: File): Promise<Transaction[]> {
    // async function createTransaction({
    //   title,
    //   type,
    //   value,
    //   category,
    // }: CreateTransactionDTO): Promise<Transaction> {
    //   if (!['income', 'outcome'].includes(type)) {
    //     throw new AppError('Invalid transaction type');
    //   }
    //   const transactionsRepository = getCustomRepository(
    //     TransactionsRepository,
    //   );

    //   const createCategory = new CreateCategoryService();
    //   const createdCategory = await createCategory.execute(category);

    //   const transaction = transactionsRepository.create({
    //     title,
    //     value,
    //     type,
    //     category: createdCategory,
    //   });
    //   await transactionsRepository.save(transaction);

    //   return transaction;
    // }

    // const readCSVStream = fs.createReadStream(file.path);

    // const parseStream = csvParse({
    //   fromLine: 2,
    //   ltrim: true,
    //   rtrim: true,
    // });

    // const parseCSV = readCSVStream.pipe(parseStream);

    // const lines = [] as string[];

    // parseCSV.on('data', line => {
    //   lines.push(line);
    // });

    // await new Promise(resolve => {
    //   parseCSV.on('end', resolve);
    // });

    // lines.forEach(async line => {
    //   console.log(line);
    //   const title = line[0];
    //   const type = line[1];
    //   const value = line[2];
    //   const category = line[3];
    //   const transaction = await createTransaction({
    //     title,
    //     type,
    //     value,
    //     category,
    //   });
    //   this.transactions.push(transaction);
    // });

    return this.transactions;
  }
}

export default ImportTransactionsService;
