import 'express-session'

declare module 'express-session'{
    interface SessionDate{
        admin?:string
    }
}