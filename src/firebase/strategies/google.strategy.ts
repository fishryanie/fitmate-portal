import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

const googleParams = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
  scope: ['profile, email'],
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(googleParams);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(
      '🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ profile:',
      profile,
    );
    console.log(
      '🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ refreshToken:',
      refreshToken,
    );
    console.log(
      '🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ accessToken:',
      accessToken,
    );
  }
}
