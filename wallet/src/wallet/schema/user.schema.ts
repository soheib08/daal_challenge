import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserModel {
  @Prop()
  id: number;

  @Prop()
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(UserModel).set(
  'versionKey',
  false,
);
