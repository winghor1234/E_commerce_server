# ใช้ Node.js เวอร์ชัน LTS บน Alpine (เบาและเร็ว)
FROM node:lts-alpine

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ lock ไฟล์มาก่อน (เพื่อ caching ที่ดี)
COPY package*.json ./

# ติดตั้ง dependencies ก่อน
RUN npm install

# คัดลอก Prisma schema และ generate Prisma Client
COPY prisma ./prisma
# ติดตั้ง Prisma CLI
RUN npm install -g prisma   
# สร้าง Prisma Client
RUN npx prisma generate

# คัดลอกโค้ดส่วนที่เหลือ
COPY . .

# เปิดพอร์ต (ตามที่ server.js ใช้)
EXPOSE 5002

# รันแอป (คุณสามารถใส่ prisma generate ใน npm script ด้วยก็ได้)
CMD ["npm", "start"]
