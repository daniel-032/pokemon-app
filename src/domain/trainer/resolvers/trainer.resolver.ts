import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TrainerModel } from '../models/trainer.model';
import { TrainerService } from '../services/trainer.service';
import { CreateTrainerDto } from '../dtos/create-trainer.dto';
import { UpdateTrainerDto } from '../dtos/update-trainer.dto';
import { PokemonModel } from '../models/pokemon.model';

@Resolver(() => TrainerModel)
export class TrainerResolver {
  constructor(private readonly trainerService: TrainerService) {}

  @Query(() => [TrainerModel])
  findAllTrainers() {
    return this.trainerService.findAll();
  }

  @Query(() => TrainerModel)
  findTrainerById(@Args('trainerId', { type: () => String }) trainerId: string) {
    return this.trainerService.findById(trainerId);
  }

  @Mutation(() => TrainerModel)
  createTrainer(@Args('input') input: CreateTrainerDto) {
    return this.trainerService.create(input);
  }

  @Mutation(() => TrainerModel)
  updateTrainer(
    @Args('trainerId') trainerId: string,
    @Args('input') input: UpdateTrainerDto,
  ) {
    return this.trainerService.update(trainerId, input);
  }

  @Mutation(() => Boolean)
  async deleteTrainer(@Args('trainerId') trainerId: string): Promise<boolean> {
    await this.trainerService.delete(trainerId);
    return true;
  }

  @ResolveField(() => [PokemonModel], { nullable: true })
  pokemons(@Parent() trainer: TrainerModel) {
    return this.trainerService.getTrainerPokemons(trainer.trainerId);
  }
}
