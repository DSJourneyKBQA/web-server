import { PrismaClient } from '@prisma/client';
import { MD5, PBKDF2 } from 'crypto-js';

const prisma = new PrismaClient();

export function passwordHash(password: string, username: string): string {
  return PBKDF2(password, MD5(username), {
    keySize: 4,
    iterations: 5,
  }).toString();
}

async function main() {
  const system = await prisma.user.upsert({
    where: { name: 'system' },
    update: {},
    create: {
      name: 'system',
      email: 'system@blog.website',
      nickname: '系统',
      passwordHash: 'system',
      sex: 'SECRET',
      status: 2,
      role: 'SYSTEM',
    },
  });

  const admin = await prisma.user.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@blog.website',
      nickname: '管理员',
      passwordHash: passwordHash('123456', 'admin'),
      sex: 'SECRET',
      status: 0,
      role: 'ADMIN',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { name: 'testuser' },
    update: {},
    create: {
      name: 'testuser',
      email: 'user1@blog.website',
      nickname: '测试用户',
      passwordHash: passwordHash('123456', 'testuser'),
      sex: 'MALE',
      status: 0,
      role: 'USER',
    },
  });

  const testPost = await prisma.post.upsert({
    where: { pid: 1 },
    update: {},
    create: {
      title: '第一篇文章',
      text: '这是服务器上的第一篇文章',
      author: testUser.uid,
      publish: true,
    },
  });

  const testComment = await prisma.comment.upsert({
    where: { cid: 1 },
    update: {},
    create: {
      pid: testPost.pid,
      sender: testUser.uid,
      text: '测试',
      ip: '127.0.0.1',
      agent: 'prisma',
    },
  });

  const testMetadata = await prisma.metadata.upsert({
    where: { mid: 1 },
    update: {},
    create: {
      pid: testPost.pid,
      type: 'tag',
      text: '测试',
    },
  });

  console.log({ system, admin, testUser, testPost, testComment, testMetadata });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
