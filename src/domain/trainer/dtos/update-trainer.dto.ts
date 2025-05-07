import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTrainerDto } from './create-trainer.dto';

@InputType()
export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {
  @Field()
  trainerId: string;
}
