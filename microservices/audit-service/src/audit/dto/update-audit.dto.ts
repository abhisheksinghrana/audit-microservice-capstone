export class UpdateAuditDTO {
    readonly name?: string;
    readonly projectName?: string;
    readonly reviewerId?: string;
    readonly categoryId?: string;
    readonly collaboratorIds?: string[];
    readonly status?: string;
    readonly progress?: number;
    readonly priority?: string;
    readonly creatorId?: string;
    readonly createdOn?: Date;
    readonly modifiedOn?: Date;
    readonly isDeleted?: boolean;
}
