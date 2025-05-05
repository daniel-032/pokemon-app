import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { Session } from '../../domain/auth/entities/session.entity';

dotenv.config();


session({
  secret: process.env.AUTH_SECRET_SESSION!,
  resave: false,
  saveUninitialized: false
});
