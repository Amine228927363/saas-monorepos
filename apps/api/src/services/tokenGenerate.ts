import { Prisma, PrismaClient } from '@saas-monorepo/database';
import type { Role } from '@saas-monorepo/database';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  email: string;
  workspaceId: number;
  role: string;
}
const prisma = new PrismaClient();
async function generateToken(tokenPayload: TokenPayload): Promise<string> {
  try {
    const accessToken = jwt.sign(tokenPayload, process.env['ACCESS_TOKEN_SECRET'] as string, {
      expiresIn: process.env['ACCESS_TOKEN_TTL'],
    });
    return accessToken;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
}
async function verifyWorkspaceToken(token: string) {
  let payload = null;
  try {
    payload = jwt.verify(token, process.env['ACCESS_TOKEN_SECRET'] as string) as {
      email: string;
      workspaceId: string;
      role: Role;
    };
  } catch (err) {
    throw err;
  }

  try {
    const member = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId: parseInt(payload.workspaceId),
        role: payload.role,
        user: {
          email: payload.email,
        },
      },
    });

    if (!member) {
      throw new Error('Member not found');
    }

    return member;
  } catch (error) {
    throw error;
  }
}

export { generateToken, verifyWorkspaceToken };
