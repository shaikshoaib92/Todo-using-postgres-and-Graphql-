import { Task } from "../entities/Task";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TypeResolver {
  @Query(() => String)
  hello(): string {
    return "HEllo world";
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return Task.find();
  }

  @Mutation(() => Task)
  async createTask(): Promise<Task> {
    const task = await Task.create({
      task: "asd",
      isComplete: true,
    }).save();
    return task;
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg("id") id: number,
    @Arg("task", () => String) task: string,
    @Ctx() { orm }: any
  ): Promise<Task | null> {
    try {
      // Optimized from .save() to update() & No more side effects of .save() such as creating a new Entity instead of updating one
      let x = await orm
        .createQueryBuilder()
        .update(Task)
        .set({ task: task })
        .where("id = :id", { id: id })
        .returning("*")
        .execute()
        .then((response: any) => {
          return response.raw[0];
        });
      console.log(x);
      return x;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

@Mutation(()=>Boolean)
async deleteTask(
  @Arg("id") id:number
) :Promise<boolean>{
  await Task.delete(id)
  return true;
}

}
