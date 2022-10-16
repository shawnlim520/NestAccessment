import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as pactum from 'pactum';
import { CreateEmployeeDto, EditEmployeeDto } from 'src/employee/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app:INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],

    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
    }));
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Employee', () => {
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let result = "";
    for ( var i = 0; i < charactersLength; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const dto: CreateEmployeeDto={
      username: 'shawnlim2',
      fullname: 'limlipxuan',
      salary: 4200.99
    };
    describe('Get Employees',() => {
        it ('should get employees', () => {
          return pactum
          .spec()
          .get('/employees')
          .expectStatus(200)
          .inspect()
        })
    });
    describe('Add Employees', () => {
      it('Add new employee', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'username' : result,
          'fullname' : dto.fullname,
          'salary'   : dto.salary
        })
        .expectStatus(201)
        .stores('employeeId','id')
        .stores('username','username')
        .inspect()
      });
      it('if username taken', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'username' : '$S{username}',
          'fullname' : dto.fullname,
          'salary'   : dto.salary
        })
        .expectStatus(403)
        .inspect()
      });
      it('if empty username', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'fullname' : dto.fullname,
          'salary'   : dto.salary
        })
        .expectStatus(400)
        .inspect()
      });
      it('if empty fullname', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'username' : dto.username,
          'salary'   : dto.salary
        })
        .expectStatus(400)
        .inspect()
      });
      it('if empty salary', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'username' : dto.username,
          'fullname'   : dto.fullname
        })
        .expectStatus(400)
        .inspect()
      });
      it('if salary not number', () => {
        return pactum
        .spec()
        .post('/employees',
        )
        .withBody({
          'username' : dto.username,
          'fullname' : dto.fullname,
          'salary'  : "asdsad" 
        })
        .expectStatus(400)
        .inspect()
      });

    });

    describe('Edit Employees', () => {
      const dto: EditEmployeeDto={
        username: 'shawnlim2',
        fullname: 'limlipxuan',
        salary: 4200.99
      };
      it('update employee fullname', () => {
        return pactum
        .spec()
        .patch('/employees/$S{employeeId}',
        )
        .withBody({
          'fullname' : result,
        })
        .expectStatus(200)
        .inspect()
      });
      it('update invalid employee', () => {
        return pactum
        .spec()
        .patch('/employees/99999999',
        )
        .withBody({
          'fullname' : result,
        })
        .expectStatus(403)
        .inspect()
      });
      it('update salary not number', () => {
        return pactum
        .spec()
        .patch('/employees/$S{employeeId}',
        )
        .withBody({
          'salary' : "sfsdf",
        })
        .expectStatus(400)
        .inspect()
      });
    });

    describe('Delete Employees', () => {
      it('delete employee by id', () => {
        return pactum
        .spec()
        .delete('/employees/$S{employeeId}',
        )
        .withBody({
          'fullname' : result,
        })
        .expectStatus(200)
        .inspect()
      });
      it('delete employee by invalid id', () => {
        return pactum
        .spec()
        .delete('/employees/999999999999',
        )
        .withBody({
          'fullname' : result,
        })
        .expectStatus(403)
        .inspect()
      });
    })
  })
});