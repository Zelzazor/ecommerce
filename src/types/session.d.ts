import "express-session"
declare module "express-session" {
    interface Session {
      userUuid: string;
    }
    interface SessionData {
        userUuid: string;
    }
  }



