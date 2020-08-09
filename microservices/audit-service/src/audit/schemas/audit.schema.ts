import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Audit extends Document {
    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    projectName: string;

    @Prop({ required: true })
    reviewerId: string;

    @Prop({ required: true })
    categoryId: string;

    @Prop({ required: true })
    collaboratorIds: string[];

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    progress: number;

    @Prop({ required: true })
    priority: string;

    @Prop({ required: true })
    creatorId: string;

    @Prop({ required: true })
    createdOn: Date;

    @Prop({ required: true })
    modifiedOn: Date;

    @Prop()
    isDeleted: boolean;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
