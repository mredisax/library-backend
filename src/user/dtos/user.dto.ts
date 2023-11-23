// import {IsString, IsNotEmpty} from "class-validator";
export class CreateUserDto{
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly phone: string;
}
export class EditUserPasswordDto{
    readonly id: number;
    readonly password: string;
}

export class EditUserDataDto{
    readonly id: number;
    readonly name?: string;
    readonly lastname?: string;
    readonly email?: string;
    readonly phone?: string;
}