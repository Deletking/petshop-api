/* eslint-disable prettier/prettier */
export class ChangePasswordDto {
  constructor(
    public password: string,
    public newPassword: string,
    ) {}
}