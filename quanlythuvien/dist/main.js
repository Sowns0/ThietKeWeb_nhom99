"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const user_service_1 = require("./user/user.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
        ],
    });
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET ??
            'library-dev-secret-change-me',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
    }));
    const userService = app.get(user_service_1.UserService);
    await userService.ensureDefaultUser();
    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port, '0.0.0.0');
    console.log(`App running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map