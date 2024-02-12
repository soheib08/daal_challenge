import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WalletModel {
  id: string;

  @Prop({
    required: true,
    type: Number,
  })
  user: number;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  ballance: number;

  @Prop({ default: new Date() })
  lastUpdate: Date;
}
export const WalletSchema = SchemaFactory.createForClass(WalletModel).set(
  'versionKey',
  false,
);

WalletSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
