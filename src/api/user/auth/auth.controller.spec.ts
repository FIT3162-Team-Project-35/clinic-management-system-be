// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import '@types/jest';

// describe('AuthController', () => {
//   let authController: any;
//   let authService: any;

//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       controllers: [authController],
//       providers: [authService],
//     }).compile();

//     authService = moduleRef.get<AuthService>(authService);
//     authController = moduleRef.get<AuthController>(authController);
//   });
//   describe('Login', () => {
//     it('should return a json object contains the token and user object', async () => {
//       const result = ['test'];
//       jest.spyOn(authService, 'findAll').mockImplementation(() => result);

//       expect(await authController.login()).toBe(result);
//     });
//   });
// });
