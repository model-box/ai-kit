
export enum RoleType {
  User = "user",
  Assistant = "assistant",
  System = "system"
}


export interface MessageType {
  preMessageId?: string;
  id: string;
  role: RoleType;
  content: string;
}