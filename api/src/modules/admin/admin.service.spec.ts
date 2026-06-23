import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from '../requests/requests.service';
import { TelegramService } from '../telegram/telegram.service';
import { UsersService } from '../users/users.service';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: RequestsService,
          useValue: {},
        },
        {
          provide: TelegramService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
