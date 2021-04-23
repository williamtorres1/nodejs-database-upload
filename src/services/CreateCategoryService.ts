import { getRepository } from 'typeorm';
import Category from '../models/Category';

class CreateCategoryService {
  public async execute(category: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const categoryAlreadyExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (categoryAlreadyExists) {
      return categoryAlreadyExists;
    }
    const categoryCreated = categoriesRepository.create({ title: category });

    await categoriesRepository.save(categoryCreated);

    return categoryCreated;
  }
}

export default CreateCategoryService;
