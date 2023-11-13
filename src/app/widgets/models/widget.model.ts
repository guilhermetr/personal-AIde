import { generateUUID } from "src/app/utils/functions";
import { CardType } from "../utils/enums";
import { TaskType } from 'src/app/utils/enums';

export class Widget {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  cardType: CardType; // Specifies which card should be used when creating this widget's component
  isCustom?: boolean;
  taskType: TaskType;

  constructor(name: string, categoryId: number, description: string, cardType: CardType, taskType: TaskType, isCustom: boolean = false) {
    this.id = generateUUID();
    this.name = name;
    this.categoryId = categoryId;
    this.description = description;
    this.cardType = cardType;
    this.taskType = taskType;
    this.isCustom = isCustom;
  }
}

// Storing categories as IDs instead of using their names has several benefits, 
// particularly when it comes to database design, data integrity, and application performance:
// 1. Normalization: Using IDs adheres to database normalization rules, where each data item is stored once. This avoids redundancy and inconsistencies, such as different widgets possibly referring to the same category by slightly different names (e.g., "Programming" vs. "programming").
// 2. Flexibility and Scalability: Category names can change without affecting widgets, making it easier to manage and scale (e.g. translating category names).
// 3. Performance: Numeric IDs are faster to search, sort, and index, improving database performance. (Probably not necessary since there won't be many categories)
// However, it is also important to consider that this approach adds a layer of complexity. 
// Referential integrity must be maintained and when presenting data to users, an additional step is required to map the category ID to its human-readable name.
