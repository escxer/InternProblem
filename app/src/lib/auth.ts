import { betterAuth } from "better-auth";
import {db, Schema} from "../../../packages/db";
import { config } from "../../../packages/infra";
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPlugin, openAPI} from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: config.API_BASE_URL,
	trustedOrigins: config.AUTH_TRUSTED_ORIGINS,
	secret: config.BETTER_AUTH_SECRET,

	database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
        user: Schema.users,
        session: Schema.sessions,
        account: Schema.accounts,
        verification: Schema.verifications,
    },
  }),
  user: {
		additionalFields: {
			firstname: { type: 'string', required: true, input: true },
			lastname: { type: 'string', required: true, input: true },
			company: { type: 'string', required: true, input: true },
    },
  },
  session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
		freshAge: 60 * 60 * 24 * 7,
	},

	account: {
		updateAccountOnSignIn: true,
	},
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false, 
		minPasswordLength: 8,
  }, 
  plugins: [adminPlugin(), openAPI()],
});

export type Auth = typeof auth