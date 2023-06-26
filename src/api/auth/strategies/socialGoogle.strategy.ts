import { AuthService } from '#api/auth/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
      scope: ['profile, email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ profile:', profile);
    console.log('🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ refreshToken:', refreshToken);
    console.log('🚀 ~ file: google.strategy.ts:19 ~ GoogleStrategy ~ validate ~ accessToken:', accessToken);
    const user = await this.authService.signup({
      email: profile.emails[0].value,
      fullName: profile.displayName,
      pictureSocial: profile.photos[0].value,
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
