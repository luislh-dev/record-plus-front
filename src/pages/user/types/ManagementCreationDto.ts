import { BaseUserCreateDto } from "./BaseUserCreateDto";

export interface ManagementCreationDto extends BaseUserCreateDto {
  hospitalId: number;
}
