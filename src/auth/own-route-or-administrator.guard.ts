import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class OwnRouteOrAdministratorGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}
    
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    const [username, password] = authHeader?.split(':') || [];

    if (await this.userService.isAdministrator(username)) {
      return true;
    }

    if (request.params.userId == username) {
        return true;
    }
    
    return false;
  }
}