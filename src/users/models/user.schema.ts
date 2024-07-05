import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    pseudonyme!: string;

    @Prop({ required: true })
    password!: string;

    @Prop()
    name?: string;

    @Prop()
    address?: string;

    @Prop()
    comment?: string;

    @Prop({ required: true, enum: ['admin', 'user'] })
    role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);