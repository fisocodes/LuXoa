import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  findAll(): Promise<User[]> {
    return this._usersService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return this._usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this._usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this._usersService.remove(id);
  }
}
