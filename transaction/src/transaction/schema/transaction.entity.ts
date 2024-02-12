import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

@Schema({ id: true })
export class TransactionModel {
  id: string;

  @Prop({
    required: true,
    type: Number,
  })
  user: number;

  @Prop({
    required: true,
    type: Number,
  })
  amount: number;

  @Prop({ default: new Date() })
  date: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(
  TransactionModel,
).set('versionKey', false);

TransactionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TransactionSchema.plugin(paginate);
