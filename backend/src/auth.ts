import jwt from 'jsonwebtoken'; import bcrypt from 'bcrypt'; import { Request, Response, NextFunction } from 'express';
export type AuthUser={id:string;organizationId:string;role:'ADMIN'|'AGENT'|'CUSTOMER';name:string};
declare global { namespace Express { interface Request { user?:AuthUser } } }
const accessSecret=process.env.JWT_ACCESS_SECRET||'development-access-secret-change-me'; const refreshSecret=process.env.JWT_REFRESH_SECRET||'development-refresh-secret-change-me';
export const signAccess=(u:AuthUser)=>jwt.sign(u,accessSecret,{expiresIn:'15m'}); export const signRefresh=(u:AuthUser)=>jwt.sign(u,refreshSecret,{expiresIn:'7d'});
export const verifyRefresh=(t:string)=>jwt.verify(t,refreshSecret) as AuthUser;
export const hashPassword=(p:string)=>bcrypt.hash(p,12); export const comparePassword=(p:string,h:string)=>bcrypt.compare(p,h);
export const requireAuth=(req:Request,res:Response,next:NextFunction)=>{try {const token=req.headers.authorization?.replace('Bearer ',''); if(!token) throw Error(); req.user=jwt.verify(token,accessSecret) as AuthUser; next()} catch {res.status(401).json({error:{message:'Authentication required'}})}};
export const permit=(...roles:AuthUser['role'][])=>(req:Request,res:Response,next:NextFunction)=>!req.user||!roles.includes(req.user.role)?res.status(403).json({error:{message:'Insufficient permissions'}}):next();
