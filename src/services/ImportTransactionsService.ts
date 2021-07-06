import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      delimiter: ',',
      fromLine: 2,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !value || !type) return;

      categories.push(category);
      transactions.push({
        title,
        value,
        type,
        category,
      });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    const addCategoryTitle = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitle.map(title => ({
        title,
      })),
    );
    await categoriesRepository.save(newCategories);
    console.log({ newCategories });

    // console.log({ categories, transactions });

    // lines.forEach(async line => {
    //   const title = line[0];
    //   const type = line[1] as 'income' | 'outcome';
    //   const value = Number(line[2]);
    //   const category = line[3];
    //   await createTransaction.execute({
    //     title,
    //     type,
    //     value,
    //     category,
    //     isImport: true,
    //   });
    // });

    // const transactions = await transactionsRepository.find();

    // return transactions;
  }
}

export default ImportTransactionsService;
